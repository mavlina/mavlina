const { get } = require('../../../lib/api');

module.exports = {
    name: 'dog',
    description: 'Sends a random dog picture.',
    async execute(interactionOrMessage) {
        try {
            const dog = await get('https://api.thedogapi.com/v1/images/search');
            interactionOrMessage.reply({ files: [dog[0].url] });
        } catch (error) {
            console.error(error);
            interactionOrMessage.reply({ content: 'Could not fetch a dog picture at this time.', ephemeral: true });
        }
    },
};
