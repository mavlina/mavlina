const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'avatar',
    description: "Displays a user's avatar.",
    options: [
        {
            name: 'user',
            type: 6, // USER
            description: 'The user to get the avatar of',
            required: false,
        },
    ],
    execute(interactionOrMessage, args) {
        const user = interactionOrMessage.options ? interactionOrMessage.options.getUser('user') || interactionOrMessage.user : interactionOrMessage.mentions.users.first() || interactionOrMessage.author;
        const embed = new EmbedBuilder()
            .setTitle(`${user.username}\'s Avatar`)
            .setImage(user.displayAvatarURL({ dynamic: true, size: 256 }));
        interactionOrMessage.reply({ embeds: [embed] });
    },
};
