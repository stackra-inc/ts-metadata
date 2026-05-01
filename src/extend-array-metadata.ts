import { getMetadata } from '@/get-metadata';
import { defineMetadata } from '@/define-metadata';

/**
 * Extends an array-type metadata value by appending new items.
 *
 * If no metadata exists for the given key, creates a new array with the
 * provided items. If metadata already exists, spreads the existing array
 * and appends the new items.
 *
 * This is the standard pattern used by NestJS for decorators like
 * `@UseGuards`, `@UsePipes`, `@UseInterceptors`, and `@UseFilters`
 * that accumulate multiple values on a single metadata key.
 *
 * @template T - The array element type.
 * @param key - The metadata key to extend.
 * @param metadata - Array of items to append.
 * @param target - The target object (class constructor or method descriptor value).
 * @param propertyKey - Optional property key for method-level metadata.
 *
 * @example
 * ```typescript
 * // In a @UseGuards decorator
 * extendArrayMetadata(GUARDS_METADATA, [AuthGuard, RolesGuard], target);
 *
 * // Later, another decorator adds more guards
 * extendArrayMetadata(GUARDS_METADATA, [ThrottleGuard], target);
 *
 * // Result: [AuthGuard, RolesGuard, ThrottleGuard]
 * ```
 *
 * @example
 * ```typescript
 * // Method-level metadata
 * extendArrayMetadata('validators', [EmailValidator], target, 'createUser');
 * ```
 *
 * @since 1.1.0
 * @see {@link defineMetadata} for setting metadata directly
 * @see {@link updateMetadata} for callback-based updates
 */
export function extendArrayMetadata<T>(
  key: string | symbol,
  metadata: T[],
  target: object,
  propertyKey?: string | symbol
): void {
  const previousValue = getMetadata<T[]>(key, target, propertyKey) || [];
  const value = [...previousValue, ...metadata];
  defineMetadata(key, value, target, propertyKey);
}
