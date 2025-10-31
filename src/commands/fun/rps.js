const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: 'rps',
    description: 'Play Rock, Paper, Scissors with the bot.',
    async execute(interactionOrMessage) {
        const choices = ['rock', 'paper', 'scissors'];
        const botChoice = choices[Math.floor(Math.random() * choices.length)];

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder().setCustomId('rock').setLabel('Rock').setStyle(ButtonStyle.Primary),
                new ButtonBuilder().setCustomId('paper').setLabel('Paper').setStyle(ButtonStyle.Primary),
                new ButtonBuilder().setCustomId('scissors').setLabel('Scissors').setStyle(ButtonStyle.Primary),
            );

        const message = await interactionOrMessage.reply({ content: 'Choose your weapon!', components: [row], fetchReply: true });

        const collector = message.createMessageComponentCollector({ time: 15000 });

        collector.on('collect', async i => {
            if (i.user.id === interactionOrMessage.user.id) {
                const userChoice = i.customId;
                let result;

                if (userChoice === botChoice) {
                    result = 'It\'s a tie!';
                } else if (
                    (userChoice === 'rock' && botChoice === 'scissors') ||
                    (userChoice === 'paper' && botChoice === 'rock') ||
                    (userChoice === 'scissors' && botChoice === 'paper')
                ) {
                    result = 'You win!';
                } else {
                    result = 'You lose!';
                }

                await i.update({ content: `You chose **${userChoice}**, I chose **${botChoice}**. ${result}`, components: [] });
                collector.stop();
            } else {
                i.reply({ content: 'These buttons are not for you!', ephemeral: true });
            }
        });

        collector.on('end', collected => {
            if (collected.size === 0) {
                message.edit({ content: 'You did not make a choice in time.', components: [] });
            }
        });
    },
};
