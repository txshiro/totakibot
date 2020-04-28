const Discord = require('discord.js');
const color = require('../../json/colors.json')

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission(["BAN_MEMBERS"])) return message.reply("You don't have enough permissions!");

    let banMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!banMember) return message.reply("You need to specify a user!")
    if (banMember.id === message.author.id) return message.reply("You can't use this command on yourself.")
    if (banMember.id === "694857173595062354") return message.reply("You can't use this command on bot.");

    if (!args[1]) return message.reply("Specify on how many days.")
    if (args[1] != Math.floor(args[1])) return message.reply("You can use only numbers");

    try {
        var tempb = parseInt(args[1])
    } catch{
        message.reply("You can only use whole numbers")
    };

    let reason = args.slice(2).join(" ");
    if (!reason) reason = "No reason given.";

    message.guild.members.ban(banMember, { days: tempb, reason: reason }).catch(err => console.log(err))


    let embed = new Discord.MessageEmbed()
        .setTitle("You've been banned")
        .setAuthor(bot.user.username, bot.user.avatarURL())
        .setDescription(`**You've been banned in:** ${message.guild.name}\n**Reason**: ${reason}\n**For:** ${tempb} days\n**By:** ${message.author.tag}\n**Date:** ${message.createdAt.toLocaleString()}`)
        .setTimestamp()
        .setThumbnail(banMember.user.avatarURL())
        .setColor(color.darkred);
    banMember.send(embed)
    if (message.guild.id === "703661705997189200") {
        let mutechannel = message.guild.channels.cache.find(ch => ch.name === "mutes")

        let embed2 = new Discord.MessageEmbed()
            .setTitle(`${banMember.user.tag} was baned!`)
            .setAuthor(bot.user.username, bot.user.avatarURL())
            .setDescription(`** Banned by:** ${message.author.tag}\n ** Reason **: ${reason}\n**For:** ${tempb}\n ** By:** ${message.author.username}\n ** Date:** ${message.createdAt.toLocaleString()}`)
            .setTimestamp()
            .setThumbnail(banMember.user.avatarURL())
            .setColor(color.lightgreen);

        mutechannel.send(embed2)
    }
}
module.exports.help = {
    name: 'ban',
    aliases: [],
    description: "Ban user!",
    noaliases: "None",
    accessability: "Admin/Moderators"
}