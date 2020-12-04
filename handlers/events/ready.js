const configs = require('../../conf/config.json');
const command_handler = require('../../commands');
const Discord = require('discord.js');
const wait = require('util').promisify(setTimeout);

module.exports = {
    type: 'ready',
    async run(client) {

        console.log(`${client.user.tag}: ` + 'now online | version: ' + configs.version);

        command_handler.initCommands(client);
    
        let statuses = [
            `${configs.prefix}help`,
        ]
    
        setInterval(function () {
            let status = statuses[Math.floor(Math.random() * statuses.length)]
            client.user.setActivity(status, {
                type: 'WATCHING'
            });
        }, 6000)

    }
}