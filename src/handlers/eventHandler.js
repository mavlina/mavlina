const fs = require('fs');
const path = require('path');

class EventHandler {
    constructor(client) {
        this.client = client;
        console.log('EventHandler constructor called.');
    }

    loadEvents() {
        const eventFiles = fs.readdirSync(path.join(__dirname, '../events')).filter(file => file.endsWith('.js'));
        let eventCount = 0;

        console.log('Loading events...');
        for (const file of eventFiles) {
            console.log(`Found event file: ${file}`);
            const event = require(path.join(__dirname, '../events', file));
            if (event.once) {
                this.client.once(event.name, (...args) => event.execute(...args, this.client));
            } else {
                this.client.on(event.name, (...args) => event.execute(...args, this.client));
            }
            eventCount++;
        }
        console.log(`Loaded ${eventCount} events.`);
    }
}

module.exports = EventHandler;
