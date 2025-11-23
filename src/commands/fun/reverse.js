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
    execute(interactionOrMessage, args) {
        const text = interactionOrMessage.options ? interactionOrMessage.options.getString('text') : args.join(' ');
        const reversedText = text.split('').reverse().join('');
        interactionOrMessage.reply(reversedText);
    },
};
