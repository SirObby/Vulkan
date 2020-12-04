const Discord = require('discord.js');
const configs = require('../../conf/config.json');
const command_handler = require('../../commands');
const fs = require('fs');
const fsP = require("fs").promises;
const request = require(`request`);

const path = require('path');
const levelinghandle = require('../../Servers/levelhandle.js')

let serverconfig
module.exports = {
    type: 'message',
    async run(client, message) {

      try {

      if(fs.existsSync(`./Servers/${message.guild.id}/config.json`)) {

      serverconfig = require(`../../Servers/${message.guild.id}/config.json`)

      }

      if (!fs.existsSync(`./Servers/${message.guild.id}/`)) {
      
        message.channel.send("We have just realised your server is **NOT** setup with **ANY** files with us. I have created the folder now to avoid errors with our system")
      
        fs.mkdir(`./Servers/${message.guild.id}/`, 0o777 , function(err) {
          console.log(err)
        });

        fs.mkdir(`./Servers/${message.guild.id}/users`, 0o777, function(err) {
          console.log(err)
        });

        fs.writeFile(`./Servers/${message.guild.id}/config.json`, `{ "leaderboard":false, "moderation": false, "lbchannel": 0, "lbmsg": 0, "leveling": false }`, function (err) {
          if (err) throw err;
          console.log('Saved!');
        });

      }
      
      if(serverconfig.leaderboard == true) {
        levelinghandle.exec(message, client);
      }

        if (message.author.bot) return;
        if (!message.content.startsWith(configs.prefix)) return;

        const args = message.content.slice(configs.prefix.length).split(' ');
        const commandName = args.shift().toLowerCase();

        command_handler.execute_command(commandName, message, args, client);

    
  } catch (e) {
    console.log(e)
  }
      }

    
}
