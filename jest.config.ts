import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  verbose: true,
};
export default config;

const {defaults} = require('jest-config');
module.exports = {
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  collectCoverageFrom: ["**/*.{js,jsx,ts,tsx}",
    "!**/node_modules/**",
    "!**/utils/**"],
}