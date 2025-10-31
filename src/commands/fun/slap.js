const { get } = require('../../../lib/api');

module.exports = {
    name: 'slap',
    description: 'Slap another user.',
    options: [
        {
            name: 'user',
            type: 6, // USER
            description: 'The user to slap',
            required: true,
        },
    ],
    async execute(interactionOrMessage) {
        const user = interactionOrMessage.options.getUser('user');
        try {
            const { url } = await get('https://api.waifu.pics/sfw/slap');
            interactionOrMessage.reply({
                content: `${interactionOrMessage.user} slaps ${user}! `,
                files: [url],
            });
        } catch (error) {
            console.error(error);
            interactionOrMessage.reply({ content: `${interactionOrMessage.user} slaps ${user}!`, ephemeral: true });
        }
    },
};
