module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        '^.+\\.ts$': 'ts-jest', // Solo transformar TypeScript con ts-jest
    },
    transformIgnorePatterns: [
        '/node_modules/(?!bson).+\\.js$', // Ignorar todo en node_modules excepto bson
    ],
    moduleFileExtensions: ['ts', 'js', 'json'],
};