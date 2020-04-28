const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {

    message.channel.send("Pong").then(m => {
        let ping = m.createdTimestamp - message.createdTimestamp

        m.edit(`My system is ${ping}ms slow.`)
    })
}

module.exports.help = {
    name: 'ping',
    aliases: [],
    description: "Check bot latency!",
    noaliases: "None",
    accessability: "Everyone"
}