const { get } = require('../../../lib/api');

module.exports = {
    name: 'joke',
    description: 'Tells a random joke.',
    async execute(interactionOrMessage) {
        await interactionOrMessage.deferReply();
        try {
            const joke = await get('https://v2.jokeapi.dev/joke/Any?type=single');
            interactionOrMessage.editReply(joke.joke);
        } catch (error) {
            console.error(error);
            interactionOrMessage.editReply({ content: 'Could not fetch a joke at this time.' });
        }
    },
};
