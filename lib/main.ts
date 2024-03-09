import { ShardingManager } from "discord.js";
import { Client } from "./base/client";
import { config } from "dotenv";
import { LogPreset, clogUtils } from "clog-utils";

config({ override: true, encoding: "utf8" });

function isBuild(): boolean {
   const args = process.argv.slice(2);
   return args.includes("--build") ? true : false;
};

const isShardingEnabled = process.env["SHARDING"].toLowerCase() === "true";

if (!isShardingEnabled) {
   new Client().start();
} else {
   if (!isBuild()) throw new Error("You cannot run Sharding in Development mode.");

   const amountofshards = process.env["TOTALSHARDS"].includes("AUTO") ? "auto" : Number(process.env["TOTALSHARDS"]);

   if (typeof amountofshards === "number" && isNaN(amountofshards)) {
      throw new Error("TOTALSHARDS must be a number or set as 'auto'.");
   };

   const manager = new ShardingManager("./src/start.js", {
      token: process.env["TOKEN"],
      totalShards: amountofshards
   });

   manager.on("shardCreate", (shard) => {

      const logger = new clogUtils({
         disableModification: true,
         presets: {
            "SHARD": {
               prefix: `[Shard #${shard.id}]`,
               prefixcolor: "#03ecfc",
               disableAntiSpam: true
            }
         }
      });

      shard.on("death", () => {
         logger.log(`Shard died.`, "SHARD");
      });

      shard.on("disconnect", () => {
         logger.log(`Shard disconnected from Discord Gateway.`, "SHARD");
      });

      shard.on("error", () => {
         logger.log(`Shard Occured a Error.`, "SHARD");
      });

      shard.on("message", (message: any) => {
         logger.log(`Shard got a message: ${message}`, "SHARD");
      });

      shard.on("ready", () => {
         logger.log(`Shard is ready to operate.`, "SHARD");
      });

      shard.on("reconnecting", () => {
         logger.log(`Shard is reconnecting to Discord Gateway.`, "SHARD");
      });

      shard.on("resume", () => {
         logger.log(`Shard is resuming.`, "SHARD");
      });

      shard.on("spawn", () => {
         logger.log(`Shard successfully Spawned.`, "SHARD");
      });
   });

   manager.spawn();
}