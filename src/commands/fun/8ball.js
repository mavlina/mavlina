const responses = [
    'It is certain.',
    'It is decidedly so.',
    'Without a doubt.',
    'Yes - definitely.',
    'You may rely on it.',
    'As I see it, yes.',
    'Most likely.',
    'Outlook good.',
    'Yes.',
    'Signs point to yes.',
    'Reply hazy, try again.',
    'Ask again later.',
    'Better not tell you now.',
    'Cannot predict now.',
    'Concentrate and ask again.',
    'Don\'t count on it.',
    'My reply is no.',
    'My sources say no.',
    'Outlook not so good.',
    'Very doubtful.',
];

module.exports = {
    name: '8ball',
    description: 'Ask the magic 8-ball a question.',
    options: [
        {
            name: 'question',
            type: 3, // STRING
            description: 'The question to ask the 8-ball',
            required: true,
        },
    ],
    execute(interactionOrMessage) {
        const question = interactionOrMessage.options.getString('question');
        const response = responses[Math.floor(Math.random() * responses.length)];
        interactionOrMessage.reply(`**Question:** ${question}\n**Answer:** ${response}`);
    },
};

