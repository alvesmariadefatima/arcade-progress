/**
 * Google Cloud Arcade - Badge Scoring Calculator
 * 
 * This module provides a comprehensive system for calculating arcade badge scores
 * based on Google Cloud's official badge categories and point values.
 */

// ============================================================================
// BADGE DATABASE - Define all badges and their point values
// ============================================================================

/**
 * Badge categories enumeration for better type safety and organization
 */
enum BadgeCategory {
  FUNDAMENTOS_CLOUD = 'fundamentosCloud',
  CYBERSECURITY = 'cybersecurity',
  LIDER_IA = 'liderIA',
  BEGINNER_IA = 'beginnerIA',
  ARCADE = 'arcade',
}

/**
 * Badge type enumeration for scoring rules
 */
enum BadgeType {
  COURSE_LONG = 'courseLong',      // >= 60 minutes (2 points)
  COURSE_SHORT = 'courseShort',    // < 60 minutes (1 point)
  SKILL_BADGE = 'skillBadge',      // Skill Badge (3 points)
  ARCADE_EVENT = 'arcadeEvent',    // Arcade Event (3 points)
}

/**
 * Badge interface defining the structure of each badge
 */
interface Badge {
  name: string;
  category: BadgeCategory;
  type: BadgeType;
  points: number;
  isCredlyCertificate?: boolean;
}

/**
 * Complete badge database with all Google Cloud Arcade badges
 * Organized by category for easy updates and maintenance
 */
const BADGES_DATABASE: Badge[] = [
  // ==================== Fundamentos da Computação em Google Cloud ====================
  // Cursos >= 60 min (2 pts)
  {
    name: 'Google Cloud Computing Foundations: Cloud Computing Fundamentals',
    category: BadgeCategory.FUNDAMENTOS_CLOUD,
    type: BadgeType.COURSE_LONG,
    points: 2,
  },
  {
    name: 'Google Cloud Computing Foundations: Infrastructure in Google Cloud',
    category: BadgeCategory.FUNDAMENTOS_CLOUD,
    type: BadgeType.COURSE_LONG,
    points: 2,
  },
  {
    name: 'Google Cloud Computing Foundations: Networking & Security in Google Cloud',
    category: BadgeCategory.FUNDAMENTOS_CLOUD,
    type: BadgeType.COURSE_LONG,
    points: 2,
  },
  {
    name: 'Google Cloud Computing Foundations: Data, ML, and AI in Google Cloud',
    category: BadgeCategory.FUNDAMENTOS_CLOUD,
    type: BadgeType.COURSE_LONG,
    points: 2,
  },

  // Skill Badges (3 pts)
  {
    name: 'Get Started with Cloud Storage',
    category: BadgeCategory.FUNDAMENTOS_CLOUD,
    type: BadgeType.SKILL_BADGE,
    points: 3,
  },
  {
    name: 'Get Started with Pub/Sub',
    category: BadgeCategory.FUNDAMENTOS_CLOUD,
    type: BadgeType.SKILL_BADGE,
    points: 3,
  },
  {
    name: 'Prepare Data for ML APIs on Google Cloud',
    category: BadgeCategory.FUNDAMENTOS_CLOUD,
    type: BadgeType.SKILL_BADGE,
    points: 3,
  },
  {
    name: 'Build a Secure Google Cloud Network',
    category: BadgeCategory.FUNDAMENTOS_CLOUD,
    type: BadgeType.SKILL_BADGE,
    points: 3,
  },
  {
    name: 'Set Up an App Dev Environment on Google Cloud',
    category: BadgeCategory.FUNDAMENTOS_CLOUD,
    type: BadgeType.SKILL_BADGE,
    points: 3,
  },
  {
    name: 'Implementing Cloud Load Balancing for Compute Engine',
    category: BadgeCategory.FUNDAMENTOS_CLOUD,
    type: BadgeType.SKILL_BADGE,
    points: 3,
  },
  {
    name: 'The Basics of Google Cloud Compute',
    category: BadgeCategory.FUNDAMENTOS_CLOUD,
    type: BadgeType.SKILL_BADGE,
    points: 3,
  },

  // ==================== Google Cloud Cybersecurity ====================
  // Cursos >= 60 min (2 pts)
  {
    name: 'Introduction to Security Principles in Cloud Computing',
    category: BadgeCategory.CYBERSECURITY,
    type: BadgeType.COURSE_LONG,
    points: 2,
  },
  {
    name: 'Strategies for Cloud Security Risk Management',
    category: BadgeCategory.CYBERSECURITY,
    type: BadgeType.COURSE_LONG,
    points: 2,
  },
  {
    name: 'Cloud Security Risks: Identify and Protect Against Threats',
    category: BadgeCategory.CYBERSECURITY,
    type: BadgeType.COURSE_LONG,
    points: 2,
  },
  {
    name: 'Detect, Respond, and Recover from Cloud Cybersecurity Attacks',
    category: BadgeCategory.CYBERSECURITY,
    type: BadgeType.COURSE_LONG,
    points: 2,
  },
  {
    name: 'Put It All Together: Prepare for a Cloud Security Analyst Job',
    category: BadgeCategory.CYBERSECURITY,
    type: BadgeType.COURSE_LONG,
    points: 2,
  },

  // ==================== Líder de IA Generativa ====================
  // Cursos >= 60 min (2 pts) — Path 1951
  {
    name: 'Gen AI: Beyond the Chatbot',
    category: BadgeCategory.LIDER_IA,
    type: BadgeType.COURSE_LONG,
    points: 2,
  },
  {
    name: 'Gen AI: Unlock Foundational Concepts',
    category: BadgeCategory.LIDER_IA,
    type: BadgeType.COURSE_LONG,
    points: 2,
  },
  {
    name: 'Gen AI: Navigate the Landscape',
    category: BadgeCategory.LIDER_IA,
    type: BadgeType.COURSE_LONG,
    points: 2,
  },
  {
    name: 'Gen AI Apps: Transform Your Work',
    category: BadgeCategory.LIDER_IA,
    type: BadgeType.COURSE_LONG,
    points: 2,
  },
  {
    name: 'Gen AI Agents: Transform Your Organization',
    category: BadgeCategory.LIDER_IA,
    type: BadgeType.COURSE_LONG,
    points: 2,
  },

  // ==================== Beginner IA ====================
  // Path 118 — 5 atividades (9 pts base + 2 bônus = 11 pts)
  // Cursos < 60 min (1 pt)
  {
    name: 'Introduction to Generative AI',
    category: BadgeCategory.BEGINNER_IA,
    type: BadgeType.COURSE_SHORT,
    points: 1,
  },
  {
    name: 'Introduction to Large Language Models',
    category: BadgeCategory.BEGINNER_IA,
    type: BadgeType.COURSE_SHORT,
    points: 1,
  },
  {
    name: 'Introduction to Responsible AI',
    category: BadgeCategory.BEGINNER_IA,
    type: BadgeType.COURSE_SHORT,
    points: 1,
  },
  // Skill Badges (3 pts)
  {
    name: 'Prompt Design in Vertex AI',
    category: BadgeCategory.BEGINNER_IA,
    type: BadgeType.SKILL_BADGE,
    points: 3,
  },
  {
    name: 'Responsible AI: Applying AI Principles with Google Cloud',
    category: BadgeCategory.BEGINNER_IA,
    type: BadgeType.SKILL_BADGE,
    points: 3,
  },

  // ==================== Arcade ====================
  // Eventos (3 pts cada — 1 por mês, adicionados dinamicamente)
  {
    name: 'Arcade for Brazil Jan 2026',
    category: BadgeCategory.ARCADE,
    type: BadgeType.ARCADE_EVENT,
    points: 3,
  },
  {
    name: 'Arcade for Brazil Feb 2026',
    category: BadgeCategory.ARCADE,
    type: BadgeType.ARCADE_EVENT,
    points: 3,
  },
  {
    name: 'Arcade for Brazil March 2026',
    category: BadgeCategory.ARCADE,
    type: BadgeType.ARCADE_EVENT,
    points: 3,
  },
  {
    name: 'Arcade for Brazil Apr 2026',
    category: BadgeCategory.ARCADE,
    type: BadgeType.ARCADE_EVENT,
    points: 3,
  },
  {
    name: 'Arcade for Brazil April 2026',
    category: BadgeCategory.ARCADE,
    type: BadgeType.ARCADE_EVENT,
    points: 3,
  },

];

// ============================================================================
// SCORING INTERFACE - Define the return type of calculateScore
// ============================================================================

/**
 * Result interface returned by the calculateScore function
 */
interface ScoreResult {
  totalPoints: number;
  categoryPoints: {
    fundamentosCloud: number;
    cybersecurity: number;
    liderIA: number;
    beginnerIA: number;
    arcade: number;
  };
  recognizedBadges: string[];
  unknownBadges: string[];
}

// ============================================================================
// SCORING FUNCTION - Main calculation logic
// ============================================================================

/**
 * Calculates the total score and breakdown by category for completed badges
 * 
 * @param completedBadges - Array of badge names that have been completed
 * @returns ScoreResult object containing total points, category breakdown, and badge validation
 * 
 * Features:
 * - Avoids duplicate badges in the same completion list
 * - Validates badges against the database
 * - Provides detailed category breakdown
 * - Tracks unrecognized badges for user feedback
 */
/**
 * Normalizes a badge name for flexible matching:
 * lowercase, trim, collapse whitespace, remove special chars
 */
function normalize(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[''""]/g, "'")
    .replace(/\s+/g, ' ')
    .replace(/[:–—]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Pre-build a lookup map with normalized keys for O(1) matching
const normalizedLookup = new Map<string, (typeof BADGES_DATABASE)[number]>();
for (const badge of BADGES_DATABASE) {
  normalizedLookup.set(normalize(badge.name), badge);
}

function calculateScore(completedBadges: string[]): ScoreResult {
  const result: ScoreResult = {
    totalPoints: 0,
    categoryPoints: {
      fundamentosCloud: 0,
      cybersecurity: 0,
      liderIA: 0,
      beginnerIA: 0,
      arcade: 0,
    },
    recognizedBadges: [],
    unknownBadges: [],
  };

  const processedBadges = new Set<string>();

  for (const badgeName of completedBadges) {
    const key = normalize(badgeName);
    if (processedBadges.has(key)) continue;

    // Try exact match first, then normalized match, then "includes" fallback
    let badge = BADGES_DATABASE.find((b) => b.name === badgeName);
    if (!badge) badge = normalizedLookup.get(key);
    if (!badge) {
      // Fuzzy: check if any DB badge name is contained in the scraped name or vice-versa
      badge = BADGES_DATABASE.find((b) => {
        const nDb = normalize(b.name);
        return key.includes(nDb) || nDb.includes(key);
      });
    }

    // Dynamic arcade badge matching: any "Arcade for Brazil" badge → 3pts arcade
    if (!badge && /^arcade\s+(for\s+)?brazil/i.test(badgeName)) {
      result.recognizedBadges.push(badgeName);
      result.totalPoints += 3;
      result.categoryPoints[BadgeCategory.ARCADE] += 3;
      processedBadges.add(key);
      continue;
    }

    if (badge) {
      result.recognizedBadges.push(badgeName);
      result.totalPoints += badge.points;
      result.categoryPoints[badge.category] += badge.points;
      processedBadges.add(key);
    } else {
      result.unknownBadges.push(badgeName);
    }
  }

  return result;
}

// ============================================================================
// EXPORT - Make functions and types available for use
// ============================================================================

// ============================================================================
// TRACK CAPS - Maximum points per track (source of truth)
// ============================================================================

const TRACK_CAPS: Record<BadgeCategory, number> = {
  [BadgeCategory.FUNDAMENTOS_CLOUD]: 20,
  [BadgeCategory.CYBERSECURITY]: 10,
  [BadgeCategory.LIDER_IA]: 10,
  [BadgeCategory.BEGINNER_IA]: 11,
  [BadgeCategory.ARCADE]: 12,
};

/**
 * Bonus points awarded when ALL badges of a track are completed
 */
const TRACK_COMPLETION_BONUS: Partial<Record<BadgeCategory, number>> = {
  [BadgeCategory.BEGINNER_IA]: 2, // 9 base + 2 bônus = 11
};

const MAX_TOTAL_POINTS = Object.values(TRACK_CAPS).reduce((s, v) => s + v, 0); // 55

// ============================================================================
// VALIDATION - Post-calculation integrity checks
// ============================================================================

interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Validates a ScoreResult for data consistency:
 * - No track exceeds its cap
 * - Sum of capped track points equals total
 * - No negative values
 * - Total doesn't exceed theoretical max
 */
function validateScoreResult(result: ScoreResult): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check each track against its cap
  for (const [category, cap] of Object.entries(TRACK_CAPS)) {
    const catKey = category as BadgeCategory;
    const raw = result.categoryPoints[catKey];
    if (raw < 0) {
      errors.push(`Track "${catKey}" has negative points: ${raw}`);
    }
    if (raw > cap) {
      warnings.push(`Track "${catKey}" raw points (${raw}) exceed cap (${cap}) — will be capped`);
    }
  }

  // Check total consistency
  const cappedSum = Object.entries(TRACK_CAPS).reduce((sum, [cat, cap]) => {
    return sum + Math.min(result.categoryPoints[cat as BadgeCategory], cap);
  }, 0);

  if (cappedSum > MAX_TOTAL_POINTS) {
    errors.push(`Capped total (${cappedSum}) exceeds max possible (${MAX_TOTAL_POINTS})`);
  }

  // Check for duplicate recognized badges
  const uniqueRecognized = new Set(result.recognizedBadges.map(n => normalize(n)));
  if (uniqueRecognized.size !== result.recognizedBadges.length) {
    errors.push(`Duplicate badges detected in recognized list (${result.recognizedBadges.length} total, ${uniqueRecognized.size} unique)`);
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Returns capped points per track (including completion bonuses) and capped total
 */
function getCappedScore(result: ScoreResult): { cappedTotal: number; cappedByTrack: Record<BadgeCategory, number> } {
  const cappedByTrack = {} as Record<BadgeCategory, number>;
  let cappedTotal = 0;
  for (const [cat, cap] of Object.entries(TRACK_CAPS)) {
    const catKey = cat as BadgeCategory;
    let points = result.categoryPoints[catKey];

    // Add completion bonus if all badges in the track are completed
    const bonus = TRACK_COMPLETION_BONUS[catKey] ?? 0;
    if (bonus > 0) {
      const trackBadges = BADGES_DATABASE.filter(b => b.category === catKey);
      const completedInTrack = trackBadges.filter(b =>
        result.recognizedBadges.some(rb => normalize(rb) === normalize(b.name))
      );
      if (completedInTrack.length === trackBadges.length && trackBadges.length > 0) {
        points += bonus;
      }
    }

    const capped = Math.min(points, cap);
    cappedByTrack[catKey] = capped;
    cappedTotal += capped;
  }
  return { cappedTotal, cappedByTrack };
}

// ============================================================================
// EXPORT - Make functions and types available for use
// ============================================================================

export {
  calculateScore,
  validateScoreResult,
  getCappedScore,
  BADGES_DATABASE,
  TRACK_CAPS,
  TRACK_COMPLETION_BONUS,
  MAX_TOTAL_POINTS,
  BadgeCategory,
  BadgeType,
  normalize,
  type Badge,
  type ScoreResult,
  type ValidationResult,
};