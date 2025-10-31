module.exports = {
    name: 'choose',
    description: 'Make the bot choose between multiple options.',
    options: [
        {
            name: 'options',
            type: 3, // STRING
            description: 'The options to choose from, separated by a comma',
            required: true,
        },
    ],
    execute(interactionOrMessage) {
        const options = interactionOrMessage.options.getString('options').split(',');
        const choice = options[Math.floor(Math.random() * options.length)].trim();
        interactionOrMessage.reply(`I choose **${choice}**.`);
    },
};
