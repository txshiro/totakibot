const Discord = require('discord.js');
const package = require("../../package.json")
const color = require("../../json/colors.json")


module.exports.run = async (bot, message, args) => {


    let embed = new Discord.MessageEmbed()
        .setAuthor(message.author.username, message.author.avatarURL())
        .addField("👨 Created by", "txshiro#0612")
        .addField("📁 Total Servers", bot.guilds.cache.size)
        .addField("📦 Node", `Version: ${process.version}`)
        .addField("📚 Library", `Discord.js v${package.dependencies["discord.js"]}`)
        .setFooter("tk!help for commands!", bot.user.avatarURL())
        .setColor(color.blueviolet)
        .setThumbnail(bot.user.avatarURL())
        .setTimestamp();



    message.channel.send(embed)
}

module.exports.help = {
    name: 'info',
    aliases: [],
    description: "Info about bot!",
    noaliases: "None",
    accessability: "Everyone"
}