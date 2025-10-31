module.exports = {
    name: 'messageCreate',
    execute(message, client) {
        client.commandHandler.handleMessage(message);
    },
};
