const Discord = require('discord.js');
const configs = require('../../conf/config.json');
const colors = require('../../conf/colors.json');

module.exports = {
    name: 'eval',
    async execute(message, args, client) {

        if(message.author.id == "571362310778781697") {
            let ok = args.join(" ")

            message.channel.send("Evaluated: "+eval(ok))

        }

    }
}

// 