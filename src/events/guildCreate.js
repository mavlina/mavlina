const prisma = require('../utils/db');

module.exports = {
    name: 'guildCreate',
    async execute(guild) {
        try {
            await prisma.guild.create({
                data: {
                    id: guild.id,
                },
            });
            console.log(`Joined new guild: ${guild.name}. Created default settings.`);
        } catch (error) {
            console.error(`Error creating settings for guild ${guild.name}:`, error);
        }
    },
};
