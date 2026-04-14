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

// Known long courses (>= 60 min, 2pts) - from official scoring table
const LONG_COURSES = new Set([
  'google cloud computing foundations: cloud computing fundamentals',
  'google cloud computing foundations: infrastructure in google cloud',
  'google cloud computing foundations: networking & security in google cloud',
  'google cloud computing foundations: data, ml, and ai in google cloud',
  'introduction to security principles in cloud computing',
  'strategies for cloud security risk management',
  'cloud security risks: identify and protect against threats',
  'detect, respond, and recover from cloud cybersecurity attacks',
  'put it all together: prepare for a cloud security analyst job',
  // Líder IA (Path 1951) - all 5 are long courses
  'gen ai: beyond the chatbot',
  'gen ai: unlock foundational concepts',
  'gen ai: navigate the landscape',
  'gen ai apps: transform your work',
  'gen ai agents: transform your organization',
]);

// Known skill badges (3pts) - from official scoring table
const SKILL_BADGES = new Set([
  'prepare data for ml apis on google cloud',
  'build a secure google cloud network',
  'set up an app dev environment on google cloud',
  'implementing cloud load balancing for compute engine',
  // Beginner IA (Path 118) - skill badge
  'prompt design in vertex ai',
]);

function classifyBadge(name: string, description: string): { type: BadgeInfo['type']; points: number } {
  const normalized = name.toLowerCase().trim();

  if (/^arcade\b/i.test(name)) {
    return { type: 'arcade_game', points: 3 };
  }

  // Check known skill badges first
  if (SKILL_BADGES.has(normalized)) {
    return { type: 'skill_badge', points: 3 };
  }

  // Check description for skill badge pattern
  if (/earn a skill badge/i.test(description) || /complete the .+ skill badge/i.test(description)) {
    return { type: 'skill_badge', points: 3 };
  }

  // Check known long courses
  if (LONG_COURSES.has(normalized)) {
    return { type: 'course_long', points: 2 };
  }

  // Default: short course
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
      waitFor: 5000,
      onlyMainContent: false,
      actions: [
        { type: 'scroll', direction: 'down', amount: 3 },
        { type: 'wait', milliseconds: 2000 },
        { type: 'scroll', direction: 'down', amount: 3 },
        { type: 'wait', milliseconds: 2000 },
        { type: 'scroll', direction: 'up', amount: 10 },
        { type: 'wait', milliseconds: 1000 },
      ],
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

// ============================================================================
// STRUCTURED LOGGING
// ============================================================================

function structuredLog(event: string, data: Record<string, unknown>) {
  console.log(JSON.stringify({ event, timestamp: new Date().toISOString(), ...data }));
}

// ============================================================================
// POST-CALCULATION VALIDATION
// ============================================================================

interface ValidationIssue {
  type: 'error' | 'warning';
  message: string;
}

function validateResult(badges: BadgeInfo[], arcadePoints: number): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  // Check for negative scores
  if (arcadePoints < 0) {
    issues.push({ type: 'error', message: `Negative total score: ${arcadePoints}` });
  }

  // Check for duplicate badges (by link)
  const links = badges.map(b => b.link).filter(Boolean);
  const uniqueLinks = new Set(links);
  if (uniqueLinks.size !== links.length) {
    issues.push({ type: 'warning', message: `Duplicate badges detected: ${links.length} total, ${uniqueLinks.size} unique` });
  }

  // Check individual badge points are valid
  const validPoints = new Set([1, 2, 3]);
  for (const badge of badges) {
    if (!validPoints.has(badge.points)) {
      issues.push({ type: 'error', message: `Badge "${badge.name}" has invalid points: ${badge.points}` });
    }
  }

  // Verify sum matches
  const expectedSum = badges.reduce((sum, b) => sum + b.points, 0);
  if (expectedSum !== arcadePoints) {
    issues.push({ type: 'error', message: `Score mismatch: sum=${expectedSum}, reported=${arcadePoints}` });
  }

  return issues;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const startTime = Date.now();
    const { profileUrl } = await req.json();

    if (!profileUrl) {
      structuredLog('validation_error', { error: 'missing_profile_url' });
      return new Response(
        JSON.stringify({ success: false, error: 'URL do perfil é obrigatória' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const apiKey = Deno.env.get('FIRECRAWL_API_KEY');
    if (!apiKey) {
      structuredLog('config_error', { error: 'missing_firecrawl_key' });
      return new Response(
        JSON.stringify({ success: false, error: 'Firecrawl não configurado' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let formattedUrl = profileUrl.trim();
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = `https://${formattedUrl}`;
    }

    structuredLog('scrape_start', { url: formattedUrl });

    // Scrape Google Skills profile
    const { markdown, html } = await scrapeUrl(apiKey, formattedUrl);
    const scrapeMs = Date.now() - startTime;
    structuredLog('scrape_complete', { url: formattedUrl, markdown_length: markdown.length, duration_ms: scrapeMs });

    if (!markdown || markdown.length < 50) {
      structuredLog('scrape_warning', { url: formattedUrl, markdown_length: markdown.length, reason: 'empty_or_short_response' });
    }

    const profile = parseProfile(markdown, html);

    // Post-parse validation
    if (profile.badges.length === 0) {
      structuredLog('parse_warning', { url: formattedUrl, reason: 'no_badges_found', name: profile.name });
    }
    
    const arcadePoints = calculateArcadePoints(profile.badges);

    // Post-calculation validation
    const validationIssues = validateResult(profile.badges, arcadePoints);
    if (validationIssues.length > 0) {
      structuredLog('validation_issues', {
        url: formattedUrl,
        issues: validationIssues,
        badge_count: profile.badges.length,
        score: arcadePoints,
      });
    }
    
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
          source: 'google_skills',
        })),
        badgeCount: profile.badges.length,
        validation: {
          issues: validationIssues,
          isConsistent: validationIssues.filter(i => i.type === 'error').length === 0,
        },
      },
    };

    const totalMs = Date.now() - startTime;
    structuredLog('score_calculated', {
      profile: formattedUrl,
      name: profile.name,
      badges: profile.badges.length,
      score: arcadePoints,
      level,
      duration_ms: totalMs,
      is_consistent: result.data.validation.isConsistent,
    });

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    structuredLog('error', {
      error: error instanceof Error ? error.message : 'unknown',
      stack: error instanceof Error ? error.stack : undefined,
    });
    return new Response(
      JSON.stringify({ success: false, error: error instanceof Error ? error.message : 'Erro desconhecido' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
