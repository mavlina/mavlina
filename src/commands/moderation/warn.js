const { PermissionsBitField } = require('discord.js');
const { log } = require('../../utils/modlog');
const prisma = require('../../utils/db');

module.exports = {
    name: 'warn',
    description: 'Warns a user.',
    options: [
        {
            name: 'user',
            type: 6, // USER
            description: 'The user to warn',
            required: true,
        },
        {
            name: 'reason',
            type: 3, // STRING
            description: 'The reason for the warning',
            required: true,
        },
    ],
    async execute(interactionOrMessage) {
        const member = interactionOrMessage.member;
        if (!member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
            return interactionOrMessage.reply({
                content: 'You do not have permission to warn members.',
                ephemeral: true,
            });
        }

        const userToWarn = interactionOrMessage.options.getUser('user');
        const reason = interactionOrMessage.options.getString('reason');

        await prisma.warning.create({
            data: {
                guildId: interactionOrMessage.guild.id,
                userId: userToWarn.id,
                moderatorId: interactionOrMessage.user.id,
                reason,
            },
        });

        interactionOrMessage.reply({ content: `${userToWarn.tag} has been warned for: ${reason}` });
        await log(interactionOrMessage.client, interactionOrMessage.guild, 'User Warned', [
            { name: 'User', value: userToWarn.tag },
            { name: 'Moderator', value: interactionOrMessage.user.tag },
            { name: 'Reason', value: reason },
        ]);
    },
};
