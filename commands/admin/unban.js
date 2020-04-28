const Discord = require('discord.js');
const color = require('../../json/colors.json')

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission(["BAN_MEMBERS"])) return message.reply("You don't have enough permissions!");

    if (isNaN(args[0])) return message.channel.send("You need to provide an ID.")
    let bannedMember = await bot.fetchUser(args[0])
    if (!bannedMember) return message.channel.send("Please provide a user id to unban someone!")
    if (bannedMember.id === message.author.id) return message.reply("You can't use this command on yourself.")
    if (bannedMember.id === "694857173595062354") return message.reply("You can't use this command on bot.");

    let reason = args.slice(1).join(" ");
    if (!reason) reason = "No reason given."

    try {
        message.guild.unban(bannedMember, reason)
    } catch (e) {
        console.log(e.message)
    }

    let embed = new Discord.MessageEmbed()
        .setTitle("You've been unbanned")
        .setAuthor(bot.user.username, bot.user.avatarURL())
        .setDescription(`**You've been unbanned in:** ${message.guild.name}\n**Reason**: ${reason}\n**By:** ${message.author.tag}\n**Date:** ${message.createdAt.toLocaleString()}`)
        .setTimestamp()
        .setThumbnail(unmutee.user.avatarURL())
        .setColor(color.darkred);
    banMember.send(embed)
    if (message.guild.id === "703661705997189200") {
        let mutechannel = message.guild.channels.cache.find(ch => ch.name === "mutes")

        let embed2 = new Discord.MessageEmbed()
            .setTitle(`${unmutee.user.tag} was unbaned!`)
            .setAuthor(bot.user.username, bot.user.avatarURL())
            .setDescription(`**Unbanned by:** ${message.author.tag}\n ** Reason **: ${reason}\n ** By:** ${message.author.username}\n ** Date:** ${message.createdAt.toLocaleString()}`)
            .setTimestamp()
            .setThumbnail(unmutee.user.avatarURL())
            .setColor(color.lightgreen);

        mutechannel.send(embed2)
    }
}
module.exports.help = {
    name: 'softban',
    aliases: [],
    description: "Softban user!",
    noaliases: "None",
    accessability: "Admin/Moderators"
}