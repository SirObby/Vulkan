const Discord = require('discord.js');
const configs = require('../../conf/config.json');
const colors = require('../../conf/colors.json');
const fs = require('fs');
const prettyMilliseconds = require('pretty-ms');

module.exports = {
    name: 'daily',
    async execute(message, args, client) {

        if (fs.existsSync(`./Servers/${message.guild.id}/users/${message.author.id}.json`)) {
        
            let content = JSON.parse(fs.readFileSync(`./Servers/${message.guild.id}/users/${message.author.id}.json`, 'utf8'));

            if(!content.daily) {

            fs.writeFileSync(`./Servers/${message.guild.id}/users/${message.author.id}.json`,  `{ "xp": ${content.xp}, "level": ${content.level}, "tolevel": ${content.tolevel}, "time":${content.time}, "id": "${content.id}", "name": "${content.name}", "daily": ${Date.now()} }`);

            const embed = new Discord.MessageEmbed()
            .setColor(0x7289da)
            .setDescription(`Old system detected. Try command again to use up your **DAILY** command.`);
        
            message.channel.send(embed);

            return;
                
            }

            if(Date.now() - content.time > 86400000 ) {

                console.log(Date.now() - content.time > 86400000 )

            } else {

                let math = Math.floor(Date.now() - content.time > 86400000)
                let meth = parseInt(math.toString().replace("-", ""))

                const embed = new Discord.MessageEmbed()
                .setColor(0x7289da)
                .setDescription(`You cannot run this now! Come back in \`${prettyMilliseconds(meth, {compact: true})}\` `);
        
                message.channel.send(embed);

            }

            fs.writeFileSync(`./Servers/${message.guild.id}/users/${message.author.id}.json`, JSON.stringify(content));
        
        } else {
            
            const embed = new Discord.MessageEmbed()
            .setColor(0xff0000)
            .setDescription(`That is weird! \`you dont got shat!\` `);
        
            message.channel.send(embed);

        }


    }
}