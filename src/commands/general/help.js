const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Displays a list of available commands.',
    async execute(interactionOrMessage) {
        const client = interactionOrMessage.client;
        const commands = client.commandHandler.commands;
        const commandsArray = Array.from(commands.values());
        const categories = [...new Set(commandsArray.map(cmd => cmd.category))];

        const homeEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Help Menu')
            .setDescription('Please select a category to see the available commands.');

        categories.forEach(category => {
            homeEmbed.addFields({ name: category.charAt(0).toUpperCase() + category.slice(1), value: `\`${commandsArray.filter(cmd => cmd.category === category).length}\` commands` });
        });

        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId('help-menu')
            .setPlaceholder('Select a category')
            .addOptions(categories.map(category => ({
                label: category.charAt(0).toUpperCase() + category.slice(1),
                value: category,
            })));

        const row = new ActionRowBuilder().addComponents(selectMenu);

        const homeButton = new ButtonBuilder()
            .setCustomId('home-button')
            .setLabel('Home')
            .setStyle(ButtonStyle.Primary)
            .setDisabled(true);

        const buttonRow = new ActionRowBuilder().addComponents(homeButton);

        const message = await interactionOrMessage.reply({ embeds: [homeEmbed], components: [row, buttonRow], fetchReply: true });

        const collector = message.createMessageComponentCollector({ time: 60000 });

        collector.on('collect', async i => {
            if (i.isStringSelectMenu()) {
                const category = i.values[0];
                const categoryCommands = commandsArray.filter(cmd => cmd.category === category);

                const categoryEmbed = new EmbedBuilder()
                    .setColor('#0099ff')
                    .setTitle(`${category.charAt(0).toUpperCase() + category.slice(1)} Commands`)
                    .setDescription(categoryCommands.map(cmd => `\`/${cmd.name}\` - ${cmd.description}`).join('\n'));

                homeButton.setDisabled(false);
                await i.update({ embeds: [categoryEmbed], components: [row, buttonRow] });
            } else if (i.isButton()) {
                if (i.customId === 'home-button') {
                    homeButton.setDisabled(true);
                    await i.update({ embeds: [homeEmbed], components: [row, buttonRow] });
                }
            }
        });

        collector.on('end', () => {
            const disabledRow = new ActionRowBuilder().addComponents(selectMenu.setDisabled(true));
            const disabledButtonRow = new ActionRowBuilder().addComponents(homeButton.setDisabled(true));
            message.edit({ components: [disabledRow, disabledButtonRow] });
        });
    },
};
