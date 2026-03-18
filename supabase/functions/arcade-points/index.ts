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
  source?: 'google_skills' | 'credly';
}

function classifyBadge(name: string, description: string): { type: BadgeInfo['type']; points: number } {
  if (/^arcade\b/i.test(name)) {
    return { type: 'arcade_game', points: 3 };
  }
  if (/earn a skill badge/i.test(description) || /complete the .+ skill badge/i.test(description)) {
    return { type: 'skill_badge', points: 3 };
  }
  return { type: 'course_short', points: 1 };
}

function parseProfile(markdown: string, html: string) {
  const lines = markdown.split('\n').map(l => l.trim()).filter(l => l.length > 0);

  let name = 'Usuário';
  for (const line of lines) {
    const h1 = line.match(/^# (.+)$/);
    if (h1) { name = h1[1].trim(); break; }
  }

  let points = 0;
  for (const line of lines) {
    const pointsMatch = line.match(/\*\*(\d[\d,\.]*)\s*points?\*\*/i);
    if (pointsMatch) { points = parseInt(pointsMatch[1].replace(/[,\.]/g, ''), 10); break; }
  }

  let league = '';
  for (const line of lines) {
    const leagueMatch = line.match(/^##\s+(.+League)/i);
    if (leagueMatch) { league = leagueMatch[1].trim(); break; }
  }

  let memberSince = '';
  for (const line of lines) {
    const memberMatch = line.match(/Member since (\d{4})/i);
    if (memberMatch) { memberSince = memberMatch[1]; break; }
  }

  let leagueImage = '';
  if (html) {
    const leagueImgMatch = html.match(/profile-league[\s\S]*?<img[^>]*src="([^"]+)"/i);
    if (leagueImgMatch) leagueImage = leagueImgMatch[1];
  }

  let avatar = '';
  if (html) {
    const avatarMatch = html.match(/ql-avatar[^>]*src="([^"]+)"/i)
      || html.match(/lh3\.googleusercontent\.com[^"'\s)]+/i);
    if (avatarMatch) avatar = avatarMatch[1] || avatarMatch[0];
  }

  const badges: BadgeInfo[] = [];
  const seenLinks = new Set<string>();

  const badgeDescriptions = new Map<string, string>();
  for (let i = 0; i < lines.length; i++) {
    const h1Match = lines[i].match(/^# (.+)$/);
    if (h1Match && i + 1 < lines.length && lines[i + 1] === 'Dismiss') {
      const detailName = h1Match[1].trim();
      let desc = '';
      for (let j = i + 2; j < lines.length && j <= i + 15; j++) {
        if (lines[j] === 'Learn more' || lines[j].startsWith('# ') || lines[j] === 'close') break;
        desc += ' ' + lines[j];
      }
      badgeDescriptions.set(detailName.toLowerCase(), desc.trim());
    }
  }

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
        badges.push({ name: badgeName, image, earnedDate, link, type: classification.type, points: classification.points, source: 'google_skills' });
      }
    }
  }

  return { name, points, league, leagueImage, memberSince, avatar, badges };
}

function parseCredlyProfile(markdown: string): BadgeInfo[] {
  const badges: BadgeInfo[] = [];
  const lines = markdown.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  const seenNames = new Set<string>();

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Match image pattern: ![Badge Name](image_url)
    const imgMatch = line.match(/^!\[([^\]]+)\]\(([^)]+)\)$/);
    if (imgMatch) {
      const altText = imgMatch[1].trim();
      const image = imgMatch[2];

      // Next line should have the badge name + issuer
      let badgeName = '';
      let earnedDate = '';
      for (let j = i + 1; j < lines.length && j <= i + 4; j++) {
        const nextLine = lines[j];
        if (!badgeName && nextLine.length > 3 && !nextLine.startsWith('![') && !nextLine.startsWith('Issued')) {
          // Badge name line often has issuer appended, e.g. "Google Cloud Cybersecurity CertificateGoogle Cloud"
          badgeName = nextLine.replace(/Google Cloud$/, '').trim();
        }
        if (nextLine.startsWith('Issued ')) {
          earnedDate = nextLine.replace('Issued ', '');
          break;
        }
      }

      if (!badgeName && altText) {
        badgeName = altText;
      }

      if (badgeName && !seenNames.has(badgeName.toLowerCase())) {
        seenNames.add(badgeName.toLowerCase());
        // Classify Credly badges - certificates are typically course completions
        const isCertificate = /certificate/i.test(badgeName);
        const isSkillBadge = /skill badge/i.test(badgeName);
        let type: BadgeInfo['type'] = 'course_long';
        let points = 2;
        if (isSkillBadge) { type = 'skill_badge'; points = 3; }

        badges.push({
          name: badgeName,
          image,
          earnedDate,
          link: '',
          type,
          points,
          source: 'credly',
        });
      }
    }
  }

  return badges;
}

async function scrapeUrl(apiKey: string, url: string, formats: string[] = ['markdown', 'html']): Promise<{ markdown: string; html: string }> {
  const response = await fetch('https://api.firecrawl.dev/v1/scrape', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url,
      formats,
      waitFor: 8000,
      onlyMainContent: false,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || `Scrape failed with status ${response.status}`);
  }

  return {
    markdown: data.data?.markdown || data.markdown || '',
    html: data.data?.html || data.html || '',
  };
}

function calculateArcadePoints(badges: BadgeInfo[]): number {
  return badges.reduce((sum, b) => sum + b.points, 0);
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { profileUrl, credlyUrl } = await req.json();

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

    // Scrape Google Skills profile
    const { markdown, html } = await scrapeUrl(apiKey, formattedUrl);
    console.log('Google Skills markdown length:', markdown.length);
    const profile = parseProfile(markdown, html);

    // Scrape Credly profile if provided
    let credlyBadges: BadgeInfo[] = [];
    if (credlyUrl) {
      let formattedCredlyUrl = credlyUrl.trim();
      if (!formattedCredlyUrl.startsWith('http://') && !formattedCredlyUrl.startsWith('https://')) {
        formattedCredlyUrl = `https://${formattedCredlyUrl}`;
      }
      console.log('Scraping Credly profile:', formattedCredlyUrl);
      try {
        const credlyData = await scrapeUrl(apiKey, formattedCredlyUrl, ['markdown']);
        console.log('Credly markdown length:', credlyData.markdown.length);
        credlyBadges = parseCredlyProfile(credlyData.markdown);
        console.log(`Found ${credlyBadges.length} Credly badges`);
      } catch (err) {
        console.error('Credly scrape error (non-fatal):', err);
      }
    }

    // Merge badges: add Credly badges that don't duplicate Google Skills ones
    const existingNames = new Set(profile.badges.map(b => b.name.toLowerCase()));
    for (const cb of credlyBadges) {
      if (!existingNames.has(cb.name.toLowerCase())) {
        profile.badges.push(cb);
        existingNames.add(cb.name.toLowerCase());
      }
    }

    const arcadePoints = calculateArcadePoints(profile.badges);
    
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
          source: b.source || 'google_skills',
        })),
        badgeCount: profile.badges.length,
        credlyBadgesCount: credlyBadges.length,
      },
    };

    console.log(`Found ${profile.badges.length} total badges for ${profile.name} — ${arcadePoints} arcade points (${credlyBadges.length} from Credly)`);

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
