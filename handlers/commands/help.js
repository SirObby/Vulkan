const Discord = require('discord.js');
const configs = require('../../conf/config.json');
const colors = require('../../conf/colors.json');
module.exports = {
    name: 'help',
    guildOnly: true,
    description: 'help command!',
    execute(message, args, client) {

        const embed = new Discord.MessageEmbed()
        .setTitle('**VULKAN**')
        .setColor(0x212226)
        .setDescription(`**Build:** \`${configs.version}\`\nhelp\nping\nrank\nleaderboard\nconfig\nban\nkick\nwarn\ninfo`);
        
        message.channel.send(embed);

    },
};
