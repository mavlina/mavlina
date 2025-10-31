const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'userinfo',
    description: 'Displays information about a user.',
    options: [
        {
            name: 'user',
            type: 6, // USER
            description: 'The user to get information about',
            required: false,
        },
    ],
    execute(interactionOrMessage) {
        const user = interactionOrMessage.options ? interactionOrMessage.options.getUser('user') || interactionOrMessage.user : interactionOrMessage.author;
        const member = interactionOrMessage.guild.members.cache.get(user.id);

        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(`${user.username}'s Information`)
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: 'Username', value: user.username, inline: true },
                { name: 'ID', value: user.id, inline: true },
                { name: 'Joined Server', value: member.joinedAt.toLocaleDateString(), inline: true },
                { name: 'Account Created', value: user.createdAt.toLocaleDateString(), inline: true },
                { name: 'Roles', value: member.roles.cache.map(role => role.name).join(', '), inline: false },
            )
            .setTimestamp();

        interactionOrMessage.reply({ embeds: [embed] });
    },
};
