import type { Config } from "jest";

const config: Config = {
    transform: {
        "^.+\\.(ts|tsx|js|jsx)$": "babel-jest",
    },
    moduleNameMapper: {
        "\\.svg$": "<rootDir>/__mocks__/svgMock.js"
    },
    setupFiles: ["<rootDir>/jest.setup.ts"], // Asegúrate de poner la ruta correcta
};

export default config;