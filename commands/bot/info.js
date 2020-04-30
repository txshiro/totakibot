const Discord = require('discord.js');
const package = require("../../package.json")
const color = require("../../json/colors.json")
const read = require('fs-readdir-recursive');
const { readdirSync } = require('fs')

module.exports.run = async (bot, message, args) => {

    function duration(ms) {
        const sec = Math.floor((ms / 1000) % 60).toString()
        const min = Math.floor((ms / (1000 * 60)) % 60).toString()
        const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString()
        const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString()
        return `${days.padStart(1, '0')} days, ${hrs.padStart(2, '0')} hours, ${min.padStart(2, '0')} minutes, ${sec.padStart(2, '0')} seconds.`
    }

    message.channel.send("Getting info...").then(m => {
        let ping = m.createdTimestamp - message.createdTimestamp

        let embed = new Discord.MessageEmbed()
            .setAuthor(message.author.username, message.author.avatarURL())
            .addField("👨 Created by", "txshiro#0612")
            .addField("📁 Total Servers", bot.guilds.cache.size)
            .addField("📦 Node", `Version: ${process.version}`)
            .addField("📚 Library", `Discord.js: v${package.dependencies["discord.js"].substr(1)}`)
            .addField("💽 Memory", `${(Math.round(parseFloat(process.memoryUsage().heapUsed / 1024 / 1024)))}%`)
            .addField("🤖 Commands Count", '31')
            .addField("🏓 Ping", `${ping}ms`)
            .addField("🕒 Uptime", duration(bot.uptime))
            .addField("🎀 Support Server", "[Join here :)](https://discord.gg/9Rp6JkV)")
            .setFooter("tk!help for commands!", bot.user.avatarURL())
            .setColor(color.blueviolet)
            .setThumbnail(bot.user.avatarURL())
            .setTimestamp();
        m.edit(embed)
    })

}

module.exports.help = {
    name: 'info',
    aliases: [],
    description: "Info about bot!",
    noaliases: "None",
    accessability: "Everyone"
}