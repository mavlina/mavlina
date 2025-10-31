const { get } = require('../../../lib/api');

module.exports = {
    name: 'fact',
    description: 'Tells a random fun fact.',
    async execute(interactionOrMessage) {
        try {
            const fact = await get('https://uselessfacts.jsph.pl/random.json?language=en');
            interactionOrMessage.reply(fact.text);
        } catch (error) {
            console.error(error);
            interactionOrMessage.reply({ content: 'Could not fetch a fact at this time.', ephemeral: true });
        }
    },
};
