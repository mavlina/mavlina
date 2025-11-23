module.exports = {
    name: 'clientReady',
    once: true,
    execute(client) {
        console.log(`clientReady! Logged in as ${client.user.tag}`);
        client.commandHandler.registerSlashCommands(client);
    },
};
