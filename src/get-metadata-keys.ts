import 'reflect-metadata';

/**
 * Returns all metadata keys defined on the target, including inherited keys
 * from the prototype chain.
 *
 * Useful for introspection — discovering what metadata has been attached
 * to a class or method without knowing the keys in advance.
 *
 * @param target - The target object to inspect.
 * @param propertyKey - Optional property key for property-level metadata.
 * @returns An array of all metadata keys.
 *
 * @example
 * ```typescript
 * @defineMetadata('version', '1.0')
 * @defineMetadata('author', 'Stackra')
 * class MyService {}
 *
 * getMetadataKeys(MyService);
 * // ['version', 'author', 'design:paramtypes', ...]
 * ```
 *
 * @since 1.1.0
 * @see {@link getOwnMetadataKeys} for keys excluding the prototype chain
 */
export function getMetadataKeys(target: object, propertyKey?: string | symbol): any[] {
  if (propertyKey !== undefined) {
    return Reflect.getMetadataKeys(target, propertyKey);
  }
  return Reflect.getMetadataKeys(target);
}
