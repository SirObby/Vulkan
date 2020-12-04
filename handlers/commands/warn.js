const Discord = require('discord.js');
const configs = require('../../conf/config.json');
const colors = require('../../conf/colors.json');

module.exports = {
    name: 'warn',
        async execute(message, args, client) {

            let serverconfig = require(`../../Servers/${message.guild.id}/config.json`)

        if(serverconfig.moderation != true) {
            return;
        }

        if(message.member.hasPermission("KICK_MEMBERS")) {
            let user =message.mentions.members.first() || message.client.members.fetch(args[0])
            args.shift();

            if(user) {

                let banreason = args.join(" ")

                try {

                const embed = new Discord.MessageEmbed()
                .setColor(0xff0000)
                .setDescription(`${user.user.username}#${user.user.discriminator} has been warned for \`${banreason}\``);

                const embed3 = new Discord.MessageEmbed()
                .setColor(0xff0000)
                .setDescription(`${user.user.username}#${user.user.discriminator} has been warned by ${message.author.username}#${message.author.discriminator} for \`${banreason}\``);

                const embed2 = new Discord.MessageEmbed()
                .setColor(0xff0000)
                .setDescription(`${user.user.username}#${user.user.discriminator} has been warned for \`${banreason}\``);

                const nonotify = new Discord.MessageEmbed()
                .setColor(0xff0000)
                .setDescription(`${user.user.username}#${user.user.discriminator} has been warned for \`${banreason}\` (user was not notified)`);
        
                // message.guild.channels.cache.get("774602807801413632").send(embed3)

                const msgree = await message.channel.send(embed2);

                if (!fs.existsSync(`../../Servers/${message.guild.id}/warns/${user.user.id}.json`)) {
                    fs.writeFile(`./Servers/${message.guild.id}/warns/${message.author.id}.json`, `{ "warns": [] }`, function (err) {
                        if (err) throw err;
                        
                        let content = JSON.parse(fs.readFileSync(`./Servers/${message.guild.id}/warns/${user.user.id}.json`, 'utf8'));

                        let current_warns = content.warns;

                        current_warns = current_warns + `{ "type": "warn", "reason":"${banreason}", "moderator": "${message.author.username}#${message.author.discriminator}" }`

                        fs.writeFileSync(`./Servers/${message.guild.id}/warns/${user.user.id}.json`, JSON.stringify(content));

                      });
                }else {
    
                    let content = JSON.parse(fs.readFileSync(`./Servers/${message.guild.id}/warns/${user.user.id}.json`, 'utf8'));

                    let current_warns = content.warns;

                    current_warns = current_warns + `{ "type": "warn", "reason":"${banreason}", "moderator": "${message.author.username}#${message.author.discriminator}" }`

                    fs.writeFileSync(`./Servers/${message.guild.id}/warns/${user.user.id}.json`, JSON.stringify(content));

                }

                user.send(embed).then (banned =>{
                })
                } catch (e) {

                }

            } else {
                const embed = new Discord.MessageEmbed()
                .setColor(0xff0000)
                .setDescription(`User does not exist!`);
        
                message.channel.send(embed);
            }

        }else {
            const embed = new Discord.MessageEmbed()
            .setColor(0xff0000)
            .setDescription(`Missing permission: \`KICK_MEMBERS\``);
        
            message.channel.send(embed);
        }

    }
}