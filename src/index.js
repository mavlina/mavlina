require('dotenv').config();
const BotClient = require('./core/Client');

const client = new BotClient();
client.start();
