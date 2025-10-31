const { PermissionsBitField } = require('discord.js');
const { log } = require('../../utils/modlog');

module.exports = {
    name: 'kick',
    description: 'Kicks a user from the server.',
    options: [
        {
            name: 'user',
            type: 6, // USER
            description: 'The user to kick',
            required: true,
        },
        {
            name: 'reason',
            type: 3, // STRING
            description: 'The reason for kicking the user',
            required: false,
        },
    ],
    async execute(interactionOrMessage) {
        const member = interactionOrMessage.member;
        if (!member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
            return interactionOrMessage.reply({ content: 'You do not have permission to kick members.', ephemeral: true });
        }

        const userToKick = interactionOrMessage.options.getUser('user');
        const reason = interactionOrMessage.options.getString('reason') || 'No reason provided';

        if (!userToKick) {
            return interactionOrMessage.reply({ content: 'Please specify a user to kick.', ephemeral: true });
        }

        const memberToKick = interactionOrMessage.guild.members.cache.get(userToKick.id);

        if (!memberToKick) {
            return interactionOrMessage.reply({ content: 'That user is not in this server.', ephemeral: true });
        }

        if (!memberToKick.kickable) {
            return interactionOrMessage.reply({ content: 'I cannot kick that user.', ephemeral: true });
        }

        try {
            await memberToKick.kick(reason);
            interactionOrMessage.reply({ content: `${userToKick.tag} has been kicked for: ${reason}` });
            await log(interactionOrMessage.client, interactionOrMessage.guild, 'User Kicked', [
                { name: 'User', value: userToKick.tag },
                { name: 'Moderator', value: interactionOrMessage.user.tag },
                { name: 'Reason', value: reason },
            ]);
        } catch (error) {
            console.error(error);
            interactionOrMessage.reply({ content: 'There was an error trying to kick that user.', ephemeral: true });
        }
    },
};
