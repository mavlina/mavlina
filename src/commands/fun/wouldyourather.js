const questions = [
    'Would you rather have unlimited bacon but no more video games or games but no more bacon?',
    'Would you rather be able to fly or be invisible?',
    'Would you rather have a rewind button or a pause button on your life?',
    'Would you rather be able to talk to animals or speak all human languages?',
    'Would you rather live in a world without music or a world without movies?',
];

module.exports = {
    name: 'wouldyourather',
    description: 'Get a "Would you rather..." question.',
    execute(interactionOrMessage) {
        const question = questions[Math.floor(Math.random() * questions.length)];
        interactionOrMessage.reply(question);
    },
};
