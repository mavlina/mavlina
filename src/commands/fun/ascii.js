const { generate } = require('../../../lib/ascii');

module.exports = {
    name: 'ascii',
    description: 'Converts text to ASCII art.',
    options: [
        {
            name: 'text',
            type: 3, // STRING
            description: 'The text to convert',
            required: true,
        },
    ],
    execute(interactionOrMessage) {
        const text = interactionOrMessage.options.getString('text');
        if (text.length > 10) {
            return interactionOrMessage.reply({ content: 'The text can be at most 10 characters long.', ephemeral: true });
        }
        const asciiArt = generate(text);
        interactionOrMessage.reply(asciiArt);
    },
};
