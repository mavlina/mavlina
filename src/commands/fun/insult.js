const insults = [
    'You\'re the reason the gene pool needs a lifeguard.',
    'If I had a face like yours, I\'d sue my parents.',
    'I\'ve seen people like you before, but I had to pay an admission fee.',
    'You\'re so dense, light bends around you.',
    'You\'re not pretty enough to be that dumb.',
];

module.exports = {
    name: 'insult',
    description: 'Insult another user.',
    options: [
        {
            name: 'user',
            type: 6, // USER
            description: 'The user to insult',
            required: true,
        },
    ],
    execute(interactionOrMessage) {
        const user = interactionOrMessage.options.getUser('user');
        const insult = insults[Math.floor(Math.random() * insults.length)];
        interactionOrMessage.reply(`${user}, ${insult}`);
    },
};
