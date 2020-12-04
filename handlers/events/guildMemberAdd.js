const configs = require('../../conf/config.json');
const command_handler = require('../../commands');
const Discord = require('discord.js');

module.exports = {
    type: 'guildMemberAdd',
    async run(client, member) {

        console.log("User joined.")

    }
}