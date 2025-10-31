const topics = [
    'What is your favorite movie?',
    'What is your favorite book?',
    'What is your favorite food?',
    'What is your favorite hobby?',
    'What is your dream vacation?',
];

module.exports = {
    name: 'topic',
    description: 'Get a random conversation topic.',
    execute(interactionOrMessage) {
        const topic = topics[Math.floor(Math.random() * topics.length)];
        interactionOrMessage.reply(topic);
    },
};
