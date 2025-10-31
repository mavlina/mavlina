module.exports = {
    name: 'rolldice',
    description: 'Rolls a dice.',
    execute(interactionOrMessage) {
        const result = Math.floor(Math.random() * 6) + 1;
        interactionOrMessage.reply(`You rolled a **${result}**.`);
    },
};
