const Discord = require('discord.js');
const configs = require('./conf/config.json');
const event_handler = require('./event');
const website = require('./website.js')

const invites = {};

const wait = require('util').promisify(setTimeout);

website.init();

const client = new Discord.Client();

event_handler.performEvents(client);

client.login(configs.token)