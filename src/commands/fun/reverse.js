module.exports = {
    name: 'reverse',
    description: 'Reverses a string.',
    options: [
        {
            name: 'text',
            type: 3, // STRING
            description: 'The text to reverse',
            required: true,
        },
    ],
    execute(interactionOrMessage) {
        const text = interactionOrMessage.options.getString('text');
        const reversedText = text.split('').reverse().join('');
        interactionOrMessage.reply(reversedText);
    },
};
