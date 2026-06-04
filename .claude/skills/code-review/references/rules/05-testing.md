# Testing

> Tests are your safety net - they enable confident refactoring and catch regressions early.

---

## Test Pyramid

1. **Unit Tests** (70%) - Fast, isolated, test single units
2. **Integration Tests** (20%) - Test component interactions
3. **E2E Tests** (10%) - Test complete user flows

---

## Best Practices

- Follow AAA pattern: Arrange, Act, Assert
- One assertion concept per test
- Tests should be independent and isolated
- Use mocking for external dependencies
- Aim for 70-80% code coverage
- Write tests before code (TDD) when possible
- **Key tip:** Write tests first (TDD) to ensure your code is naturally testable
- Pass dependencies as parameters for testability: `process(repository)` instead of hardcoding

---

## Naming Test Cases

```typescript
// Pattern: should_ExpectedBehavior_When_Condition
describe('UserService', () => {
  it('should return user when valid ID provided', () => {});
  it('should throw NotFoundError when user does not exist', () => {});
  it('should hash password before saving', () => {});
});
```

---

## What NOT to Do

- Don't use fake data/mocks just to pass tests
- Don't skip tests to pass CI/CD
- Don't test implementation details, test behavior
- Don't ignore flaky tests - fix them

---

## Test Structure Example

```typescript
describe('OrderService', () => {
  // Arrange - setup shared fixtures
  let orderService: OrderService;
  let mockRepository: jest.Mocked<OrderRepository>;

  beforeEach(() => {
    mockRepository = createMockRepository();
    orderService = new OrderService(mockRepository);
  });

  describe('createOrder', () => {
    it('should create order with valid items', async () => {
      // Arrange
      const items = [{ productId: 1, quantity: 2 }];
      mockRepository.save.mockResolvedValue({ id: 1, items });

      // Act
      const result = await orderService.createOrder(items);

      // Assert
      expect(result.id).toBe(1);
      expect(mockRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({ items })
      );
    });

    it('should throw ValidationError when items empty', async () => {
      // Arrange & Act & Assert
      await expect(orderService.createOrder([]))
        .rejects.toThrow(ValidationError);
    });
  });
});
```
