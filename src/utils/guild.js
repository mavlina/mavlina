const prisma = require('./db');

async function getGuildSettings(guildId) {
    let guild = await prisma.guild.findUnique({
        where: { id: guildId },
    });

    if (!guild) {
        guild = await prisma.guild.create({
            data: { id: guildId },
        });
    }

    return guild;
}

module.exports = { getGuildSettings };
