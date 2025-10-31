const { PermissionsBitField } = require('discord.js');
const { log } = require('../../utils/modlog');
const { getGuildSettings } = require('../../utils/guild');

module.exports = {
    name: 'unmute',
    description: 'Unmutes a user.',
    options: [
        {
            name: 'user',
            type: 6, // USER
            description: 'The user to unmute',
            required: true,
        },
    ],
    async execute(interactionOrMessage) {
        const member = interactionOrMessage.member;
        if (!member.permissions.has(PermissionsBitField.Flags.MuteMembers)) {
            return interactionOrMessage.reply({ content: 'You do not have permission to unmute members.', ephemeral: true });
        }

        const userToUnmute = interactionOrMessage.options.getUser('user');
        const memberToUnmute = interactionOrMessage.guild.members.cache.get(userToUnmute.id);

        if (!memberToUnmute) {
            return interactionOrMessage.reply({ content: 'That user is not in this server.', ephemeral: true });
        }

        const settings = await getGuildSettings(interactionOrMessage.guild.id);
        const mutedRoleId = settings.mutedRole;
        if (!mutedRoleId) {
            return interactionOrMessage.reply({ content: 'The muted role is not configured for this server.', ephemeral: true });
        }

        const mutedRole = interactionOrMessage.guild.roles.cache.get(mutedRoleId);
        if (!mutedRole) {
            return interactionOrMessage.reply({ content: 'The configured muted role could not be found.', ephemeral: true });
        }

        try {
            await memberToUnmute.roles.remove(mutedRole);
            interactionOrMessage.reply({ content: `${userToUnmute.tag} has been unmuted.` });
            await log(interactionOrMessage.client, interactionOrMessage.guild, 'User Unmuted', [
                { name: 'User', value: userToUnmute.tag },
                { name: 'Moderator', value: interactionOrMessage.user.tag },
            ]);
        } catch (error) {
            console.error(error);
            interactionOrMessage.reply({ content: 'There was an error trying to unmute that user.', ephemeral: true });
        }
    },
};
