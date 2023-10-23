<p align="center">
  <a href="https://github.com/MegalithOfficial/Typescript-discord-bot-Template">
    <img src="https://raw.githubusercontent.com/MegalithOfficial/Typescript-discord-bot-Template/main/Images/imari.jpg" alt="Imari" style="border-radius: 50%;" width="200" height="200">
  </a>
</p>

<h1 align="center">Imari - Simple Discord Bot Template (TypeScript)</h1>

<p align="center">
  <strong>A starting point for building your own Discord bots using Discord.js and TypeScript.</strong>
</p>

<p align="center">
  <a href="https://discord.js.org/" target="_blank">Discord.js</a> | <a href="https://nodejs.org/" target="_blank">Node.js</a>
</p>

## Features

- 🚀 Ready-to-use structure for commands and events.
- 🎮 Integration with Discord.js V14 for smooth bot development.
- 🧭 Command handling and event registration.
- ⚙️ Customizable settings for your bot.
- 📖 Easy-to-follow documentation.

## Prerequisites

Before you start using this template, make sure you have the following:

- **Node.js:** You should have Node.js installed on your machine. Download it from [nodejs.org](https://nodejs.org/).
- **Knowledge:** You need to know TypeScript/JavaScript to effectively work with this template.

Certainly, you can integrate the instructions for installing TypeScript globally into the "Installation" section of your README. Here's the updated section:

## Installation

To use this template to create your own Discord bot, follow these steps:

1. Clone or download this repository to your local machine.

2. Navigate to the project directory using your terminal.

3. Run the following command to install the necessary dependencies, including TypeScript (if not already installed):

   ```bash
   npm install
   ```

   Make sure to have TypeScript installed globally to use it during development. You can install it globally using:

   ```bash
   npm install -g typescript
   ```

## Configuration

1. Duplicate the `.env.example` file in the root directory of your project and rename the duplicate to `.env`.

2. Configure your bot token and other settings in the `.env` file. Example:

   ```env
   TOKEN=your_bot_token
   ```

By following these steps, you'll have your project set up and ready to configure your Discord bot.

<details>
  <summary><strong>Testing</strong></summary>

  During development, you can test your code using TypeScript directly with the following command. Please note that you need to install `ts-node` globally only once:

  ```bash
  npm install -g ts-node # Install ts-node globally (once)
  npm run test
  ```
</details>

<details>
  <summary><strong>Building</strong></summary>

  To compile your TypeScript code into JavaScript for running your bot, execute the following command:

  ```bash
  npm run build
  ```

  Compiling the code enhances your bot application's performance by preparing it for execution.
  
</details>

<details>
  <summary><strong>Running the Bot</strong></summary>

  To run the bot using the built JavaScript code, use the following command:

  ```bash
  npm run start
  ```

</details>

## Project Structure

The project structure is carefully organized to help you manage your Discord bot's components efficiently:

- 📁 `bot/commands/...`: This directory is where you store your bot's commands. You can create subdirectories to categorize and organize them.

- 📁 `bot/events/...`: In this directory, you define custom event handlers. This is where you listen for Discord events and execute custom code.

- 📜 `base/client.ts`: The heart of your bot application, where you manage the core functionalities.

- 📁 `utils/...`: The `utils` directory houses utility modules and helper functions. It's the place for shared scripts that assist with data manipulation, external API calls, and more. You can further categorize utilities based on their specific functions.

By maintaining this organized project structure, you ensure that your bot code remains clean and manageable. The `utils` directory, in particular, offers a central location for housing utility scripts, promoting code reusability and maintainability.


## Contributing

If you'd like to contribute to this project, please create a fork, make your changes, and submit a pull request.

## License

This project is licensed under the [Apache 2.0 License](LICENSE).

## Acknowledgments

- [Discord.js](https://discord.js.org/): The library used for Discord bot development.
- Typescript and Javascript: The core programming languages that power this template.

🤖 Happy bot building!
