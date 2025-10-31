const { PermissionsBitField } = require('discord.js');

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
    execute(interactionOrMessage) {
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

        memberToKick.kick(reason)
            .then(() => {
                interactionOrMessage.reply({ content: `${userToKick.tag} has been kicked for: ${reason}` });
            })
            .catch(error => {
                console.error(error);
                interactionOrMessage.reply({ content: 'There was an error trying to kick that user.', ephemeral: true });
            });
    },
};
