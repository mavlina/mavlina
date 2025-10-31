const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'serverinfo',
    description: 'Displays information about the server.',
    execute(interactionOrMessage) {
        const guild = interactionOrMessage.guild;

        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(`${guild.name}'s Information`)
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .addFields(
                { name: 'Server Name', value: guild.name, inline: true },
                { name: 'Server ID', value: guild.id, inline: true },
                { name: 'Owner', value: `<@${guild.ownerId}>`, inline: true },
                { name: 'Total Members', value: guild.memberCount.toString(), inline: true },
                { name: 'Total Channels', value: guild.channels.cache.size.toString(), inline: true },
                { name: 'Total Roles', value: guild.roles.cache.size.toString(), inline: true },
                { name: 'Created At', value: guild.createdAt.toLocaleDateString(), inline: true },
            )
            .setTimestamp();

        interactionOrMessage.reply({ embeds: [embed] });
    },
};
