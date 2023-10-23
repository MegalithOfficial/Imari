import { Collection } from "discord.js";
import { Client as Base } from "../base/client";
import { FetchError } from "./Errors";

export const commands = new Collection();
export const events = new Collection();

export async function checkVersion(): Promise<void> {

    if (!Base.isBuild()) return Base.logger.log("Version checking Disabled due to Development mode.", "versionCheck");
    if (process.env["disableVersionCheck"] === "true" ? true : false) return;

    try {
        Base.logger.log("Checking Project version...", "versionCheck");

        const rawPackageJsonUrl = `https://raw.githubusercontent.com/MegalithOfficial/Typescript-discord-bot-Template/main/package.json`;
        const response = await fetch(rawPackageJsonUrl);

        if (response.status !== 200) {
            Base.logger.error(new FetchError({ message: `Github replied with error code ${response.status}.\n To disable Version Checks, Set "disableVersionCheck" to true in .env file.` }));
        } else if (response.status === 200) {

            const packageJson = await response.json();
            const repoVersion: string = packageJson.version;

            const localPackageJson: { version: string } = require('../../package.json');
            const localVersion: string = localPackageJson.version;

            if (localVersion === repoVersion) {
                Base.logger.log("Your project is up to date!", "versionCheck");
            } else {
                Base.logger.log(`Your Project is Outdated! New version ${repoVersion} released on GitHub!`, "versionCheck");
            };
        } else {
            Base.logger.error(new FetchError({ message: `Failed to fetch package.json from Github.\n To disable Version Checks, Set "disableVersionCheck" to true in .env file.` }));
        }
    } catch (err) {
        Base.logger.error(new FetchError({ message: `An error occurred: ${err.message}` }));
    }
};