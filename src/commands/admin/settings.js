const { PermissionsBitField } = require('discord.js');
const prisma = require('../../utils/db');

module.exports = {
    name: 'settings',
    description: 'Configure guild-specific settings.',
    options: [
        {
            name: 'modlogchannel',
            description: 'Set the moderation log channel.',
            type: 1, // SUB_COMMAND
            options: [
                {
                    name: 'channel',
                    type: 7, // CHANNEL
                    description: 'The channel to use for moderation logs',
                    required: true,
                },
            ],
        },
        {
            name: 'mutedrole',
            description: 'Set the muted role.',
            type: 1, // SUB_COMMAND
            options: [
                {
                    name: 'role',
                    type: 8, // ROLE
                    description: 'The role to use for muted users',
                    required: true,
                },
            ],
        },
    ],
    async execute(interactionOrMessage) {
        const member = interactionOrMessage.member;
        if (!member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return interactionOrMessage.reply({ content: 'You must be an administrator to use this command.', ephemeral: true });
        }

        const subcommand = interactionOrMessage.options.getSubcommand();
        const guildId = interactionOrMessage.guild.id;

        if (subcommand === 'modlogchannel') {
            const channel = interactionOrMessage.options.getChannel('channel');
            await prisma.guild.update({
                where: { id: guildId },
                data: { modLogChannel: channel.id },
            });
            interactionOrMessage.reply({ content: `Moderation log channel set to ${channel}.` });
        } else if (subcommand === 'mutedrole') {
            const role = interactionOrMessage.options.getRole('role');
            await prisma.guild.update({
                where: { id: guildId },
                data: { mutedRole: role.id },
            });
            interactionOrMessage.reply({ content: `Muted role set to ${role}.` });
        }
    },
};
