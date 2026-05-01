# Changelog

All notable changes to `@stackra/ts-metadata` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-05-01

### Changed

- Renamed package from `@stackra/ts-metadata` to `@stackra/ts-metadata`
- Standardized package structure to match monorepo conventions
- Added CI/CD workflows (ci.yml, publish.yml)
- Added Dependabot configuration
- Standardized husky hooks, commitlint, lint-staged, prettier, eslint configs

### Added

- `extendArrayMetadata` — append items to array metadata (NestJS pattern)
- `setMetadata` — decorator factory returning class & method decorator
- `getOwnMetadata` — get metadata without prototype chain
- `getMetadataKeys` / `getOwnMetadataKeys` — introspection utilities
- `mergeMetadata` — merge metadata across prototype chain with strategies

## [1.0.6] - 2026-04-30

### Added

- Initial release as `@stackra/ts-metadata`
