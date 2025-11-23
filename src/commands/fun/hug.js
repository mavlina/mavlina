const { get } = require('../../../lib/api');

module.exports = {
    name: 'hug',
    description: 'Hug another user.',
    options: [
        {
            name: 'user',
            type: 6, // USER
            description: 'The user to hug',
            required: true,
        },
    ],
    async execute(interactionOrMessage) {
        await interactionOrMessage.deferReply();
        const user = interactionOrMessage.options.getUser('user');
        try {
            const { url } = await get('https://api.waifu.pics/sfw/hug');
            interactionOrMessage.editReply({
                content: `${interactionOrMessage.user} hugs ${user}! `,
                files: [url],
            });
        } catch (error) {
            console.error(error);
            interactionOrMessage.editReply({ content: `${interactionOrMessage.user} hugs ${user}!` });
        }
    },
};
