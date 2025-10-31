const { PermissionsBitField } = require('discord.js');
const { log } = require('../../utils/modlog');

module.exports = {
    name: 'ban',
    description: 'Bans a user from the server.',
    options: [
        {
            name: 'user',
            type: 6, // USER
            description: 'The user to ban',
            required: true,
        },
        {
            name: 'reason',
            type: 3, // STRING
            description: 'The reason for banning the user',
            required: false,
        },
    ],
    async execute(interactionOrMessage) {
        const member = interactionOrMessage.member;
        if (!member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
            return interactionOrMessage.reply({
                content: 'You do not have permission to ban members.',
                ephemeral: true,
            });
        }

        const userToBan = interactionOrMessage.options.getUser('user');
        const reason = `[Moderator: ${interactionOrMessage.user.tag}] ${interactionOrMessage.options.getString('reason') || `[Moderator: ${interactionOrMessage.user.tag}] 'No reason provided'`}`;

        if (!userToBan) {
            return interactionOrMessage.reply({ content: 'Please specify a user to ban.', ephemeral: true });
        }

        const memberToBan = interactionOrMessage.guild.members.cache.get(userToBan.id);

        if (memberToBan && !memberToBan.bannable) {
            return interactionOrMessage.reply({ content: 'I cannot ban that user.', ephemeral: true });
        }

        try {
            await interactionOrMessage.guild.bans.create(userToBan, { reason });
            interactionOrMessage.reply({ content: `${userToBan.tag} has been banned for: ${reason}` });
            await log(interactionOrMessage.client, interactionOrMessage.guild, 'User Banned', [
                { name: 'User', value: userToBan.tag },
                { name: 'Moderator', value: interactionOrMessage.user.tag },
                { name: 'Reason', value: reason },
            ]);
        } catch (error) {
            console.error(error);
            interactionOrMessage.reply({ content: 'There was an error trying to ban that user.', ephemeral: true });
        }
    },
};
