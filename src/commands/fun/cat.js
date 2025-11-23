const { get } = require('../../../lib/api');

module.exports = {
    name: 'cat',
    description: 'Sends a random cat picture.',
    async execute(interactionOrMessage) {
        await interactionOrMessage.deferReply();
        try {
            const cat = await get('https://api.thecatapi.com/v1/images/search');
            interactionOrMessage.editReply({ files: [cat[0].url] });
        } catch (error) {
            console.error(error);
            interactionOrMessage.editReply({ content: 'Could not fetch a cat picture at this time.' });
        }
    },
};
