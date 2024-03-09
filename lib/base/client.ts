import { Client as BaseClient, IntentsBitField as Intents, Partials, ClientOptions, BitField } from "discord.js";
import { enumToObject } from "@sapphire/bitfield";
import { s } from "@sapphire/shapeshift";
import { clogUtils } from "clog-utils";
import { Loader } from "./loader";
import { checkVersion } from "../utils/Utils";

export class Client extends BaseClient {
    static logger: clogUtils;
    loader: Loader;

    constructor(token = process.env["TOKEN"], options?: ClientOptions) {
        s.string.parse(token);

        const { intents, ...restOptions } = options || {};

        const intentsArray = intents ? Object.values(intents).filter(Number.isInteger) : [];
        const intentsBitField = new BitField(intentsArray.length > 0 ? intentsArray : Object.values(enumToObject(Intents.Flags)).filter(Number.isInteger));

        super({
            intents: intentsBitField.bitfield,
            partials: Object.values(Partials).filter((partial) => typeof partial === "number") as Partials[],
            ...restOptions
        });

        this.token = token!;
        this.loader = new Loader(this!);

        Client.logger = new clogUtils({
            disableModification: true,
            presets: {
                gateway: { prefix: "[GATEWAY]", prefixcolor: "#036bfc", disableAntiSpam: true },
                loader: { prefix: "[LOADER]", prefixcolor: "#ff5e00", disableAntiSpam: true },
                versionCheck: { prefix: "[VERSION-CHECK]", prefixcolor: "#22ff00", disableAntiSpam: true }
            }
        });
    };

    numberToIntents(intentsNumber: number): string[] {
        const intentsList: string[] = [];

        for (const [intentName, intentValue] of Object.entries(Intents.Flags)) {
            if ((intentsNumber & Number(intentValue)) !== 0) {
                intentsList.push(intentName);
            };
        };

        return intentsList;
    };

    static isBuild(): boolean {
        const args = process.argv.slice(2);
        return args.includes("--build") ? true : false;
    };

    async start(): Promise<void> {
        this.loader.once("ready", async () => {
            Client.logger.log("Connecting to Gateway", "gateway");

            super.login(this.token!).then(async () => {
                Client.logger.log("Successfully connected to Gateway", "gateway");

                await this.application!.commands.set([]);
                await this.application!.commands.set(this.loader.commands);
            });
            return void 0;
        });
        
        await checkVersion();
        await this.loader.All();

        return void 0;

    };
};