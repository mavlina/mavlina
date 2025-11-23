const { get } = require('../../../lib/api');

module.exports = {
    name: 'meme',
    description: 'Sends a random meme.',
    async execute(interactionOrMessage) {
        await interactionOrMessage.deferReply();
        try {
            const meme = await get('https://meme-api.com/gimme');
            interactionOrMessage.editReply({ files: [meme.url] });
        } catch (error) {
            console.error(error);
            interactionOrMessage.editReply({ content: 'Could not fetch a meme at this time.' });
        }
    },
};
