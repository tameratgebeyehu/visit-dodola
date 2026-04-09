const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// 🏔️ WINDOWS + NODE 24 STABILITY PATCH
// Node v24 (and v21+) introduces internal modules that include colons (:) in their names.
// Windows filesystems cannot handle colons, causing the Expo CLI to crash with ENOENT
// when it tries to create "shims" or "externals" for these modules.

// 1. Disable unstable package exports which triggers the scanning of node: prefixed shims.
config.resolver.unstable_enablePackageExports = false;

// 2. Disable unstable symlinks if enabled, as it can also trigger the scanning.
// config.resolver.unstable_enableSymlinks = false;

// 3. Ensure we don't resolve node-specific shims for standard core modules in the web build
// which is where the sea-shim is often triggered.
if (config.resolver.extraNodeModules) {
  config.resolver.extraNodeModules = {
    ...config.resolver.extraNodeModules,
    'node:sea': false,
    'node:test': false,
  };
}

module.exports = config;
