module.exports = {
    name: 'coinflip',
    description: 'Flips a coin.',
    execute(interactionOrMessage) {
        const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
        interactionOrMessage.reply(`The coin landed on **${result}**.`);
    },
};
