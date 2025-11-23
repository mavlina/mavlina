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
    execute(interactionOrMessage, args) {
        const message = interactionOrMessage.options ? interactionOrMessage.options.getString('message') : args.join(' ');
        interactionOrMessage.channel.send(message);
        if (interactionOrMessage.options) {
            interactionOrMessage.reply({ content: 'Message sent!', ephemeral: true });
        }
    },
};
