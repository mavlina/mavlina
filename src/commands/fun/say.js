module.exports = {
    name: 'say',
    description: 'Makes the bot say something.',
    options: [
        {
            name: 'message',
            type: 3, // STRING
            description: 'The message for the bot to say',
            required: true,
        },
    ],
    execute(interactionOrMessage) {
        const message = interactionOrMessage.options.getString('message');
        interactionOrMessage.channel.send(message);
        interactionOrMessage.reply({ content: 'Message sent!', ephemeral: true });
    },
};
