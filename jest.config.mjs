/** @type {import('jest').Config} */
const config = {
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    watchPathIgnorePatterns: ['postgres-data', 'postgres'],
}

export default config
