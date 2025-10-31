const mapping = {
    a: '🇦',
    b: '🇧',
    c: '🇨',
    d: '🇩',
    e: '🇪',
    f: '🇫',
    g: '🇬',
    h: '🇭',
    i: '🇮',
    j: '🇯',
    k: '🇰',
    l: '🇱',
    m: '🇲',
    n: '🇳',
    o: '🇴',
    p: '🇵',
    q: '🇶',
    r: '🇷',
    s: '🇸',
    t: '🇹',
    u: '🇺',
    v: '🇻',
    w: '🇼',
    x: '🇽',
    y: '🇾',
    z: '🇿',
    0: '0️⃣',
    1: '1️⃣',
    2: '2️⃣',
    3: '3️⃣',
    4: '4️⃣',
    5: '5️⃣',
    6: '6️⃣',
    7: '7️⃣',
    8: '8️⃣',
    9: '9️⃣',
    '!': '❗',
    '?': '❓',
    ' ': ' ',
};

module.exports = {
    name: 'emojify',
    description: 'Converts text to emojis.',
    options: [
        {
            name: 'text',
            type: 3, // STRING
            description: 'The text to emojify',
            required: true,
        },
    ],
    execute(interactionOrMessage) {
        const text = interactionOrMessage.options.getString('text').toLowerCase();
        const emojified = text
            .split('')
            .map((char) => mapping[char] || char)
            .join('');
        interactionOrMessage.reply(emojified);
    },
};
