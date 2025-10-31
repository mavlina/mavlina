const { PermissionsBitField } = require('discord.js');
const { log } = require('../../utils/modlog');
const { getGuildSettings } = require('../../utils/guild');

module.exports = {
    name: 'mute',
    description: 'Mutes a user.',
    options: [
        {
            name: 'user',
            type: 6, // USER
            description: 'The user to mute',
            required: true,
        },
        {
            name: 'reason',
            type: 3, // STRING
            description: 'The reason for the mute',
            required: false,
        },
    ],
    async execute(interactionOrMessage) {
        const member = interactionOrMessage.member;
        if (!member.permissions.has(PermissionsBitField.Flags.MuteMembers)) {
            return interactionOrMessage.reply({
                content: 'You do not have permission to mute members.',
                ephemeral: true,
            });
        }

        const userToMute = interactionOrMessage.options.getUser('user');
        const reason = `[Moderator: ${interactionOrMessage.user.tag}] ${interactionOrMessage.options.getString('reason') || 'No reason provided'}`;
        const memberToMute = interactionOrMessage.guild.members.cache.get(userToMute.id);

        if (!memberToMute) {
            return interactionOrMessage.reply({ content: 'That user is not in this server.', ephemeral: true });
        }

        const settings = await getGuildSettings(interactionOrMessage.guild.id);
        const mutedRoleId = settings.mutedRole;
        if (!mutedRoleId) {
            return interactionOrMessage.reply({
                content: 'The muted role is not configured for this server. Use `/settings mutedrole` to set it.',
                ephemeral: true,
            });
        }

        const mutedRole = interactionOrMessage.guild.roles.cache.get(mutedRoleId);
        if (!mutedRole) {
            return interactionOrMessage.reply({
                content: 'The configured muted role could not be found.',
                ephemeral: true,
            });
        }

        try {
            await memberToMute.roles.add(mutedRole, reason);
            interactionOrMessage.reply({ content: `${userToMute.tag} has been muted for: ${reason}` });
            await log(interactionOrMessage.client, interactionOrMessage.guild, 'User Muted', [
                { name: 'User', value: userToMute.tag },
                { name: 'Moderator', value: interactionOrMessage.user.tag },
                { name: 'Reason', value: reason },
            ]);
        } catch (error) {
            console.error(error);
            interactionOrMessage.reply({ content: 'There was an error trying to mute that user.', ephemeral: true });
        }
    },
};
