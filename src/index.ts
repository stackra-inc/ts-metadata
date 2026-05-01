import { getMetadata } from '@/get-metadata';
import { getOwnMetadata } from '@/get-own-metadata';
import { hasMetadata } from '@/has-metadata';
import { hasOwnMetadata } from '@/has-own-metadata';
import { clearMetadata } from '@/clear-metadata';
import { updateMetadata } from '@/update-metadata';
import { defineMetadata } from '@/define-metadata';
import { getAllMetadata } from '@/get-all-metadata';
import { getMetadataKeys } from '@/get-metadata-keys';
import { getOwnMetadataKeys } from '@/get-own-metadata-keys';
import { extendArrayMetadata } from '@/extend-array-metadata';
import { setMetadata } from '@/set-metadata';
import { mergeMetadata } from '@/merge-metadata';

/**
 * @stackra/ts-metadata — Typed metadata utilities for TypeScript decorators.
 *
 * A comprehensive toolkit for metadata-driven patterns built on top of
 * `reflect-metadata`. Provides type-safe wrappers for all common metadata
 * operations plus higher-level utilities inspired by NestJS.
 *
 * ## Categories
 *
 * **Retrieval:**
 * - `getMetadata`        — get metadata value (includes prototype chain)
 * - `getOwnMetadata`     — get metadata value (own only, no inheritance)
 * - `getAllMetadata`      — batch-retrieve multiple metadata values
 * - `mergeMetadata`       — merge metadata across the prototype chain
 *
 * **Definition:**
 * - `defineMetadata`      — define a metadata key-value pair
 * - `updateMetadata`      — update metadata using a callback transformation
 * - `extendArrayMetadata` — append items to an array metadata value
 * - `setMetadata`         — decorator factory (class & method decorator)
 *
 * **Introspection:**
 * - `getMetadataKeys`     — list all metadata keys (includes prototype chain)
 * - `getOwnMetadataKeys`  — list own metadata keys (no inheritance)
 *
 * **Validation:**
 * - `hasMetadata`         — check existence (includes prototype chain)
 * - `hasOwnMetadata`      — check existence (own only, no inheritance)
 *
 * **Cleanup:**
 * - `clearMetadata`       — remove metadata selectively or completely
 *
 * @example
 * ```typescript
 * import {
 *   defineMetadata,
 *   getMetadata,
 *   extendArrayMetadata,
 *   setMetadata,
 *   mergeMetadata,
 * } from '@stackra/ts-metadata';
 * ```
 *
 * @module @stackra/ts-metadata
 */
export {
  // ── Retrieval ─────────────────────────────────────────────────────────
  getMetadata,
  getOwnMetadata,
  getAllMetadata,
  mergeMetadata,

  // ── Definition ────────────────────────────────────────────────────────
  defineMetadata,
  updateMetadata,
  extendArrayMetadata,
  setMetadata,

  // ── Introspection ─────────────────────────────────────────────────────
  getMetadataKeys,
  getOwnMetadataKeys,

  // ── Validation ────────────────────────────────────────────────────────
  hasMetadata,
  hasOwnMetadata,

  // ── Cleanup ───────────────────────────────────────────────────────────
  clearMetadata,
};

// ── Type re-exports ───────────────────────────────────────────────────────
export type { CustomDecorator } from '@/set-metadata';
