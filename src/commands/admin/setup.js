const { PermissionsBitField } = require('discord.js');
const prisma = require('../../utils/db');

module.exports = {
    name: 'setup',
    description: 'Setup various features for the bot.',
    options: [
        {
            name: 'mutedrole',
            description: 'Create and configure the "Muted" role.',
            type: 1, // SUB_COMMAND
        },
    ],
    async execute(interactionOrMessage) {
        const member = interactionOrMessage.member;
        if (!member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return interactionOrMessage.reply({
                content: 'You must be an administrator to use this command.',
                ephemeral: true,
            });
        }

        const subcommand = interactionOrMessage.options.getSubcommand();

        if (subcommand === 'mutedrole') {
            const guild = interactionOrMessage.guild;
            let mutedRole = guild.roles.cache.find((role) => role.name === 'Muted');

            try {
                if (!mutedRole) {
                    mutedRole = await guild.roles.create({
                        name: 'Muted',
                        color: '#514f48',
                        permissions: [],
                    });

                    guild.channels.cache.forEach(async (channel) => {
                        await channel.permissionOverwrites.edit(mutedRole, {
                            SendMessages: false,
                            AddReactions: false,
                            Speak: false,
                        });
                    });
                }

                await prisma.guild.update({
                    where: { id: guild.id },
                    data: { mutedRole: mutedRole.id },
                });

                interactionOrMessage.reply({ content: 'Successfully configured the "Muted" role.' });
            } catch (error) {
                console.error(error);
                interactionOrMessage.reply({
                    content: 'There was an error configuring the "Muted" role.',
                    ephemeral: true,
                });
            }
        }
    },
};
