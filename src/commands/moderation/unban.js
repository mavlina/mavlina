const { PermissionsBitField } = require('discord.js');
const { log } = require('../../utils/modlog');

module.exports = {
    name: 'unban',
    description: 'Unbans a user from the server.',
    options: [
        {
            name: 'userid',
            type: 3, // STRING
            description: 'The ID of the user to unban',
            required: true,
        },
    ],
    async execute(interactionOrMessage) {
        const member = interactionOrMessage.member;
        if (!member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
            return interactionOrMessage.reply({ content: 'You do not have permission to unban members.', ephemeral: true });
        }

        const userId = interactionOrMessage.options.getString('userid');

        try {
            await interactionOrMessage.guild.bans.remove(userId);
            interactionOrMessage.reply({ content: `Successfully unbanned user with ID ${userId}.` });
            await log(interactionOrMessage.client, interactionOrMessage.guild, 'User Unbanned', [
                { name: 'User ID', value: userId },
                { name: 'Moderator', value: interactionOrMessage.user.tag },
            ]);
        } catch (error) {
            console.error(error);
            interactionOrMessage.reply({ content: 'Could not unban the user. Make sure the user ID is correct and the user is banned.', ephemeral: true });
        }
    },
};
