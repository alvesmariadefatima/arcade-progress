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
    name: 'Google Cloud Computing Foundations: Data, ML and AI in Google Cloud',
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
  // Cursos >= 60 min (2 pts)
  {
    name: 'Gen AI: Unlock Foundational Concepts',
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
  {
    name: 'Responsible AI: Applying AI Principles with Google Cloud',
    category: BadgeCategory.LIDER_IA,
    type: BadgeType.COURSE_LONG,
    points: 2,
  },

  // Skill Badge (3 pts)
  {
    name: 'Prompt Design in Vertex AI',
    category: BadgeCategory.LIDER_IA,
    type: BadgeType.SKILL_BADGE,
    points: 3,
  },

  // ==================== Beginner IA ====================
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
  {
    name: 'Gen AI: Navigate the Landscape',
    category: BadgeCategory.BEGINNER_IA,
    type: BadgeType.COURSE_SHORT,
    points: 1,
  },
  {
    name: 'Gen AI: Beyond the Chatbot',
    category: BadgeCategory.BEGINNER_IA,
    type: BadgeType.COURSE_SHORT,
    points: 1,
  },

  // ==================== Arcade ====================
  // Eventos (3 pts cada — 1 por mês)
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

  // ==================== Credly Certificates (track completion proofs) ====================
  // These map Credly certificate names to the missing individual badges
  {
    name: 'Google Cloud Cybersecurity Certificate',
    category: BadgeCategory.CYBERSECURITY,
    type: BadgeType.COURSE_LONG,
    points: 2,
  },
  {
    name: 'Google Cloud Computing Foundations Certificate',
    category: BadgeCategory.FUNDAMENTOS_CLOUD,
    type: BadgeType.COURSE_LONG,
    points: 2,
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

export {
  calculateScore,
  BADGES_DATABASE,
  BadgeCategory,
  BadgeType,
  type Badge,
  type ScoreResult,
};