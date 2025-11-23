const { get } = require('../../../lib/api');

module.exports = {
    name: 'pat',
    description: 'Pat another user.',
    options: [
        {
            name: 'user',
            type: 6, // USER
            description: 'The user to pat',
            required: true,
        },
    ],
    async execute(interactionOrMessage) {
        await interactionOrMessage.deferReply();
        const user = interactionOrMessage.options.getUser('user');
        try {
            const { url } = await get('https://api.waifu.pics/sfw/pat');
            interactionOrMessage.editReply({
                content: `${interactionOrMessage.user} pats ${user}! `,
                files: [url],
            });
        } catch (error) {
            console.error(error);
            interactionOrMessage.editReply({ content: `${interactionOrMessage.user} pats ${user}!` });
        }
    },
};
