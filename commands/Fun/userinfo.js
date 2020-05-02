const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
    if (!args[0]) {
        var user = message.author;
    } else {
        var user = message.mentions.users.first() || bot.users.cache.get(args[0])
    }

    function formatDate(date) {
        return new Intl.DateTimeFormat('sk-EU').format(date)
    }

    const joinedAt = formatDate(user.member.joinedAt)
    const createdAt = formatDate(user.createdAt)

    let uEmbed = new Discord.MessageEmbed()
        .setColor('f5f242')
        .setTitle("User info")
        .setThumbnail(user.avatarURL())
        .setAuthor(`${user.username} Info`, user.avatarURL())
        .addField("**Name:**", `${user.username}`)
        .addField("**Tag:**", `${user.discriminator}`)
        .addField("**ID:**", `${user.id}`, true)
        .addField("**Status:**", `${user.presence.status}`)
        .addField("**Created at:**", `${createdAt}`)
        .addField("**Joined at:**", joinedAt)
        .setFooter(bot.user.username, bot.user.avatarURL())
        .setTimestamp()

    if (user.presence.game)
        uEmbed.addField('Currently playing', user.presence.game.name);
    return message.channel.send(uEmbed);
}

module.exports.help = {
    name: "userinfo",
    aliases: ["useri", "ui"],
    description: "Get your/someone profile info",
    noaliases: "ui, useri",
    accessability: "Everyone"
}
