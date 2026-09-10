import { defineConfig, devices } from "@playwright/test";
import { baseConfig } from "../playwright.config.ts";
import { EnvConfig } from "../tests/helpers/config-fixtures.ts";
import path from "path";

// stores environment specific configuration values for the tests

console.log(`---LOADING TEST ENV SETTINGS---`);

export default defineConfig<EnvConfig>({
  ...baseConfig, // Loads all existing config values...
  testDir: path.resolve(process.cwd(), "./tests"),
  use: {
    ...baseConfig.use, // Loading the existing use object of playwright.config.ts and the below
    envName: "test",
    appURL: "https://katalon-demo-cura.herokuapp.com/",  // now no hardcoded values in the tests, we can use this env variable instead
    nopCommerceWeb: "https://admin-demo.nopcommerce.com",
    apiURL: "https://reqres.in/api",
    dbConfig: {
      server: "",
      dbname: "",
      connnectionStr: "",
    },
  },
});