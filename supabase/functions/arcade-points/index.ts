const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

interface BadgeInfo {
  name: string;
  image: string;
  earnedDate: string;
  link: string;
  type: 'course_short' | 'course_long' | 'arcade_game' | 'skill_badge';
  points: number;
}

function classifyBadge(name: string, description: string): { type: BadgeInfo['type']; points: number } {
  const nameLower = name.toLowerCase();
  const descLower = description.toLowerCase();
  
  // Arcade Games: name starts with "Arcade" or description mentions it's a challenge/game
  if (/^arcade\b/i.test(name)) {
    return { type: 'arcade_game', points: 3 };
  }
  // Skill Badges: description starts with or contains "earn a skill badge" indicating the badge itself IS a skill badge
  if (/earn a skill badge/i.test(description) || /complete the .+ skill badge/i.test(description)) {
    return { type: 'skill_badge', points: 3 };
  }
  // Courses: default — 1 point
  return { type: 'course_short', points: 1 };
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

  // Extract badges: multiple patterns for regular badges and skill badges
  const badges: BadgeInfo[] = [];
  const seenLinks = new Set<string>();

  // First pass: collect badge names and their detail descriptions from the markdown
  // Detail sections appear as: # Badge Name \n Dismiss \n Description text...
  const badgeDescriptions = new Map<string, string>();
  for (let i = 0; i < lines.length; i++) {
    // Detail sections start with "# Name" followed by "Dismiss"
    const h1Match = lines[i].match(/^# (.+)$/);
    if (h1Match && i + 1 < lines.length && lines[i + 1] === 'Dismiss') {
      const detailName = h1Match[1].trim();
      // Collect description lines until we hit "Learn more" or another heading
      let desc = '';
      for (let j = i + 2; j < lines.length && j <= i + 15; j++) {
        if (lines[j] === 'Learn more' || lines[j].startsWith('# ') || lines[j] === 'close') break;
        desc += ' ' + lines[j];
      }
      badgeDescriptions.set(detailName.toLowerCase(), desc.trim());
    }
  }

  // Second pass: extract badges from the grid
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    const badgeMatch = line.match(/\[!\[\]\(([^)]+)\)\]\(([^)]+\/badges\/[^)]+)\)/);
    const skillBadgeMatch = !badgeMatch ? line.match(/\[!\[\]\(([^)]+)\)\]\(([^)]+\/(?:course_templates|quests|games)\/[^)]+)\)/) : null;
    const match = badgeMatch || skillBadgeMatch;
    
    if (match) {
      const image = match[1];
      const link = match[2];
      
      if (seenLinks.has(link)) continue;
      seenLinks.add(link);
      
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
        const description = badgeDescriptions.get(badgeName.toLowerCase()) || '';
        const classification = classifyBadge(badgeName, description);
        badges.push({ name: badgeName, image, earnedDate, link, type: classification.type, points: classification.points });
      }
    }
  }

  return { name, points, league, leagueImage, memberSince, avatar, badges };
}

function calculateArcadePoints(badges: BadgeInfo[]): number {
  return badges.reduce((sum, b) => sum + b.points, 0);
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
        waitFor: 8000,
        onlyMainContent: false,
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

    // Calculate arcade points based on badge types
    const arcadePoints = calculateArcadePoints(profile.badges);
    
    // Determine level based on calculated points
    let level = 'Iniciante';
    if (arcadePoints >= 60) level = 'Marco Premium';
    else if (arcadePoints >= 40) level = 'Marco Standard';

    const result = {
      success: true,
      data: {
        name: profile.name,
        avatar: profile.avatar,
        points: profile.points,
        arcadePoints,
        league: profile.league,
        leagueImage: profile.leagueImage,
        memberSince: profile.memberSince,
        level,
        badges: profile.badges.map(b => ({
          name: b.name,
          image: b.image,
          earnedDate: b.earnedDate,
          link: b.link,
          type: b.type,
          points: b.points,
        })),
        badgeCount: profile.badges.length,
      },
    };

    console.log(`Found ${profile.badges.length} badges for ${profile.name} — ${arcadePoints} arcade points (${profile.points} profile points)`);

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
