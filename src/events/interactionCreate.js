module.exports = {
    name: 'interactionCreate',
    execute(interaction, client) {
        client.commandHandler.handleInteraction(interaction);
    },
};
