const { EmbedBuilder } = require('discord.js');
const prisma = require('../../utils/db');

module.exports = {
    name: 'warnings',
    description: 'Displays the warnings for a user.',
    options: [
        {
            name: 'user',
            type: 6, // USER
            description: 'The user to get warnings for',
            required: true,
        },
    ],
    async execute(interactionOrMessage) {
        const user = interactionOrMessage.options.getUser('user');

        const userWarnings = await prisma.warning.findMany({
            where: {
                guildId: interactionOrMessage.guild.id,
                userId: user.id,
            },
        });

        if (userWarnings.length === 0) {
            return interactionOrMessage.reply({ content: `${user.tag} has no warnings.` });
        }

        const embed = new EmbedBuilder()
            .setColor('#ffcc00')
            .setTitle(`${user.username}\'s Warnings`)
            .setDescription(`Total warnings: ${userWarnings.length}`);

        userWarnings.forEach((warning, index) => {
            embed.addFields({ name: `Warning ${index + 1}`, value: `**Reason:** ${warning.reason}\n**Moderator:** <@${warning.moderatorId}>\n**Date:** ${warning.createdAt.toLocaleDateString()}` });
        });

        interactionOrMessage.reply({ embeds: [embed] });
    },
};
