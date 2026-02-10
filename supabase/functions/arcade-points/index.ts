const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

interface BadgeInfo {
  name: string;
  image: string;
  earnedDate: string;
}

function parseProfile(markdown: string, html: string) {
  const lines = markdown.split('\n').map(l => l.trim()).filter(l => l.length > 0);

  // Extract name from first H1
  let name = 'Usuário';
  for (const line of lines) {
    const h1 = line.match(/^# (.+)$/);
    if (h1) {
      name = h1[1].trim();
      break;
    }
  }

  // Extract points
  let points = 0;
  for (const line of lines) {
    const pointsMatch = line.match(/\*\*(\d[\d,\.]*)\s*points?\*\*/i);
    if (pointsMatch) {
      points = parseInt(pointsMatch[1].replace(/[,\.]/g, ''), 10);
      break;
    }
  }

  // Extract league
  let league = '';
  for (const line of lines) {
    const leagueMatch = line.match(/^##\s+(.+League)/i);
    if (leagueMatch) {
      league = leagueMatch[1].trim();
      break;
    }
  }

  // Extract member since
  let memberSince = '';
  for (const line of lines) {
    const memberMatch = line.match(/Member since (\d{4})/i);
    if (memberMatch) {
      memberSince = memberMatch[1];
      break;
    }
  }

  // Extract league image from HTML
  let leagueImage = '';
  if (html) {
    const leagueImgMatch = html.match(/profile-league[\s\S]*?<img[^>]*src="([^"]+)"/i);
    if (leagueImgMatch) {
      leagueImage = leagueImgMatch[1];
    }
  }

  // Extract avatar from HTML (ql-avatar component has the real profile photo)
  let avatar = '';
  if (html) {
    const avatarMatch = html.match(/ql-avatar[^>]*src="([^"]+)"/i)
      || html.match(/lh3\.googleusercontent\.com[^"'\s)]+/i);
    if (avatarMatch) {
      avatar = avatarMatch[1] || avatarMatch[0];
    }
  }

  // Extract badges: pattern is [![](image)](link) followed by badge name, then "Earned date"
  const badges: BadgeInfo[] = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Match badge image links: [![](image_url)](badge_url)
    const badgeMatch = line.match(/\[!\[\]\(([^)]+)\)\]\(([^)]+\/badges\/[^)]+)\)/);
    if (badgeMatch) {
      const image = badgeMatch[1];
      // Next non-empty line should be the badge name
      let badgeName = '';
      let earnedDate = '';
      
      for (let j = i + 1; j < lines.length && j <= i + 5; j++) {
        const nextLine = lines[j];
        if (!badgeName && !nextLine.startsWith('[') && !nextLine.startsWith('!') && !nextLine.startsWith('Earned') && !nextLine.startsWith('Learn') && !nextLine.startsWith('Dismiss') && nextLine.length > 2) {
          badgeName = nextLine;
        }
        if (nextLine.startsWith('Earned ')) {
          earnedDate = nextLine.replace('Earned ', '');
          break;
        }
      }

      if (badgeName) {
        badges.push({ name: badgeName, image, earnedDate });
      }
    }
  }

  return { name, points, league, leagueImage, memberSince, avatar, badges };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { profileUrl } = await req.json();

    if (!profileUrl) {
      return new Response(
        JSON.stringify({ success: false, error: 'URL do perfil é obrigatória' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const apiKey = Deno.env.get('FIRECRAWL_API_KEY');
    if (!apiKey) {
      return new Response(
        JSON.stringify({ success: false, error: 'Firecrawl não configurado' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let formattedUrl = profileUrl.trim();
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = `https://${formattedUrl}`;
    }

    console.log('Scraping profile:', formattedUrl);

    const scrapeResponse = await fetch('https://api.firecrawl.dev/v1/scrape', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: formattedUrl,
        formats: ['markdown', 'html'],
        waitFor: 5000,
      }),
    });

    const scrapeData = await scrapeResponse.json();

    if (!scrapeResponse.ok) {
      console.error('Firecrawl error:', scrapeData);
      return new Response(
        JSON.stringify({ success: false, error: 'Não foi possível acessar o perfil. Verifique se o perfil é público.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const markdown = scrapeData.data?.markdown || scrapeData.markdown || '';
    const html = scrapeData.data?.html || scrapeData.html || '';
    console.log('Markdown length:', markdown.length);

    const profile = parseProfile(markdown, html);

    // Determine arcade level based on badge count
    const badgeCount = profile.badges.length;
    let level = 'Iniciante';
    if (badgeCount >= 65) level = 'Arcade Ranger';
    else if (badgeCount >= 40) level = 'Arcade Trooper';
    else if (badgeCount >= 20) level = 'Arcade Novice';

    const result = {
      success: true,
      data: {
        name: profile.name,
        avatar: profile.avatar,
        points: profile.points,
        league: profile.league,
        leagueImage: profile.leagueImage,
        memberSince: profile.memberSince,
        level,
        badges: profile.badges.map(b => ({
          name: b.name,
          image: b.image,
          earnedDate: b.earnedDate,
          points: 1,
        })),
        badgeCount: profile.badges.length,
      },
    };

    console.log(`Found ${profile.badges.length} badges for ${profile.name} (${profile.points} points)`);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ success: false, error: error instanceof Error ? error.message : 'Erro desconhecido' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
