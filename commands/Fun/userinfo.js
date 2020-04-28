const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
    if (!args[0]) {
        var user = message.author;
    } else {
        var user = message.mentions.users.first() || bot.users.cache.get(args[0])
    }

    let uEmbed = new Discord.MessageEmbed()
        .setColor('f5f242')
        .setTitle("User info")
        .setThumbnail(message.guild.iconURL())
        .setAuthor(`${user.username} Info`, user.avatarURL())
        .addField("**Name:**", `${user.username}`, true)
        .addField("**Tag:**", `${user.discriminator}`, true)
        .addField("**ID:**", `${user.id}`, true)
        .addField("**Status:**", `${user.presence.status}`, true)
        .addField("**Created at:**", `${user.createdAt}`, true)
        .setFooter(bot.user.username, bot.user.avatarURL())
        .setTimestamp()
    return message.channel.send(uEmbed);
}

module.exports.help = {
    name: "userinfo",
    aliases: ["useri", "ui"],
    description: "Get your/someone profile info",
    noaliases: "ui, useri",
    accessability: "Everyone"
}
