const Discord = require('discord.js');
const configs = require('../../conf/config.json');
const colors = require('../../conf/colors.json');

module.exports = {
    name: 'partner',
    async execute(message, args, client) {

        if(message.author.id == "571362310778781697") {
            message.channel.send("Send advertisement message:");
            message.channel.awaitMessages(m => m.author.id == message.author.id,
                {max: 1, time: 30000}).then(collected => {

                            let user = message.mentions.members.first()

                            const embed = new Discord.MessageEmbed()
                            .setColor(args[0])
                            .setAuthor(user.user.username + "#" + user.user.discriminator, user.user.avatarURL(), undefined)
                            .setDescription(collected.first())
        

                                message.guild.channels.cache.get("780117241026052186").send(embed)    
                }).catch((err) => {
                        message.reply("ERR: " + err);
                });

        }

    }
}