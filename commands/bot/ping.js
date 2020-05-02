const Discord = require('discord.js');
const color = require('../../json/colors.json')

module.exports.run = async (bot, message, args) => {

    message.channel.send("Getting latencies...").then(m => {
        let ping = m.createdTimestamp - message.createdTimestamp

        let embed = new Discord.MessageEmbed()
            .setTitle("🏓 Pong!")
            .addField("🤖 System Latency", `${ping}ms`)
            .addField("⚙️ API Latency", `${Math.round(bot.ws.ping)}ms`)
            .setColor(color.lightyellow)
            .setTimestamp()
            .setFooter("tk!help for commands!", bot.user.avatarURL())

        m.edit(embed)
    })
}

module.exports.help = {
    name: 'ping',
    aliases: [],
    description: "Check bot latency!",
    noaliases: "None",
    accessability: "Everyone"
}