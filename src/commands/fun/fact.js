const { get } = require('../../../lib/api');

module.exports = {
    name: 'fact',
    description: 'Tells a random fun fact.',
    async execute(interactionOrMessage) {
        await interactionOrMessage.deferReply();
        try {
            const fact = await get('https://uselessfacts.jsph.pl/random.json?language=en');
            interactionOrMessage.editReply(fact.text);
        } catch (error) {
            console.error(error);
            interactionOrMessage.editReply({ content: 'Could not fetch a fact at this time.' });
        }
    },
};
