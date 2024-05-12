const { Client } = require('discord.js');
const { Application, utils } = require('handler.djs');

const client = new Client({
    intents: utils.Intents,
});

new Application(client, {
    commands: __dirname.concat('/client/commands'),
    events: __dirname.concat('/client/events'),
});

require('dotenv').config();
require('module-alias')();
client.Application.build();

client.login(process.env.DISCORD_TOKEN);