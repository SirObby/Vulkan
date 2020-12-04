const fs = require('fs');
const Discord = require('discord.js');

exports.exec = async (message, client) => {
    
    delete require.cache[require.resolve(`./Servers/${message.guild.id}/config.json`)];

    let serverconfig = require(`./${message.guild.id}/config.json`)

    if(message.author.bot) {
        return;
    }

    if (message.webhookID) return;

    if (!fs.existsSync(`./Servers/${message.guild.id}/users/${message.author.id}.json`)) {
    
        fs.writeFile(`./Servers/${message.guild.id}/users/${message.author.id}.json`, `{ "xp":0, "level": 0, "tolevel":100, "time":0, "id": "${message.author.id}", "name":"${message.author.username + "#" + message.author.discriminator}", "daily": ${Date.now()} }`, function (err) {
            if (err) throw err;
            console.log('Saved!');
          });

        let content = JSON.parse(fs.readFileSync(`./Servers/${message.guild.id}/users/${message.author.id}.json`, 'utf8'));

        content.xp = 15;
        content.tolevel = 100;
        content.time = Date.now();

        let ree = "ree"
        fs.writeFileSync(`./Servers/${message.guild.id}/users/${message.author.id}.json`, JSON.stringify(content));
    
    } else {

        let content = JSON.parse(fs.readFileSync(`./Servers/${message.guild.id}/users/${message.author.id}.json`, 'utf8'));

        if(content.level > 5) {

            if(message.member.roles.has("782204484087709697")) {

            }else {
                message.member.roles.add("782204484087709697")
            }

        }

        if(content.level > 10) {

            if(message.member.roles.has("782204523343118356")) {

            }else {
                message.member.roles.add("782204523343118356")
            }

        }

        

        if(Date.now() - content.time > 60000) {

            let currentxp = content.xp
            content.name = message.author.username + "#" + message.author.discriminator
            if(message.channel.id == "778643955692601344") {
                content.xp = currentxp + Math.floor(Math.random() * 100) + 30;
            } else {
                content.xp = currentxp + Math.floor(Math.random() * 50) + 15;
            }

            content.time = Date.now()

            if(content.xp > content.tolevel) {
                content.xp = 0;
                content.level = content.level + 1
                content.tolevel = content.tolevel + 100;

                if(!message.channel.id == "778643955692601344") {

                const embed = new Discord.MessageEmbed()
                .setColor(0x7289da)
                .setTitle("LEVEL UP!")
                .setDescription(`You are now level: ${content.level}!`);
        
                if(serverconfig.levelup == true) {

                message.channel.send(embed);
                }
            }
            }


        }

        fs.writeFileSync(`./Servers/${message.guild.id}/users/${message.author.id}.json`, JSON.stringify(content));
    }

}
