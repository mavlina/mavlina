module.exports = {
    name: 'ship',
    description: 'Ships two users together.',
    options: [
        {
            name: 'user1',
            type: 6, // USER
            description: 'The first user',
            required: true,
        },
        {
            name: 'user2',
            type: 6, // USER
            description: 'The second user',
            required: true,
        },
    ],
    execute(interactionOrMessage) {
        const user1 = interactionOrMessage.options.getUser('user1');
        const user2 = interactionOrMessage.options.getUser('user2');
        const percentage = Math.floor(Math.random() * 101);
        interactionOrMessage.reply(`**${user1.username}** and **${user2.username}** are **${percentage}%** compatible!`);
    },
};
