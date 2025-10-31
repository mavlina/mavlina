const { EmbedBuilder } = require('discord.js');
const { getGuildSettings } = require('./guild');

async function log(client, guild, title, fields) {
    const settings = await getGuildSettings(guild.id);
    const modLogChannelId = settings.modLogChannel;
    if (!modLogChannelId) return;

    const logChannel = await client.channels.fetch(modLogChannelId).catch(() => null);
    if (!logChannel) return;

    const embed = new EmbedBuilder()
        .setColor('#ff0000')
        .setTitle(title)
        .addFields(fields)
        .setTimestamp();

    logChannel.send({ embeds: [embed] });
}

module.exports = { log };
