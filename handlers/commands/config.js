const Discord = require('discord.js');
const configs = require('../../conf/config.json');
const colors = require('../../conf/colors.json');
const fs = require('fs');

module.exports = {
    name: 'config',
    async execute(message, args, client) {

        if (message.member.hasPermission("ADMINISTRATOR")) {

            delete require.cache[require.resolve(`../../Servers/${message.guild.id}/config.json`)];

            let serverconfig = require(`../../Servers/${message.guild.id}/config.json`)

            if (args[0] == "moderation") {

                if (args[1] != "enable" || args[1] != "disable") {
                    const embed = new Discord.MessageEmbed()
                        .setColor(0xff0000)
                        .setDescription(`Missing argument: \`enable, disable\``);

                    message.channel.send(embed);
                }

                if (args[1] == "enable") {

                    let content = JSON.parse(fs.readFileSync(`./Servers/${message.guild.id}/config.json`, 'utf8'));

                    content.moderation = true

                    fs.writeFileSync(`./Servers/${message.guild.id}/config.json`, JSON.stringify(content));

                    const embed = new Discord.MessageEmbed()
                        .setColor(0x7289da)
                        .setDescription(`Moderation: \`[ENABLED]\``);

                    message.channel.send(embed)

                }
                if (args[1] == "disable") {
                    let content = JSON.parse(fs.readFileSync(`./Servers/${message.guild.id}/config.json`, 'utf8'));

                    content.moderation = false

                    fs.writeFileSync(`./Servers/${message.guild.id}/config.json`, JSON.stringify(content));

                    const embed = new Discord.MessageEmbed()
                        .setColor(0x7289da)
                        .setDescription(`Moderation: \`[ENABLED]\``);

                    message.channel.send(embed)

                }

            }

            if (args[0] == "leaderboard") {

                if (args[1] != "enable" || args[1] != "disable") {

                }

                if (args[1] == "enable") {

                    if(args[2] == "levelup") {
                        
                        let content = JSON.parse(fs.readFileSync(`./Servers/${message.guild.id}/config.json`, 'utf8'));
                        
                        content.levelup = true;

                        fs.writeFileSync(`./Servers/${message.guild.id}/config.json`, JSON.stringify(content));

                        const embed = new Discord.MessageEmbed()
                            .setColor(0x7289da)
                            .setDescription(`Leaderboard: \`[ENABLED]\`\nLevel UP: \`[ENABLED]\`\n Leaderboard Channel: ${content.lbchannel}\nLeaderboard Message: ${content.lbmsg}`);

                        message.channel.send(embed)

                    }

                    if (args[2] == "confirm") {

                        let lbmsge;

                        if (args[3]) {

                            let channel = message.guild.channels.cache.get(args[3])
                            let msg = await channel.send(`Leaderboard, refresh with \`${configs.prefix}leaderboard\``)

                            lbmsge = msg.id;

                        }

                        let content = JSON.parse(fs.readFileSync(`./Servers/${message.guild.id}/config.json`, 'utf8'));

                        content.leaderboard = true
                        content.lbchannel = args[3]
                        content.lbmsg = lbmsge

                        fs.writeFileSync(`./Servers/${message.guild.id}/config.json`, JSON.stringify(content));

                        const embed = new Discord.MessageEmbed()
                            .setColor(0x7289da)
                            .setDescription(`Leaderboard: \`[ENABLED]\`\nLeaderboard Channel: ${args[3]}\nLeaderboard Message: ${lbmsge}`);

                        message.channel.send(embed)

                    }
                    if (args[2] != "confirm"  || args[2] != "levelup") {
                        const embed = new Discord.MessageEmbed()
                            .setColor(0x7289da)
                            .setDescription(`To enable Leveling type \`${configs.prefix}config leveling confirm channelid (optional) \` Or to enable levelup messages: \`To disable all of Leveling / Leadeboard\nRun \`vconfig enable levelup\`\``);

                        message.channel.send(embed)
                    }


                }

                if (args[1] == "disable") {

                    const embed = new Discord.MessageEmbed()
                            .setColor(0x7289da)
                            .setDescription(`To disable all of Leveling / Leadeboard\nRun \`vconfig disable confirm\`\n To disable all of Level UP messages \nRun \`vconfig disable levelup\``);

                        message.channel.send(embed)

                    if(args[2] == "levelup") {
                        
                        let content = JSON.parse(fs.readFileSync(`./Servers/${message.guild.id}/config.json`, 'utf8'));
                        
                        content.levelup = false;

                        fs.writeFileSync(`./Servers/${message.guild.id}/config.json`, JSON.stringify(content));

                        const embed = new Discord.MessageEmbed()
                            .setColor(0x7289da)
                            .setDescription(`Leaderboard: \`[ENABLED]\`\nLevel UP: \`[DISABLED]\`\n Leaderboard Channel: ${content.lbchannel}\nLeaderboard Message: ${content.lbmsg}`);

                        message.channel.send(embed)

                    }

                    if(args[2] == "confirm") {
                    let content = JSON.parse(fs.readFileSync(`./Servers/${message.guild.id}/config.json`, 'utf8'));

                    content.leaderboard = false

                    fs.writeFileSync(`./Servers/${message.guild.id}/config.json`, JSON.stringify(content));

                    const embed = new Discord.MessageEmbed()
                            .setColor(0x7289da)
                            .setDescription(`Leaderboard: \`[DISABLED]\``);

                        message.channel.send(embed)
                    }
                }

            }

            if (!args[0]) {

                let leaderboardinfo = "";
                let moderationinfo = "";
                let ahhyes = "";

                if (serverconfig.leaderboard == false) {

                    leaderboardinfo = `Leaderboard: \`[DISABLED]\`\nRun \`${configs.prefix}config leaderboard\``

                }

                if(serverconfig.levelup == true) {
                    ahhyes = "ENABLED"
                }

                if(serverconfig.levelup == false) {
                    ahhyes = "DISABLED"
                }

                if (serverconfig.leaderboard == true) {

                    leaderboardinfo = `Leaderboard: \`[ENABLED]\`\nLeaderboard Channel: ${serverconfig.lbchannel}\nLeaderboard Message: ${serverconfig.lbmsg}\nLevel UP: ${ahhyes}\nRun \`${configs.prefix}config leaderboard\``

                }

                if (serverconfig.moderation == false) {

                    moderationinfo = `Moderation: \`[DISABLED]\`\nRun \`${configs.prefix}config moderation\``

                }

                if (serverconfig.moderation == true) {

                    moderationinfo = `Moderation: \`[ENABLED]\`\nRun \`${configs.prefix}config moderation\``

                }

                const embed = new Discord.MessageEmbed()
                    .setColor(0x7289da)
                    .setDescription(`${leaderboardinfo}\n${moderationinfo}`)
                    .setFooter("To enable Level UP messages run: vconfig leaderboard enable levelup")
                    ;

                message.channel.send(embed)

            }


        } else {
            const embed = new Discord.MessageEmbed()
                .setColor(0xff0000)
                .setDescription(`Missing permission: \`ADMINISTRATOR\``);

            message.channel.send(embed);
        }
    }
}