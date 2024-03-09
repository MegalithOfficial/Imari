import { ContextMenuCommandBuilder, RESTPostAPIApplicationCommandsJSONBody, RESTPostAPIContextMenuApplicationCommandsJSONBody, SlashCommandBuilder, Client, ChatInputCommandInteraction, Guild, GuildMember, SlashCommandSubcommandsOnlyBuilder } from "discord.js";
import { Client as C } from "../base/client"
import { s } from "@sapphire/shapeshift";
import { Core } from "./Core"
import { InvalidBuilder } from "./Errors";

export class Command extends Core {
    name: string;
    description: string;
    enabled: boolean;
    global: boolean;
    data: RESTPostAPIApplicationCommandsJSONBody | RESTPostAPIContextMenuApplicationCommandsJSONBody
    [key: string]: any;

    constructor(client: Client, commandOptions: CommandOptions) {
        super(client);
        let { name, description, enabled, global } = commandOptions;

        enabled ??= false;
        global ??= true;

        s.string.parse(name);
        s.string.parse(description);
        s.boolean.parse(enabled);
        s.boolean.parse(global);

        this.name = name.trim().replaceAll(" ", "_");
        this.description = description.trim();
        this.enabled = enabled;
        this.global = global;

        this.data = {} as RESTPostAPIApplicationCommandsJSONBody | RESTPostAPIContextMenuApplicationCommandsJSONBody;
    };

    set(data: CommandData) {
        if (this.name) data.setName(this.name);
        if (this.description && data instanceof SlashCommandBuilder) data.setDescription(this.description);

        const command = data.toJSON();

        if (!this.name) this.name = command.name;
        if (!this.description && 'description' in command) this.description = command.description;

        this.data = command;

        return command;
    };

    setOptions(options: CommandOptions) {
        const names = Object.keys(options);

        for (let index = 0; index < names.length; index++) {
            const name = names[index];
            const value = options[name];

            if (this[name] === undefined) break;

            this[name] = value;
        };

        return void 0;
    };

};

interface CommandOptions {
    name: string;
    description: string;
    enabled?: boolean;
    global?: boolean;
    [key: string]: any;
};

export interface DefaultOptionParams {
    interaction: ChatInputCommandInteraction;
    guild: Guild;
    member: GuildMember;
    client: Client;
};

type CommandData = Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup"> | SlashCommandSubcommandsOnlyBuilder;