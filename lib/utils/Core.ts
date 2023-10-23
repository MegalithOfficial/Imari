import { commands, events } from "./Utils";

import {
    EmbedBuilder, ActionRowBuilder, ButtonBuilder,
    RoleSelectMenuBuilder, ChannelSelectMenuBuilder, MentionableSelectMenuBuilder,
    UserSelectMenuBuilder, ModalBuilder, TextInputBuilder,
    AttachmentBuilder, SlashCommandBuilder, ContextMenuCommandBuilder,
    StringSelectMenuBuilder, ButtonStyle, Collection, Client
} from "discord.js";

export class Core {
    commands: Collection<any, any>
    events: Collection<any, any>;
    _client: Client;
    SlashCommand: typeof SlashCommandBuilder;
    Embed: typeof EmbedBuilder;
    Row: typeof ActionRowBuilder;
    Button: typeof ButtonBuilder;
    RoleMenu: typeof RoleSelectMenuBuilder;
    ChannelMenu: typeof ChannelSelectMenuBuilder;
    MentionableMenu: typeof MentionableSelectMenuBuilder;
    UserMenu: typeof UserSelectMenuBuilder;
    Modal: typeof ModalBuilder;
    TextInput: typeof TextInputBuilder;
    Attachment: typeof AttachmentBuilder;
    ContextMenuCommandBuilder: typeof ContextMenuCommandBuilder;
    StringMenu: typeof StringSelectMenuBuilder;
    ButtonStyle: typeof ButtonStyle;

    constructor(client: Client) {
        this._client = client;
        this.commands = commands;
        this.events = events;

        this.SlashCommand = SlashCommandBuilder;
        this.Embed = EmbedBuilder;
        this.Row = ActionRowBuilder;
        this.Button = ButtonBuilder;
        this.RoleMenu = RoleSelectMenuBuilder;
        this.ChannelMenu = ChannelSelectMenuBuilder;
        this.MentionableMenu = MentionableSelectMenuBuilder;
        this.UserMenu = UserSelectMenuBuilder;
        this.Modal = ModalBuilder;
        this.TextInput = TextInputBuilder;
        this.Attachment = AttachmentBuilder;
        this.ContextMenuCommandBuilder = ContextMenuCommandBuilder;
        this.StringMenu = StringSelectMenuBuilder;
        this.ButtonStyle = ButtonStyle;
    }

    get client() {
        return this._client;
    };

}