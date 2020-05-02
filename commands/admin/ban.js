const Discord = require('discord.js');
const color = require('../../json/colors.json')

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission(["BAN_MEMBERS"])) return message.reply("You are missing this permission : `BAN_MEMBERS`");

    let banMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!banMember) return message.reply("You need to specify a user!")
    if (banMember.id === message.author.id) return message.reply("You can't use this command on yourself.")
    if (banMember.id === "694857173595062354") return message.reply("You can't use this command on bot.");

    if (!args[1]) return message.reply("Specify on how many days.")
    if (args[1] != Math.floor(args[1])) return message.reply("You can use only numbers");

    if (!args[2]) return message.reply("Please write `days` or `hours` or `minutes`")
    if (args[2] && args[2] !== "days" && args[2] !== "minutes" && args[2] !== "hours") return message.reply("You can use `days`, `hours` or `minutes`");

    var typeb = args[2]

    try {
        var tempb = parseInt(args[1])
    } catch{
        message.reply("You can only use whole numbers")
    };

    let reason = args.slice(2).join(" ");
    if (!reason) reason = "No reason given.";

    message.guild.members.ban(banMember, { typeb: tempb, reason: reason }).catch(err => console.log(err))


    let embed = new Discord.MessageEmbed()
        .setTitle("You've been banned")
        .setAuthor(bot.user.username, bot.user.avatarURL())
        .setDescription(`**You've been banned in:** ${message.guild.name}\n**Reason**: ${reason}\n**For:** ${tempb} ${typeb}\n**By:** ${message.author.tag}\n**Date:** ${message.createdAt.toLocaleString()}`)
        .setTimestamp()
        .setThumbnail(banMember.user.avatarURL())
        .setColor(color.darkred);
    banMember.send(embed)
    let mutechannel = message.guild.channels.cache.find(ch => ch.name === "mods-log")
    if (!mutechannel) return message.reply("Please create a channel named `mod-logs` If you want to send a log.")


    let embed2 = new Discord.MessageEmbed()
        .setTitle(`${banMember.user.tag} has been banned!`)
        .setAuthor(bot.user.username, bot.user.avatarURL())
        .setDescription(`** Banned by:** ${message.author.tag}\n ** Reason **: ${reason}\n**For:** ${tempb} ${typeb}\n ** By:** ${message.author.username}\n ** Date:** ${message.createdAt.toLocaleString()}`)
        .setTimestamp()
        .setThumbnail(banMember.user.avatarURL())
        .setColor(color.lightgreen);

    mutechannel.send(embed2)

}
module.exports.help = {
    name: 'ban',
    aliases: [],
    description: "Ban user!",
    noaliases: "None",
    accessability: "Admin/Moderators"
}