const Discord = require('discord.js');
const configs = require('../../conf/config.json');
const colors = require('../../conf/colors.json');

module.exports = {
    name: 'info',
    async execute(message, args, client) {

        const embed = new Discord.MessageEmbed()
        .setColor(0x7289da)
        .setDescription(`[Support Server](https://discord.gg/gn7YsbaMqx)\n[Invite](https://discord.com/oauth2/authorize?client_id=778970453716762644&permissions=8&scope=bot)\n[Made By Sir Obsidian#2640](https://sirobby.github.io)`);

        message.channel.send(embed)
    }
}