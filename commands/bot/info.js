const Discord = require('discord.js');
const package = require("../../package.json")
const color = require("../../json/colors.json")
const read = require('fs-readdir-recursive');


const files = read('../../commands');
files.forEach(file => {
    let cmd = file.replace('.js', '.js');
    let props = require(`./commands/${cmd}`);

    console.log(props.length)

});

module.exports.run = async (bot, message, args) => {

    let embed = new Discord.MessageEmbed()
        .setAuthor(message.author.username, message.author.avatarURL())
        .addField("👨 Created by", "txshiro#0612")
        .addField("📁 Total Servers", bot.guilds.cache.size)
        .addField("📦 Node", `Version: ${process.version}`)
        .addField("📚 Library", `Discord.js: v${package.dependencies["discord.js"].substr(1)}`)
        .addField("💽 Memory", `${(parseInt(process.memoryUsage().heapUsed / 1024 / 1024))} / ${parseInt(process.memoryUsage().heapTotal / 1024 / 1024)}`)
        .addField("Commands Count", props.length)
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