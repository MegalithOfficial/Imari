import { ChatInputCommandInteraction, Client } from "discord.js";
import { Event } from "../../../utils/Event";

export default class extends Event {
  constructor(client: Client) {
    super(client, {
      name: "interactionCreate",
      enabled: true,
      once: false,
    });
  };

 async execute(interaction: ChatInputCommandInteraction) {
    if(!interaction.isChatInputCommand()) return;

    const command = this.commands.get(interaction.commandName);
    if (!this.commands.has(command.name)) return;
    
    const member = interaction.member;
    const user = interaction.user;
    const channel = interaction.channel;
    const guild = interaction.guild;

    await command.execute({ member, user, channel, interaction, guild, client: this.client as Client })
    
  };
};