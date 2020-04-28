const Discord = require('discord.js');
var os = require('os');


module.exports.run = async (bot, message, args) => {


    let embed = new Discord.MessageEmbed()
        .setAuthor(message.author.username, message.author.avatarURL())
        .addField("📁 Total Servers")
        .addField("⚙️ Library", "Discord.js")
        .addField("CPU Usage", os.cpus())
        .addField(":inbox_tray: Version")
        .setFooter("tk!help for commands!", bot.user.avatarURL())
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