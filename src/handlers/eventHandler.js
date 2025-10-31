const fs = require('fs');
const path = require('path');

class EventHandler {
    constructor(client) {
        this.client = client;
    }

    loadEvents() {
        const eventFiles = fs.readdirSync(path.join(__dirname, '../events')).filter(file => file.endsWith('.js'));

        for (const file of eventFiles) {
            const event = require(path.join(__dirname, '../events', file));
            if (event.once) {
                this.client.once(event.name, (...args) => event.execute(...args, this.client));
            } else {
                this.client.on(event.name, (...args) => event.execute(...args, this.client));
            }
            console.log(`Loaded event: ${event.name}`);
        }
    }
}

module.exports = EventHandler;
