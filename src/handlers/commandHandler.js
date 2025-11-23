const fs = require('fs');
const path = require('path');
const { getGuildSettings } = require('../utils/guild');

class CommandHandler {
    constructor() {
        this.commands = new Map();
        this.loadCommands();
    }

    loadCommands() {
        const commandPath = path.join(__dirname, '../commands');
        let commandCount = 0;
        const load = (dir) => {
            const files = fs.readdirSync(dir);
            for (const file of files) {
                const fullPath = path.join(dir, file);
                const stat = fs.lstatSync(fullPath);
                if (stat.isDirectory()) {
                    load(fullPath);
                } else if (file.endsWith('.js')) {
                    const command = require(fullPath);
                    const category = path.basename(dir);
                    command.category = category;
                    this.commands.set(command.name, command);
                    commandCount++;
                }
            }
        };
        load(commandPath);
        console.log(`Loaded ${commandCount} commands.`);
    }

    async registerSlashCommands(client) {
        const commands = Array.from(this.commands.values()).map((cmd) => ({
            name: cmd.name,
            description: cmd.description,
            options: cmd.options || [],
        }));

        try {
            await client.application.commands.set(commands);
            console.log('Successfully registered application (/) commands globally.');
        } catch (error) {
            console.error(error);
        }
    }

    async handleInteraction(interaction) {
        if (!interaction.isCommand()) return;

        const command = this.commands.get(interaction.commandName);

        if (!command) return;

        const settings = await getGuildSettings(interaction.guild.id);
        if (settings.disabledModules.includes(command.category) || settings.disabledCommands.includes(command.name)) {
            return interaction.reply({ content: 'This command is disabled on this server.', ephemeral: true });
        }

        try {
            command.execute(interaction);
        } catch (error) {
            console.error(error);
            interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }

    async handleMessage(message) {
        if (message.author.bot) return;

        const settings = await getGuildSettings(message.guild.id);
        const prefix = settings.prefix;

        if (!message.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = this.commands.get(commandName);

        if (!command) return;

        if (settings.disabledModules.includes(command.category) || settings.disabledCommands.includes(command.name)) {
            return message.reply({ content: 'This command is disabled on this server.' });
        }

        try {
            command.execute(message, args);
        } catch (error) {
            console.error(error);
            message.reply('There was an error while executing this command!');
        }
    }
}

module.exports = CommandHandler;
