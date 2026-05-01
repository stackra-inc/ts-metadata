import 'reflect-metadata';

/**
 * Retrieves metadata defined directly on the target, excluding the prototype chain.
 *
 * Unlike {@link getMetadata} which walks the prototype chain, this function
 * only returns metadata that was defined directly on the target object.
 * This is useful when you need to distinguish between own and inherited
 * metadata — for example, checking if a child class overrides a parent's
 * decorator.
 *
 * @template T - The expected type of the metadata value.
 * @param metadataKey - The metadata key to look up.
 * @param target - The target object to check.
 * @param propertyKey - Optional property key for property-level metadata.
 * @returns The metadata value if found directly on the target, otherwise `undefined`.
 *
 * @example
 * ```typescript
 * @defineMetadata('scope', 'global')
 * class BaseController {}
 *
 * class UserController extends BaseController {}
 *
 * getMetadata('scope', UserController);    // 'global' (inherited)
 * getOwnMetadata('scope', UserController); // undefined (not defined directly)
 * ```
 *
 * @since 1.1.0
 * @see {@link getMetadata} for retrieval including the prototype chain
 * @see {@link hasOwnMetadata} for checking own metadata existence
 */
export function getOwnMetadata<T = any>(
  metadataKey: unknown,
  target: object,
  propertyKey?: string | symbol
): T | undefined {
  if (propertyKey !== undefined) {
    return Reflect.getOwnMetadata(metadataKey, target, propertyKey);
  }
  return Reflect.getOwnMetadata(metadataKey, target);
}
