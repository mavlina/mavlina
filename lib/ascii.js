const font = {
    'A': ['AAA', 'A A', 'AAA', 'A A', 'A A'],
    'B': ['BBB', 'B B', 'BBB', 'B B', 'BBB'],
    'C': ['CCC', 'C  ', 'C  ', 'C  ', 'CCC'],
    'D': ['DDD', 'D D', 'D D', 'D D', 'DDD'],
    'E': ['EEE', 'E  ', 'EEE', 'E  ', 'EEE'],
    'F': ['FFF', 'F  ', 'FFF', 'F  ', 'F  '],
    'G': ['GGG', 'G  ', 'G G', 'G G', 'GGG'],
    'H': ['H H', 'H H', 'HHH', 'H H', 'H H'],
    'I': ['III', ' I ', ' I ', ' I ', 'III'],
    'J': ['JJJ', '  J', '  J', 'J J', ' JJ'],
    'K': ['K K', 'K K', 'KK ', 'K K', 'K K'],
    'L': ['L  ', 'L  ', 'L  ', 'L  ', 'LLL'],
    'M': ['M M', 'MMM', 'M M', 'M M', 'M M'],
    'N': ['N N', 'NNN', 'N N', 'N N', 'N N'],
    'O': ['OOO', 'O O', 'O O', 'O O', 'OOO'],
    'P': ['PPP', 'P P', 'PPP', 'P  ', 'P  '],
    'Q': ['QQQ', 'Q Q', 'Q Q', 'Q Q', 'QQQ'],
    'R': ['RRR', 'R R', 'RRR', 'R R', 'R R'],
    'S': ['SSS', 'S  ', 'SSS', '  S', 'SSS'],
    'T': ['TTT', ' T ', ' T ', ' T ', ' T '],
    'U': ['U U', 'U U', 'U U', 'U U', 'UUU'],
    'V': ['V V', 'V V', 'V V', 'V V', ' V '],
    'W': ['W W', 'W W', 'W W', 'WWW', 'W W'],
    'X': ['X X', 'X X', ' X ', 'X X', 'X X'],
    'Y': ['Y Y', 'Y Y', ' Y ', ' Y ', ' Y '],
    'Z': ['ZZZ', '  Z', ' Z ', 'Z  ', 'ZZZ'],
    ' ': ['   ', '   ', '   ', '   ', '   '],
};

function generate(text) {
    const upperText = text.toUpperCase();
    let output = '';
    for (let i = 0; i < 5; i++) {
        let line = '';
        for (let j = 0; j < upperText.length; j++) {
            const char = upperText[j];
            if (font[char]) {
                line += font[char][i] + ' ';
            }
        }
        output += line + '\n';
    }
    return '```\n' + output + '```';
}

module.exports = { generate };
