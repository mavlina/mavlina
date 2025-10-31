async function getChannel(client, channelId) {
    try {
        return await client.channels.fetch(channelId);
    } catch (error) {
        console.error(`Error fetching channel ${channelId}:`, error);
        return null;
    }
}

async function getMessage(channel, messageId) {
    try {
        return await channel.messages.fetch(messageId);
    } catch (error) {
        console.error(`Error fetching message ${messageId} from channel ${channel.id}:`, error);
        return null;
    }
}

async function getMember(guild, memberId) {
    try {
        return await guild.members.fetch(memberId);
    } catch (error) {
        console.error(`Error fetching member ${memberId} from guild ${guild.id}:`, error);
        return null;
    }
}

module.exports = {
    getChannel,
    getMessage,
    getMember,
};
