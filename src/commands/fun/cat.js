const { get } = require('../../../lib/api');

module.exports = {
    name: 'cat',
    description: 'Sends a random cat picture.',
    async execute(interactionOrMessage) {
        try {
            const cat = await get('https://api.thecatapi.com/v1/images/search');
            interactionOrMessage.reply({ files: [cat[0].url] });
        } catch (error) {
            console.error(error);
            interactionOrMessage.reply({ content: 'Could not fetch a cat picture at this time.', ephemeral: true });
        }
    },
};
