const Discord = require('discord.js');
const configs = require('../../conf/config.json');
const colors = require('../../conf/colors.json');
const fs = require('fs');

module.exports = {
    name: 'rank',
    async execute(message, args, client) {

        if(!args[0]) {

        if (fs.existsSync(`./Servers/${message.guild.id}/users/${message.author.id}.json`)) {
        
            let content = JSON.parse(fs.readFileSync(`./Servers/${message.guild.id}/users/${message.author.id}.json`, 'utf8'));

            let needed = content.tolevel;

            function relDiff(a, b) {
                return  100 * Math.abs( ( a - b ) / ( (a+b)/2 ) );
               }

            const embed = new Discord.MessageEmbed()
            .setColor(0x7289da)
            .setDescription(`Level: ${content.level}\nXP: ${content.xp} of ${needed}, ${Math.floor((100/content.tolevel)*content.xp)}% .`);
        
            message.channel.send(embed);
        
        } else {
            
            const embed = new Discord.MessageEmbed()
            .setColor(0xff0000)
            .setDescription(`That is weird! \`LEVEL DOES NOT EXIST!\` `);
        
            message.channel.send(embed);

        }
    }else {
        let user =message.mentions.members.first() || message.client.members.fetch(args[0])

        if (fs.existsSync(`./Servers/${message.guild.id}/users/${user.user.id}.json`)) {
        
            let content = JSON.parse(fs.readFileSync(`./Servers/${message.guild.id}/users/${user.user.id}.json`, 'utf8'));
/*
            let needed = 100;
            let i = 0;
            for( i == content.level; i++;) {
                needed + content.tolevel;
            }

            function relDiff(a, b) {
                return  100 * Math.abs( ( a - b ) / ( (a+b)/2 ) );
               }
*/
            const embed = new Discord.MessageEmbed()
            .setColor(0x7289da)
            .setDescription(`Level: ${content.level}\nXP: ${content.xp} of ${content.tolevel}, ${Math.floor((100/content.tolevel)*content.xp)}% .`);
        
            message.channel.send(embed);
        
        } else {
            
            const embed = new Discord.MessageEmbed()
            .setColor(0xff0000)
            .setDescription(`That is weird! \`LEVEL DOES NOT EXIST FOR THIS USER!\` `);
        
            message.channel.send(embed);

        }

    }

    }
}