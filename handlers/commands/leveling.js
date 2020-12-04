const Discord = require('discord.js');
const configs = require('../../conf/config.json');
const colors = require('../../conf/colors.json');
const fs = require('fs');

module.exports = {
    name: 'leveling',
    async execute(message, args, client) {

        if(message.author.id == "571362310778781697") {

            if(args[0] == "fixlevels") {

                const userData = [];

                const keepedData = [];
                const deletedData = [];

                const dirFiles = await fs.promises.opendir(`./Servers/${message.guild.id}/leveling`); 
                
                for await (const file of dirFiles) {
                    if (file.isFile() && file.name.endsWith('.json')) {
                        const jsonFile = await fs.promises.readFile(`./Leveling/users/${file.name}`, 'utf-8'); // update path
                        userData.push(JSON.parse(jsonFile));
                    }
                }

                userData.forEach(element => {
                   
                    if(element.xp == 0&& element.level == 0) {
                        fs.unlink(`./Leveling/users/${element.id}`, function () {
                            deletedData.push(`${element.name} (${element.id})\n`)
                        })
                    } else {
                        keepedData.push(`${element.name} (${element.id})\n`)
                    }

                }); 

                const embed2 = new Discord.MessageEmbed()
            .setColor(0x7289da)
            .setDescription(`Keeped: \n${keepedData}\n Deleted: \n${deletedData}`);

            message.channel.send(embed2)

            }

            if(args[0] == "setlevel") {
                let content = JSON.parse(fs.readFileSync(`./Leveling/users/${args[1]}.json`, 'utf8'));

                content.level = args[2];
        
                let ree = "ree"
                fs.writeFileSync(`./Leveling/users/${args[1]}.json`, JSON.stringify(content));
                message.channel.send("Done.")
            }

            if(args[0] == "setxp") {
                let content = JSON.parse(fs.readFileSync(`./Leveling/users/${args[1]}.json`, 'utf8'));

        content.xp = args[2];

        let ree = "ree"
        fs.writeFileSync(`./Leveling/users/${args[1]}.json`, JSON.stringify(content));
            }

            if(args[0] == "delete") {
                fs.unlink(`./Leveling/users/${args[1]}`, function () {
                    message.channel.send("Done.")
                })

            }


        } else {
            
            const embed = new Discord.MessageEmbed()
            .setColor(0xff0000)
            .setDescription(`You cannot use this!`);
        
            message.channel.send(embed);

        }

    }
}