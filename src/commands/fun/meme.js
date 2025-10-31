const { get } = require('../../../lib/api');

module.exports = {
    name: 'meme',
    description: 'Sends a random meme.',
    async execute(interactionOrMessage) {
        try {
            const meme = await get('https://meme-api.com/gimme');
            interactionOrMessage.reply({ files: [meme.url] });
        } catch (error) {
            console.error(error);
            interactionOrMessage.reply({ content: 'Could not fetch a meme at this time.', ephemeral: true });
        }
    },
};
