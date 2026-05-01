import { defineMetadata } from '@/define-metadata';

/**
 * A decorator type that can be applied to both classes and methods,
 * and exposes the metadata key via a `KEY` property for reflection.
 */
export type CustomDecorator<TKey = string> = MethodDecorator &
  ClassDecorator & {
    /** The metadata key used by this decorator. */
    KEY: TKey;
  };

/**
 * Creates a decorator that assigns metadata to a class or method.
 *
 * Returns a decorator factory that can be used as both a class decorator
 * and a method decorator. The returned decorator also exposes a `KEY`
 * property containing the metadata key, which is useful for reflection.
 *
 * This follows the NestJS `SetMetadata` pattern and is the recommended
 * way to create custom metadata decorators.
 *
 * @template K - The metadata key type (defaults to `string`).
 * @template V - The metadata value type (defaults to `any`).
 * @param metadataKey - The key under which the metadata is stored.
 * @param metadataValue - The metadata value to associate with the key.
 * @returns A decorator that can be applied to classes or methods.
 *
 * @example
 * ```typescript
 * // Create a custom decorator
 * const Roles = (...roles: string[]) => setMetadata('roles', roles);
 *
 * // Use as a class decorator
 * @Roles('admin')
 * class AdminController {}
 *
 * // Use as a method decorator
 * class UserController {
 *   @Roles('user', 'admin')
 *   getProfile() {}
 * }
 *
 * // Reflect the metadata
 * const roles = getMetadata<string[]>('roles', AdminController);
 * // ['admin']
 * ```
 *
 * @example
 * ```typescript
 * // Access the KEY property for dynamic reflection
 * const IsPublic = setMetadata('isPublic', true);
 * console.log(IsPublic.KEY); // 'isPublic'
 * ```
 *
 * @since 1.1.0
 * @see {@link defineMetadata} for low-level metadata definition
 * @see {@link getMetadata} for retrieving metadata values
 */
export function setMetadata<K = string, V = any>(
  metadataKey: K,
  metadataValue: V
): CustomDecorator<K> {
  const decoratorFactory = (
    target: object,
    _key?: string | symbol,
    descriptor?: TypedPropertyDescriptor<any>
  ) => {
    if (descriptor) {
      // Method decorator — attach metadata to the method
      defineMetadata(metadataKey as any, metadataValue, descriptor.value);
      return descriptor;
    }
    // Class decorator — attach metadata to the class constructor
    defineMetadata(metadataKey as any, metadataValue, target);
    return target;
  };

  // Expose the metadata key for reflection
  decoratorFactory.KEY = metadataKey;

  return decoratorFactory as CustomDecorator<K>;
}
