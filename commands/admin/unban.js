const Discord = require('discord.js');
const color = require('../../json/colors.json')

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission(["BAN_MEMBERS"])) return message.reply("You are missing this permission: 'BAN_MEMBERS'");

    if (isNaN(args[0])) return message.channel.send("You need to provide an ID.")
    let bannedMember = await bot.users.fetch(args[0])
    if (!bannedMember) return message.channel.send("Please provide a user id to unban someone!")
    if (bannedMember.id === message.author.id) return message.reply("You can't use this command on yourself.")
    if (bannedMember.id === "694857173595062354") return message.reply("You can't use this command on bot.");

    let reason = args.slice(1).join(" ");
    if (!reason) reason = "No reason given.";

    const banList = await message.guild.fetchBans();

    const bannedUser = banList.find(user => user.id === bannedMember.id);

    if (!bannedUser) return message.channel.send(`${bannedUser} is not banned.`);

    try {
        message.guild.members.unban(bannedMember, reason)
    } catch (e) {
        console.log(e.message)
    }


    let embed = new Discord.MessageEmbed()
        .setTitle("You've been unbanned")
        .setAuthor(bot.user.username, bot.user.avatarURL())
        .setDescription(`**You've been unbanned in:** ${message.guild.name}\n**Reason**: ${reason}\n**By:** ${message.author.tag}\n**Date:** ${message.createdAt.toLocaleString()}`)
        .setTimestamp()
        .setColor(color.lightgreen);
    bannedMember.send(embed)
    let mutechannel = message.guild.channels.cache.find(ch => ch.name === "mod-logs")
    if (!mutechannel) return message.reply("Person was succesfully unbanned. Please create a channel named `mod-logs` If you want to send a log.")

    let embed2 = new Discord.MessageEmbed()
        .setTitle(`${bannedMember.tag} has been unbanned!`)
        .setAuthor(bot.user.username, bot.user.avatarURL())
        .setDescription(`**Unbanned by:** ${message.author.tag}\n ** Reason **: ${reason}\n ** By:** ${message.author.username}\n ** Date:** ${message.createdAt.toLocaleString()}`)
        .setTimestamp()
        .setColor(color.lightgreen);

    mutechannel.send(embed2)
}
module.exports.help = {
    name: 'unban',
    aliases: [],
    description: "Unban user!",
    noaliases: "None",
    accessability: "Admin/Moderators"
}