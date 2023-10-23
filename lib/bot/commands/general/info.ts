import { Client } from "discord.js";
import { Client as Base } from "../../../base/client";
import { Command, DefaultOptionParams } from "../../../utils/Command";

export default class extends Command {
    constructor(client: Client) {
        super(client, {
            name: "info",
            description: "Gives information about the bot.",
            enabled: true
        });

        this.set(new this.SlashCommand());
    };

    async execute({ interaction, guild, member, client }: DefaultOptionParams) {

        const isBuilt = Base.isBuild() ? "Compiled (Built)" : "Development";

        const embed = new this.Embed()
            .setTitle(`Hello ${interaction.user.displayName}! 👋`)
            .setDescription(`
              I'm running on [MegalithOfficial/Typescript-discord-bot-Template](https://github.com/MegalithOfficial/Typescript-discord-bot-Template) 🤖
              I'm currently on \`${isBuilt}\` Mode. 🚀
            `)
            .setColor("Green")
            .setTimestamp()
            .setThumbnail(interaction.user.avatarURL());

        return interaction.reply({ embeds: [embed] });
    };
};