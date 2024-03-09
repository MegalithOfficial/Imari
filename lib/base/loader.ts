import * as glob from 'glob';
import { resolve } from 'node:path';

import { Client } from "./client";
import EventEmitter from "node:events";
import { commands as commandsCollection, events as eventCollection } from '../utils/Utils';

export class Loader extends EventEmitter {
    client: Client;
    commandPath: string;
    eventPath: string;
    commands: any[];
    events: any[];

    constructor(client: Client) {
        super();
        this.client = client;

        this.eventPath = resolve(__dirname, '../bot/events');
        this.commandPath = resolve(__dirname, '../bot/commands');

        this.commands = [];
        this.events = [];
    };

    async loadCommands(): Promise<void> {
        Client.logger.log("Loading Commands...", "loader");

        try {
            const files = glob.sync(`${this.commandPath}/**/*.{ts,js}`, {
                absolute: true,
                ignore: '**/*.d.ts'
            });

            for (const file of files) {
                const constructor = await import(file);
                const command = new constructor.default(this.client);

                if (command?.name) {
                    if (command.enabled) {
                        commandsCollection.set(command.name, command);
                        this.commands.push(command.data);
                        this.emit("commandLoaded", command);
                    };
                };
            };

        } catch (error) {
            return Client.logger.error(new Error("An Error occurred while loading Commands: " + error))
        }
        Client.logger.log("Commands Loaded sucessfully.", "loader");
        return void 0;
    };

    async loadEvents(): Promise<void> {
        Client.logger.log("Loading Events...", "loader");

        try {
            const files = glob.sync(`${this.eventPath}/**/*.{ts,js}`, {
                absolute: true,
                ignore: '**/*.d.ts',
            });

            for (const file of files) {
                const constructor = await import(file);
                const event = new constructor.default(this.client);

                if (event?.name) {
                    if (event.enabled) {
                        eventCollection.set(event.name, event);
                        this.events.push(event.data);

                        let Once = (event.once === true ? true : false);

                        this.client[Once ? 'once' : 'on'](event.name, (...args) => event.execute(...args));
                        this.emit("eventLoaded", event);
                    };
                };
            };

        } catch (error) {
            return Client.logger.error(new Error("An Error occurred while loading Events: " + error))
        }
        Client.logger.log("Events Loaded sucessfully.", "loader");
        return void 0;
    }

    async All(): Promise<void> {
        await this.loadCommands();
        await this.loadEvents();

        this.emit("ready", true);

        return void 0;
    };

}