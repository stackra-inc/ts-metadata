import 'reflect-metadata';

/**
 * Returns metadata keys defined directly on the target, excluding
 * inherited keys from the prototype chain.
 *
 * Useful for determining which metadata was explicitly set on a class
 * or method versus inherited from a parent.
 *
 * @param target - The target object to inspect.
 * @param propertyKey - Optional property key for property-level metadata.
 * @returns An array of own metadata keys.
 *
 * @example
 * ```typescript
 * @defineMetadata('scope', 'global')
 * class Base {}
 *
 * @defineMetadata('feature', 'users')
 * class UserController extends Base {}
 *
 * getMetadataKeys(UserController);    // ['feature', 'scope', ...]
 * getOwnMetadataKeys(UserController); // ['feature']
 * ```
 *
 * @since 1.1.0
 * @see {@link getMetadataKeys} for keys including the prototype chain
 */
export function getOwnMetadataKeys(target: object, propertyKey?: string | symbol): any[] {
  if (propertyKey !== undefined) {
    return Reflect.getOwnMetadataKeys(target, propertyKey);
  }
  return Reflect.getOwnMetadataKeys(target);
}
