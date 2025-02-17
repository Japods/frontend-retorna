module.exports = {
    presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }], // Soporte para Node.js
        '@babel/preset-typescript', // Soporte para TypeScript
    ],
};