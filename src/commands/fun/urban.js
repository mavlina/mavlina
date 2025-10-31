const { get } = require('../../../lib/api');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'urban',
    description: 'Gets a definition from Urban Dictionary.',
    options: [
        {
            name: 'term',
            type: 3, // STRING
            description: 'The term to look up',
            required: true,
        },
    ],
    async execute(interactionOrMessage) {
        const term = interactionOrMessage.options.getString('term');
        try {
            const { list } = await get(`http://api.urbandictionary.com/v0/define?term=${encodeURIComponent(term)}`);

            if (!list.length) {
                return interactionOrMessage.reply({ content: `No results found for **${term}**.`, ephemeral: true });
            }

            const [definition] = list;
            const embed = new EmbedBuilder()
                .setColor('#1D2439')
                .setTitle(definition.word)
                .setURL(definition.permalink)
                .addFields(
                    { name: 'Definition', value: definition.definition.substring(0, 1024) },
                    { name: 'Example', value: definition.example.substring(0, 1024) },
                    { name: 'Rating', value: `${definition.thumbs_up} 👍 | ${definition.thumbs_down} 👎` },
                );

            interactionOrMessage.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            interactionOrMessage.reply({ content: 'Could not fetch a definition at this time.', ephemeral: true });
        }
    },
};
