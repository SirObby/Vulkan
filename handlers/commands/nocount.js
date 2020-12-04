const Discord = require('discord.js');
const configs = require('../../conf/config.json');
const colors = require('../../conf/colors.json');
const fs = require('fs');

module.exports = {
    name: 'nocount',
    async execute(message, args, client) {

        if(message.guild.id != "702213441456308274") {
            return;
        }

        if(!message.member.hasPermission("ADMINISTRATOR") || !message.author.id == "320699339645124608") {
            const embed = new Discord.MessageEmbed()
            .setColor(0xff0000)
            .setDescription(`Missing Permission!`);
        
            message.channel.send(embed);
            return;
        }

        if(!args[0]) {
            const embed = new Discord.MessageEmbed()
            .setColor(0xff0000)
            .setDescription(`Missing Argument!`);
        
            message.channel.send(embed);
    }else {
        let user =message.mentions.members.first() || message.client.members.fetch(args[0])

        user.roles.add("781907248678305873");
        message.channel.send("Done!")

    }

    }
}