const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'avatar',
    description: 'Displays a user\'s avatar.',
    options: [
        {
            name: 'user',
            type: 6, // USER
            description: 'The user to get the avatar of',
            required: false,
        },
    ],
    execute(interactionOrMessage) {
        const user = interactionOrMessage.options.getUser('user') || interactionOrMessage.user;
        const embed = new EmbedBuilder()
            .setTitle(`${user.username}\'s Avatar`)
            .setImage(user.displayAvatarURL({ dynamic: true, size: 256 }));
        interactionOrMessage.reply({ embeds: [embed] });
    },
};
