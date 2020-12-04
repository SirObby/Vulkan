const Discord = require('discord.js');
const configs = require('../../conf/config.json');
const colors = require('../../conf/colors.json');

module.exports = {
    name: 'privacy',
    async execute(message, args, client) {

        const embed = new Discord.MessageEmbed()
            .setColor(0x7289da)
            .setTitle(`Privacy Policy`)
            .setAuthor(message.author.username + "#" + message.author.discriminator, message.author.avatarURL(), undefined)
            .setDescription(`We save Server ID's, Message ID's, Channel ID's, User ID's and your Server Configurations.\nOnly the bot and bot owner (Sir Obsidian) can see this data.\nTo delete discord server's data please contact me \`Sir Obsidian#2640\` or you can join the [Support Server](https://discord.gg/gn7YsbaMqx) `);
        
            message.channel.send(embed);


    }
}