module.exports = {
    name: 'ping',
    description: 'Replies with Pong!',
    execute(interactionOrMessage) {
        const content = 'Pong!';
        if (interactionOrMessage.isCommand && interactionOrMessage.isCommand()) {
            interactionOrMessage.reply({ content, ephemeral: true });
        } else {
            interactionOrMessage.channel.send(content);
        }
    },
};
