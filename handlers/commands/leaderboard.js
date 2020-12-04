const Discord = require('discord.js');
const configs = require('../../conf/config.json');
const colors = require('../../conf/colors.json');
const fs = require('fs');


module.exports = {
    name: 'leaderboard',
    asliases: ['lb'],
    async execute(message, args, client) {
        
        let serverconfig = require(`../../Servers/${message.guild.id}/config.json`)

        const userData = [];
        const dirFiles = await fs.promises.opendir(`./Servers/${message.guild.id}/users/`); // update path
        
        for await (const file of dirFiles) {
            if (file.isFile() && file.name.endsWith('.json')) {
                const jsonFile = await fs.promises.readFile(`./Servers/${message.guild.id}/users/${file.name}`, 'utf-8'); // update path
                userData.push(JSON.parse(jsonFile));
            }
        }
        
        const sortData = (a, b) => a.level === b.level ? b.xp - a.xp : b.level - a.level;
        
        const topThree = userData.sort(sortData).slice(0, 5);

        console.log(topThree[0])

        const embed = new Discord.MessageEmbed()
            .setColor(0x7289da)
            .setDescription(`1. ${topThree[0].name} Level: ${topThree[0].level} XP: ${topThree[0].xp}\n2. ${topThree[1].name} Level: ${topThree[1].level} XP: ${topThree[1].xp}\n3. ${topThree[2].name} Level: ${topThree[2].level} XP: ${topThree[2].xp}\n4. ${topThree[3].name} Level: ${topThree[3].level} XP: ${topThree[3].xp}\n5. ${topThree[4].name} Level: ${topThree[4].level} XP: ${topThree[4].xp}`);
        

           if(userData.length < 5){

            const embed2 = new Discord.MessageEmbed()
            .setColor(0xff0000)
            .setDescription(`We have encountered problems with the leaderboard command when having less than 5 people.\nFor that reason this action has been aborted.`);
        
            message.channel.send(embed2);
           

            }

        const entirething = userData.sort(sortData)

        let fulldesc;

        let fulldesc_num = 0;

        entirething.forEach(element => {
            
            fulldesc_num++;

            fulldesc = fulldesc + `\n${fulldesc_num}. ${element.name} Level: ${element.level} XP: ${element.xp} (${element.id})` 

        });

        const embed2 = new Discord.MessageEmbed()
            .setColor(0x7289da)
            .setDescription(fulldesc.replace("undefined", ""));

        if(args[0] == "all") {
            message.channel.send(embed2)
        }else {
            message.channel.send(embed);
        }

            let channel = message.guild.channels.cache.get(serverconfig.lbchannel)
            let lb_msg = await channel.messages.fetch(serverconfig.lbmsg)
            lb_msg.edit(embed)
            

    }
}