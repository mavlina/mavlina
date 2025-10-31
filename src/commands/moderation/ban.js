const { PermissionsBitField } = require('discord.js');

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
    execute(interactionOrMessage) {
        const member = interactionOrMessage.member;
        if (!member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
            return interactionOrMessage.reply({ content: 'You do not have permission to ban members.', ephemeral: true });
        }

        const userToBan = interactionOrMessage.options.getUser('user');
        const reason = interactionOrMessage.options.getString('reason') || 'No reason provided';

        if (!userToBan) {
            return interactionOrMessage.reply({ content: 'Please specify a user to ban.', ephemeral: true });
        }

        const memberToBan = interactionOrMessage.guild.members.cache.get(userToBan.id);

        if (memberToBan && !memberToBan.bannable) {
            return interactionOrMessage.reply({ content: 'I cannot ban that user.', ephemeral: true });
        }

        interactionOrMessage.guild.bans.create(userToBan, { reason })
            .then(() => {
                interactionOrMessage.reply({ content: `${userToBan.tag} has been banned for: ${reason}` });
            })
            .catch(error => {
                console.error(error);
                interactionOrMessage.reply({ content: 'There was an error trying to ban that user.', ephemeral: true });
            });
    },
};
