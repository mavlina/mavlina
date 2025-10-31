const { PermissionsBitField } = require('discord.js');
const { log } = require('../../utils/modlog');

module.exports = {
    name: 'clear',
    description: 'Deletes a specified number of messages from a channel.',
    options: [
        {
            name: 'amount',
            type: 4, // INTEGER
            description: 'The number of messages to delete (1-100)',
            required: true,
        },
    ],
    async execute(interactionOrMessage) {
        const member = interactionOrMessage.member;
        if (!member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            return interactionOrMessage.reply({ content: 'You do not have permission to manage messages.', ephemeral: true });
        }

        const amount = interactionOrMessage.options.getInteger('amount');

        if (amount < 1 || amount > 100) {
            return interactionOrMessage.reply({ content: 'You must specify an amount between 1 and 100.', ephemeral: true });
        }

        try {
            const { size } = await interactionOrMessage.channel.bulkDelete(amount, true);
            interactionOrMessage.reply({ content: `Successfully deleted ${size} messages.`, ephemeral: true });
            await log(interactionOrMessage.client, interactionOrMessage.guild, 'Messages Cleared', [
                { name: 'Channel', value: interactionOrMessage.channel.name },
                { name: 'Amount', value: size.toString() },
                { name: 'Moderator', value: interactionOrMessage.user.tag },
            ]);
        } catch (error) {
            console.error(error);
            interactionOrMessage.reply({ content: 'There was an error trying to delete messages in this channel.', ephemeral: true });
        }
    },
};
