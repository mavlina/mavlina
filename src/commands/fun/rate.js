module.exports = {
    name: 'rate',
    description: 'Rates something on a scale of 1-10.',
    options: [
        {
            name: 'thing',
            type: 3, // STRING
            description: 'The thing to rate',
            required: true,
        },
    ],
    execute(interactionOrMessage) {
        const thing = interactionOrMessage.options.getString('thing');
        const rating = Math.floor(Math.random() * 11);
        interactionOrMessage.reply(`I rate **${thing}** a **${rating}/10**.`);
    },
};
