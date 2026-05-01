import 'reflect-metadata';

/**
 * Merges metadata for a given key across the prototype chain of a class.
 *
 * Walks from the root ancestor down to the target class, collecting
 * metadata values at each level. The merge strategy depends on the
 * `strategy` parameter:
 *
 * - `'replace'` (default) — child values override parent values entirely.
 * - `'concat'` — values are concatenated into an array (parent first, child last).
 * - `'deep'` — plain objects are deep-merged (child keys override parent keys).
 *
 * This is the pattern used by ORMs (TypeORM, Eloquent) for inheriting
 * decorator metadata like `@Column`, `@Relation`, `@Hook`, etc.
 *
 * @template T - The expected type of the merged metadata value.
 * @param metadataKey - The metadata key to merge.
 * @param target - The class constructor to start from.
 * @param strategy - The merge strategy to use.
 * @returns The merged metadata value, or `undefined` if no metadata exists.
 *
 * @example
 * ```typescript
 * // Replace strategy (default) — child overrides parent
 * @defineMetadata('collection', 'base_entities')
 * class BaseEntity {}
 *
 * @defineMetadata('collection', 'users')
 * class User extends BaseEntity {}
 *
 * mergeMetadata<string>('collection', User);
 * // 'users' (child overrides parent)
 * ```
 *
 * @example
 * ```typescript
 * // Concat strategy — accumulate values from the chain
 * @defineMetadata('hooks', ['validateBase'])
 * class BaseModel {}
 *
 * @defineMetadata('hooks', ['validateUser'])
 * class User extends BaseModel {}
 *
 * mergeMetadata<string[]>('hooks', User, 'concat');
 * // ['validateBase', 'validateUser']
 * ```
 *
 * @example
 * ```typescript
 * // Deep strategy — merge objects
 * @defineMetadata('options', { timestamps: true, softDeletes: false })
 * class BaseModel {}
 *
 * @defineMetadata('options', { softDeletes: true })
 * class User extends BaseModel {}
 *
 * mergeMetadata<object>('options', User, 'deep');
 * // { timestamps: true, softDeletes: true }
 * ```
 *
 * @since 1.1.0
 * @see {@link getMetadata} for single-level retrieval
 * @see {@link getOwnMetadata} for own-only retrieval
 */
export function mergeMetadata<T = any>(
  metadataKey: unknown,
  target: Function,
  strategy: 'replace' | 'concat' | 'deep' = 'replace'
): T | undefined {
  // Walk the prototype chain from root ancestor → target
  const chain = getPrototypeChain(target);

  if (chain.length === 0) return undefined;

  let result: any = undefined;

  for (const ctor of chain) {
    const value = Reflect.getOwnMetadata(metadataKey, ctor);

    if (value === undefined) continue;

    if (result === undefined) {
      // First value found — use it as the base
      result =
        strategy === 'concat' && !Array.isArray(value)
          ? [value]
          : strategy === 'concat' && Array.isArray(value)
            ? [...value]
            : strategy === 'deep' && isPlainObject(value)
              ? { ...value }
              : value;
      continue;
    }

    // Merge based on strategy
    switch (strategy) {
      case 'replace':
        result = value;
        break;

      case 'concat':
        if (Array.isArray(value)) {
          result = [...result, ...value];
        } else {
          result = [...result, value];
        }
        break;

      case 'deep':
        if (isPlainObject(result) && isPlainObject(value)) {
          result = { ...result, ...value };
        } else {
          // Can't deep merge non-objects — fall back to replace
          result = value;
        }
        break;
    }
  }

  return result as T | undefined;
}

/**
 * Walk the prototype chain of a class constructor and return an array
 * of constructors from the root ancestor down to the target (inclusive).
 *
 * Stops before `Object`, `Function.prototype`, or `null`.
 *
 * @param target - The class constructor to start from.
 * @returns An array of constructors ordered root → target.
 *
 * @internal
 */
function getPrototypeChain(target: Function): Function[] {
  const chain: Function[] = [];
  let current: Function | null = target;

  while (current && current !== Object && current !== Function.prototype) {
    chain.unshift(current);
    current = Object.getPrototypeOf(current.prototype)?.constructor ?? null;
  }

  return chain;
}

/**
 * Check if a value is a plain object (not an array, Date, RegExp, etc.).
 *
 * @param value - The value to check.
 * @returns `true` if the value is a plain object.
 *
 * @internal
 */
function isPlainObject(value: unknown): value is Record<string, any> {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    Object.getPrototypeOf(value) === Object.prototype
  );
}
