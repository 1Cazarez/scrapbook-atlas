/**
 * jest-expo's own transformIgnorePatterns already allow pnpm's .pnpm store and
 * @expo-google-fonts, so do not override them here. React Native Testing
 * Library 14 registers its Jest matchers on first import, so no setup file is
 * needed either.
 *
 * @type {import('jest').Config}
 */
module.exports = {
  preset: 'jest-expo',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
