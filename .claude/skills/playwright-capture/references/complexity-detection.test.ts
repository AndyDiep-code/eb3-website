import { describe, it, expect } from 'vitest';
import {
  ComplexityDetector,
  createComplexityDetector,
  detectComplexity,
  PageMetadata,
  ComplexityLevel,
  PageMetadataSchema,
  ComplexityResultSchema,
} from './complexity-detection';

describe('ComplexityDetector', () => {
  describe('schema validation', () => {
    it('should validate correct metadata schema', () => {
      const metadata: PageMetadata = {
        url: 'https://example.com/page',
        title: 'Test Page',
        elementCount: 10,
        interactionCount: 5,
        workflowCount: 2,
        sectionCount: 3,
        formCount: 1,
        nestedDepth: 4,
        uniqueRoleCount: 8,
      };

      expect(() => PageMetadataSchema.parse(metadata)).not.toThrow();
    });

    it('should reject invalid URL in metadata', () => {
      const invalidMetadata = {
        url: 'not-a-url',
        title: 'Test',
        elementCount: 10,
        interactionCount: 5,
        workflowCount: 2,
        sectionCount: 3,
        formCount: 1,
        nestedDepth: 4,
        uniqueRoleCount: 8,
      };

      expect(() => PageMetadataSchema.parse(invalidMetadata)).toThrow();
    });

    it('should reject negative counts in metadata', () => {
      const invalidMetadata = {
        url: 'https://example.com',
        title: 'Test',
        elementCount: -1,
        interactionCount: 5,
        workflowCount: 2,
        sectionCount: 3,
        formCount: 1,
        nestedDepth: 4,
        uniqueRoleCount: 8,
      };

      expect(() => PageMetadataSchema.parse(invalidMetadata)).toThrow();
    });
  });

  describe('simple complexity detection', () => {
    it('should classify page with <15 score as simple', () => {
      const detector = createComplexityDetector();
      const metadata: PageMetadata = {
        url: 'https://example.com/simple',
        title: 'Simple Page',
        elementCount: 5,
        interactionCount: 2,
        workflowCount: 1,
        sectionCount: 1,
        formCount: 0,
        nestedDepth: 2,
        uniqueRoleCount: 3,
      };

      const result = detector.detect(metadata);

      expect(result.level).toBe('simple');
      expect(result.score).toBeLessThan(15);
      expect(result.elementMetrics.count).toBe(5);
      expect(result.interactionMetrics.count).toBe(2);
      expect(result.workflowMetrics.count).toBe(1);
    });

    it('should calculate correct weighted score for simple page', () => {
      const detector = createComplexityDetector();
      const metadata: PageMetadata = {
        url: 'https://example.com/simple',
        title: 'Simple Page',
        elementCount: 5,
        interactionCount: 3,
        workflowCount: 1,
        sectionCount: 1,
        formCount: 0,
        nestedDepth: 2,
        uniqueRoleCount: 3,
      };

      const result = detector.detect(metadata);

      // Score = (5 * 1.0) + (3 * 1.2) + (1 * 1.5) = 5 + 3.6 + 1.5 = 10.1 → 10
      expect(result.score).toBe(10);
    });
  });

  describe('medium complexity detection', () => {
    it('should classify page with 15-40 score as medium', () => {
      const detector = createComplexityDetector();
      const metadata: PageMetadata = {
        url: 'https://example.com/medium',
        title: 'Medium Page',
        elementCount: 15,
        interactionCount: 8,
        workflowCount: 2,
        sectionCount: 4,
        formCount: 2,
        nestedDepth: 5,
        uniqueRoleCount: 12,
      };

      const result = detector.detect(metadata);

      expect(result.level).toBe('medium');
      expect(result.score).toBeGreaterThanOrEqual(15);
      expect(result.score).toBeLessThanOrEqual(40);
    });

    it('should calculate correct weighted score for medium page', () => {
      const detector = createComplexityDetector();
      const metadata: PageMetadata = {
        url: 'https://example.com/medium',
        title: 'Medium Page',
        elementCount: 10,
        interactionCount: 10,
        workflowCount: 3,
        sectionCount: 4,
        formCount: 2,
        nestedDepth: 5,
        uniqueRoleCount: 12,
      };

      const result = detector.detect(metadata);

      // Score = (10 * 1.0) + (10 * 1.2) + (3 * 1.5) = 10 + 12 + 4.5 = 26.5 → 27
      expect(result.score).toBe(27);
      expect(result.level).toBe('medium');
    });

    it('should classify boundary case (score = 15) as medium', () => {
      const detector = createComplexityDetector();
      const metadata: PageMetadata = {
        url: 'https://example.com/boundary',
        title: 'Boundary Page',
        elementCount: 15,
        interactionCount: 0,
        workflowCount: 0,
        sectionCount: 2,
        formCount: 0,
        nestedDepth: 3,
        uniqueRoleCount: 5,
      };

      const result = detector.detect(metadata);

      expect(result.score).toBe(15);
      expect(result.level).toBe('medium');
    });

    it('should classify boundary case (score = 40) as medium', () => {
      const detector = createComplexityDetector();
      const metadata: PageMetadata = {
        url: 'https://example.com/boundary',
        title: 'Boundary Page',
        elementCount: 20,
        interactionCount: 15,
        workflowCount: 1,
        sectionCount: 5,
        formCount: 2,
        nestedDepth: 6,
        uniqueRoleCount: 15,
      };

      const result = detector.detect(metadata);

      // Score = (20 * 1.0) + (15 * 1.2) + (1 * 1.5) = 20 + 18 + 1.5 = 39.5 → 40
      expect(result.score).toBe(40);
      expect(result.level).toBe('medium');
    });
  });

  describe('complex complexity detection', () => {
    it('should classify page with >40 score as complex', () => {
      const detector = createComplexityDetector();
      const metadata: PageMetadata = {
        url: 'https://example.com/complex',
        title: 'Complex Page',
        elementCount: 45,
        interactionCount: 20,
        workflowCount: 8,
        sectionCount: 10,
        formCount: 5,
        nestedDepth: 8,
        uniqueRoleCount: 25,
      };

      const result = detector.detect(metadata);

      expect(result.level).toBe('complex');
      expect(result.score).toBeGreaterThan(40);
    });

    it('should calculate correct weighted score for complex page', () => {
      const detector = createComplexityDetector();
      const metadata: PageMetadata = {
        url: 'https://example.com/complex',
        title: 'Complex Page',
        elementCount: 30,
        interactionCount: 25,
        workflowCount: 5,
        sectionCount: 8,
        formCount: 3,
        nestedDepth: 7,
        uniqueRoleCount: 20,
      };

      const result = detector.detect(metadata);

      // Score = (30 * 1.0) + (25 * 1.2) + (5 * 1.5) = 30 + 30 + 7.5 = 67.5 → 68
      expect(result.score).toBe(68);
      expect(result.level).toBe('complex');
    });

    it('should classify boundary case (score = 41) as complex', () => {
      const detector = createComplexityDetector();
      const metadata: PageMetadata = {
        url: 'https://example.com/boundary',
        title: 'Boundary Page',
        elementCount: 25,
        interactionCount: 15,
        workflowCount: 2,
        sectionCount: 6,
        formCount: 2,
        nestedDepth: 6,
        uniqueRoleCount: 18,
      };

      const result = detector.detect(metadata);

      expect(result.score).toBeGreaterThan(40);
      expect(result.level).toBe('complex');
    });
  });

  describe('edge cases', () => {
    it('should handle page with zero metrics', () => {
      const detector = createComplexityDetector();
      const metadata: PageMetadata = {
        url: 'https://example.com/empty',
        title: 'Empty Page',
        elementCount: 0,
        interactionCount: 0,
        workflowCount: 0,
        sectionCount: 0,
        formCount: 0,
        nestedDepth: 0,
        uniqueRoleCount: 0,
      };

      const result = detector.detect(metadata);

      expect(result.level).toBe('simple');
      expect(result.score).toBe(0);
    });

    it('should handle page with very high metrics', () => {
      const detector = createComplexityDetector();
      const metadata: PageMetadata = {
        url: 'https://example.com/huge',
        title: 'Huge Page',
        elementCount: 500,
        interactionCount: 300,
        workflowCount: 50,
        sectionCount: 100,
        formCount: 20,
        nestedDepth: 20,
        uniqueRoleCount: 100,
      };

      const result = detector.detect(metadata);

      // Score = (500 * 1.0) + (300 * 1.2) + (50 * 1.5) = 500 + 360 + 75 = 935
      expect(result.level).toBe('complex');
      expect(result.score).toBe(935);
    });

    it('should generate reasonable reasoning for simple page', () => {
      const detector = createComplexityDetector();
      const metadata: PageMetadata = {
        url: 'https://example.com/simple',
        title: 'Simple Page',
        elementCount: 5,
        interactionCount: 2,
        workflowCount: 1,
        sectionCount: 1,
        formCount: 0,
        nestedDepth: 2,
        uniqueRoleCount: 3,
      };

      const result = detector.detect(metadata);

      expect(result.reasoning).toContain('Simple');
      expect(result.reasoning).toContain('5 interactive elements');
      expect(result.reasoning).toContain('2 interactions');
      expect(result.reasoning).toContain('1 workflows');
    });
  });

  describe('custom thresholds', () => {
    it('should respect custom threshold configuration', () => {
      const detector = createComplexityDetector({
        simpleMax: 20,
        mediumMax: 50,
        elementWeight: 1.5,
        interactionWeight: 1.0,
        workflowWeight: 2.0,
      });

      const metadata: PageMetadata = {
        url: 'https://example.com/custom',
        title: 'Custom Page',
        elementCount: 10,
        interactionCount: 5,
        workflowCount: 2,
        sectionCount: 2,
        formCount: 1,
        nestedDepth: 3,
        uniqueRoleCount: 5,
      };

      const result = detector.detect(metadata);

      // Score = (10 * 1.5) + (5 * 1.0) + (2 * 2.0) = 15 + 5 + 4 = 24
      expect(result.score).toBe(24);
      expect(result.level).toBe('medium');
    });

    it('should retrieve current threshold configuration', () => {
      const customThresholds = {
        simpleMax: 20,
        mediumMax: 60,
        elementWeight: 1.5,
      };

      const detector = createComplexityDetector(customThresholds);
      const thresholds = detector.getThresholds();

      expect(thresholds.simpleMax).toBe(20);
      expect(thresholds.mediumMax).toBe(60);
      expect(thresholds.elementWeight).toBe(1.5);
    });
  });

  describe('convenience functions', () => {
    it('should create detector with default config', () => {
      const detector = createComplexityDetector();
      const metadata: PageMetadata = {
        url: 'https://example.com',
        title: 'Test',
        elementCount: 10,
        interactionCount: 5,
        workflowCount: 1,
        sectionCount: 2,
        formCount: 0,
        nestedDepth: 3,
        uniqueRoleCount: 5,
      };

      const result = detector.detect(metadata);
      expect(result.level).toBeDefined();
      expect(result.score).toBeDefined();
    });

    it('should detect complexity from metadata directly', () => {
      const metadata: PageMetadata = {
        url: 'https://example.com',
        title: 'Test',
        elementCount: 50,
        interactionCount: 30,
        workflowCount: 10,
        sectionCount: 8,
        formCount: 3,
        nestedDepth: 6,
        uniqueRoleCount: 20,
      };

      const result = detectComplexity(metadata);

      expect(result.level).toBe('complex');
      expect(result.score).toBeGreaterThan(40);
    });
  });

  describe('result schema validation', () => {
    it('should produce valid result schema', () => {
      const detector = createComplexityDetector();
      const metadata: PageMetadata = {
        url: 'https://example.com',
        title: 'Test',
        elementCount: 15,
        interactionCount: 10,
        workflowCount: 2,
        sectionCount: 3,
        formCount: 1,
        nestedDepth: 4,
        uniqueRoleCount: 8,
      };

      const result = detector.detect(metadata);

      expect(() => ComplexityResultSchema.parse(result)).not.toThrow();
    });
  });

  describe('metric isolation', () => {
    it('should correctly isolate element metrics', () => {
      const detector = createComplexityDetector();
      const metadata: PageMetadata = {
        url: 'https://example.com',
        title: 'Test',
        elementCount: 10,
        interactionCount: 0,
        workflowCount: 0,
        sectionCount: 1,
        formCount: 0,
        nestedDepth: 2,
        uniqueRoleCount: 3,
      };

      const result = detector.detect(metadata);

      expect(result.elementMetrics.count).toBe(10);
      expect(result.elementMetrics.weight).toBe(10);
      expect(result.interactionMetrics.weight).toBe(0);
      expect(result.workflowMetrics.weight).toBe(0);
      expect(result.score).toBe(10);
    });

    it('should correctly isolate interaction metrics', () => {
      const detector = createComplexityDetector();
      const metadata: PageMetadata = {
        url: 'https://example.com',
        title: 'Test',
        elementCount: 0,
        interactionCount: 10,
        workflowCount: 0,
        sectionCount: 1,
        formCount: 0,
        nestedDepth: 2,
        uniqueRoleCount: 3,
      };

      const result = detector.detect(metadata);

      expect(result.interactionMetrics.count).toBe(10);
      expect(result.interactionMetrics.weight).toBe(12);
      expect(result.elementMetrics.weight).toBe(0);
      expect(result.workflowMetrics.weight).toBe(0);
      expect(result.score).toBe(12);
    });

    it('should correctly isolate workflow metrics', () => {
      const detector = createComplexityDetector();
      const metadata: PageMetadata = {
        url: 'https://example.com',
        title: 'Test',
        elementCount: 0,
        interactionCount: 0,
        workflowCount: 10,
        sectionCount: 1,
        formCount: 0,
        nestedDepth: 2,
        uniqueRoleCount: 3,
      };

      const result = detector.detect(metadata);

      expect(result.workflowMetrics.count).toBe(10);
      expect(result.workflowMetrics.weight).toBe(15);
      expect(result.elementMetrics.weight).toBe(0);
      expect(result.interactionMetrics.weight).toBe(0);
      expect(result.score).toBe(15);
    });
  });
});
