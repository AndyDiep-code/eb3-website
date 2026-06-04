import { z } from 'zod';

/**
 * Complexity Classification Levels
 * Simple (<15): Basic single-page apps with minimal interactions
 * Medium (15-40): Multi-section pages with moderate workflows
 * Complex (>40): Enterprise apps with many elements and interactions
 */
export const ComplexityLevel = z.enum(['simple', 'medium', 'complex']);
export type ComplexityLevel = z.infer<typeof ComplexityLevel>;

/**
 * Page metadata used for complexity detection
 */
export const PageMetadataSchema = z.object({
  url: z.string().url(),
  title: z.string(),
  elementCount: z.number().int().min(0),
  interactionCount: z.number().int().min(0),
  workflowCount: z.number().int().min(0),
  sectionCount: z.number().int().min(0),
  formCount: z.number().int().min(0),
  nestedDepth: z.number().int().min(0),
  uniqueRoleCount: z.number().int().min(0),
});

export type PageMetadata = z.infer<typeof PageMetadataSchema>;

/**
 * Complexity detection result with classification and details
 */
export const ComplexityResultSchema = z.object({
  level: ComplexityLevel,
  score: z.number().int().min(0),
  elementMetrics: z.object({
    count: z.number().int(),
    weight: z.number(),
  }),
  interactionMetrics: z.object({
    count: z.number().int(),
    weight: z.number(),
  }),
  workflowMetrics: z.object({
    count: z.number().int(),
    weight: z.number(),
  }),
  reasoning: z.string(),
});

export type ComplexityResult = z.infer<typeof ComplexityResultSchema>;

/**
 * Configuration for complexity thresholds
 */
interface ComplexityThresholds {
  simpleMax: number;
  mediumMax: number;
  elementWeight: number;
  interactionWeight: number;
  workflowWeight: number;
}

const DEFAULT_THRESHOLDS: ComplexityThresholds = {
  simpleMax: 15,
  mediumMax: 40,
  elementWeight: 1.0,
  interactionWeight: 1.2,
  workflowWeight: 1.5,
};

/**
 * Detects the complexity level of a page based on metadata metrics
 *
 * Complexity Score = (elementCount × 1.0) + (interactionCount × 1.2) + (workflowCount × 1.5)
 * - Simple: score < 15
 * - Medium: score 15-40
 * - Complex: score > 40
 */
export class ComplexityDetector {
  private thresholds: ComplexityThresholds;

  constructor(thresholds: Partial<ComplexityThresholds> = {}) {
    this.thresholds = { ...DEFAULT_THRESHOLDS, ...thresholds };
  }

  /**
   * Detect complexity level from page metadata
   */
  detect(metadata: PageMetadata): ComplexityResult {
    // Validate input
    const validatedMetadata = PageMetadataSchema.parse(metadata);

    // Calculate weighted score for each metric
    const elementMetrics = {
      count: validatedMetadata.elementCount,
      weight: validatedMetadata.elementCount * this.thresholds.elementWeight,
    };

    const interactionMetrics = {
      count: validatedMetadata.interactionCount,
      weight: validatedMetadata.interactionCount * this.thresholds.interactionWeight,
    };

    const workflowMetrics = {
      count: validatedMetadata.workflowCount,
      weight: validatedMetadata.workflowCount * this.thresholds.workflowWeight,
    };

    // Calculate total complexity score
    const totalScore = Math.round(
      elementMetrics.weight + interactionMetrics.weight + workflowMetrics.weight
    );

    // Classify based on thresholds
    const level = this.classifyScore(totalScore);

    // Generate reasoning
    const reasoning = this.generateReasoning(
      validatedMetadata,
      totalScore,
      level
    );

    return {
      level,
      score: totalScore,
      elementMetrics,
      interactionMetrics,
      workflowMetrics,
      reasoning,
    };
  }

  /**
   * Classify complexity level based on score
   */
  private classifyScore(score: number): ComplexityLevel {
    if (score < this.thresholds.simpleMax) {
      return 'simple';
    }
    if (score <= this.thresholds.mediumMax) {
      return 'medium';
    }
    return 'complex';
  }

  /**
   * Generate human-readable reasoning for the classification
   */
  private generateReasoning(
    metadata: PageMetadata,
    score: number,
    level: ComplexityLevel
  ): string {
    const factors: string[] = [];

    if (metadata.elementCount > 0) {
      factors.push(`${metadata.elementCount} interactive elements`);
    }
    if (metadata.interactionCount > 0) {
      factors.push(`${metadata.interactionCount} interactions`);
    }
    if (metadata.workflowCount > 0) {
      factors.push(`${metadata.workflowCount} workflows`);
    }
    if (metadata.formCount > 0) {
      factors.push(`${metadata.formCount} forms`);
    }
    if (metadata.sectionCount > 0) {
      factors.push(`${metadata.sectionCount} sections`);
    }

    const factorString = factors.length > 0 ? ` (${factors.join(', ')})` : '';

    return `${level.charAt(0).toUpperCase() + level.slice(1)} complexity page with score ${score}${factorString}`;
  }

  /**
   * Get the current threshold configuration
   */
  getThresholds(): ComplexityThresholds {
    return { ...this.thresholds };
  }
}

/**
 * Create a complexity detector with default configuration
 */
export function createComplexityDetector(
  thresholds?: Partial<ComplexityThresholds>
): ComplexityDetector {
  return new ComplexityDetector(thresholds);
}

/**
 * Detect complexity from raw metadata object (convenience function)
 */
export function detectComplexity(metadata: PageMetadata): ComplexityResult {
  const detector = createComplexityDetector();
  return detector.detect(metadata);
}
