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
    execute(interactionOrMessage, args) {
        const user1 = interactionOrMessage.options ? interactionOrMessage.options.getUser('user1') : interactionOrMessage.mentions.users.first();
        const user2 = interactionOrMessage.options ? interactionOrMessage.options.getUser('user2') : interactionOrMessage.mentions.users.last();

        if (!user1 || !user2) {
            return interactionOrMessage.reply({ content: 'Please mention two users to ship.', ephemeral: true });
        }

        const percentage = Math.floor(Math.random() * 101);
        interactionOrMessage.reply(`**${user1.username}** and **${user2.username}** are **${percentage}%** compatible!`);
    }
};
