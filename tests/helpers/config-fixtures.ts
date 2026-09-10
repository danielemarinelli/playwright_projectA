import { test as base } from "@playwright/test";

// stores environment specific configuration keys

export type EnvConfig = {
    envName: string;
    appURL: string;
    dbConfig: {};
    nopCommerceWeb: string;
    apiURL: string;
};

export const test = base.extend<EnvConfig>({
    // Define an option and provide a default value.
    // We can later override it in the config.
    envName: ["test", { option: true }],
    appURL: ["<provideURL>", { option: true }],
    dbConfig: [{}, { option: true }],
    nopCommerceWeb: ["provideURL", { option: true }],
    apiURL: ["<provideURL>", { option: true }],
});