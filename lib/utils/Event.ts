import { ClientEvents, Events, Client } from "discord.js";
import { s } from "@sapphire/shapeshift";
import { Core } from "./Core";

export class Event extends Core {
    name: string;
    type: string;
    enabled: boolean;
    once: boolean;
    [key: string]: any;

    static Events = Events;

    constructor(client: Client, eventOptions: EventOptions) {
        super(client);
        let { name, enabled, type, once } = eventOptions;

        once ??= false;
        enabled ??= true;
        type ??= "ChatCommand";

        s.string.parse(name);
        s.string.parse(type);
        s.boolean.parse(once);
        s.boolean.parse(enabled);

        this.name = name.trim();
        this.type = type;
        this.enabled = enabled;
        this.once = once;
    };

    setOptions(options: EventOptions) {
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

interface EventOptions {
    name: keyof ClientEvents;
    type?: EventTypes;
    enabled?: boolean;
    once?: boolean;
    [key: string]: any;
};

type EventTypes = "ChatCommand" | "ContextCommand" | "Button" | "Menu" | "Modal";