const Discord = require('discord.js');
const configs = require('../../conf/config.json');
const colors = require('../../conf/colors.json');

module.exports = {
    name: 'ban',
        async execute(message, args, client) {

            let serverconfig = require(`../../Servers/${message.guild.id}/config.json`)

        if(serverconfig.moderation != true) {
            return;
        }

        if(message.member.hasPermission("BAN_MEMBERS")) {
            let user =message.mentions.members.first() || message.client.members.fetch(args[0])
            args.shift();

            if(user) {

                let banreason = args.join(" ")

                try {

                const embed = new Discord.MessageEmbed()
                .setColor(0xff0000)
                .setDescription(`${user.user.username}#${user.user.discriminator} has been banned for \`${banreason}\``);

                const embed3 = new Discord.MessageEmbed()
                .setColor(0xff0000)
                .setDescription(`${user.user.username}#${user.user.discriminator} has been banned by ${message.author.username}#${message.author.discriminator} for \`${banreason}\``);

                const embed2 = new Discord.MessageEmbed()
                .setColor(0xff0000)
                .setDescription(`${user.user.username}#${user.user.discriminator} has been banned for \`${banreason}\``);

                const nonotify = new Discord.MessageEmbed()
                .setColor(0xff0000)
                .setDescription(`${user.user.username}#${user.user.discriminator} has been banned for \`${banreason}\` (user was not notified)`);
        
                // message.guild.channels.cache.get("774602807801413632").send(embed3)

                const msgree = await message.channel.send(embed2);

                user.send(embed).then (banned =>{
                    user.ban({days: 0, reason: `${banreason}`})
                })
                } catch (e) {
                    user.ban({days: 0, reason: `${banreason}`})
                    msgree.edit(nonotify)
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
            .setDescription(`Missing permission: \`BAN_MEMBERS\``);
        
            message.channel.send(embed);
        }

    }
}