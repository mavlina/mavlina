const compliments = [
    "You're an awesome friend.",
    "You're a gift to those around you.",
    "You're a smart cookie.",
    'You have a great sense of humor.',
    "You're more helpful than you realize.",
];

module.exports = {
    name: 'compliment',
    description: 'Compliment another user.',
    options: [
        {
            name: 'user',
            type: 6, // USER
            description: 'The user to compliment',
            required: true,
        },
    ],
    execute(interactionOrMessage) {
        const user = interactionOrMessage.options.getUser('user');
        const compliment = compliments[Math.floor(Math.random() * compliments.length)];
        interactionOrMessage.reply(`${user}, ${compliment}`);
    },
};
