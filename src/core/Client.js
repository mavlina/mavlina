const { Client, GatewayIntentBits } = require('discord.js');
const CommandHandler = require('../handlers/commandHandler');
const EventHandler = require('../handlers/eventHandler');

class BotClient extends Client {
    constructor() {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent,
            ],
        });

        this.commandHandler = new CommandHandler();
        this.eventHandler = new EventHandler(this);
        
    }

    start() {
        this.login(process.env.TOKEN);
    }
}

module.exports = BotClient;