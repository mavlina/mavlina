const fs = require('fs');
const path = require('path');

class CommandHandler {
    constructor() {
        this.commands = new Map();
        this.prefix = '!';
        this.loadCommands();
    }

    loadCommands() {
        const commandPath = path.join(__dirname, '../commands');
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
                    console.log(`Loaded command: ${command.name} (category: ${category})`);
                }
            }
        };
        load(commandPath);
    }

    async registerSlashCommands(client) {
        const commands = Array.from(this.commands.values()).map(cmd => ({
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

    handleInteraction(interaction) {
        if (!interaction.isCommand()) return;

        const command = this.commands.get(interaction.commandName);

        if (!command) return;

        try {
            command.execute(interaction);
        } catch (error) {
            console.error(error);
            interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }

    handleMessage(message) {
        if (!message.content.startsWith(this.prefix) || message.author.bot) return;

        const args = message.content.slice(this.prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = this.commands.get(commandName);

        if (!command) return;

        try {
            command.execute(message);
        } catch (error) {
            console.error(error);
            message.reply('There was an error while executing this command!');
        }
    }
}

module.exports = CommandHandler;
