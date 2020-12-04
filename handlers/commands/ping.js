const Discord = require('discord.js');
const configs = require('../../conf/config.json');
const colors = require('../../conf/colors.json');

module.exports = {
    name: 'ping',
    asliases: ['pingapi', 'pingdiscord'],
    async execute(message, args, client) {

        const msg = await message.channel.send('Pinging...');

        msg.edit(`Latency is: ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms`);

    }
}