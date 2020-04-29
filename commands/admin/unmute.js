const Discord = require('discord.js');
const color = require('../../json/colors.json')

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission(["MANAGE_ROLES", "MUTE_MEMBERS"])) return message.reply("You don't have enough permissions!");

    let unmutee = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!unmutee) return message.reply("You need to specify a user!")
    if (unmutee.id === message.author.id) return message.reply("You can't use this command on yourself.")
    if (unmutee.id === "694857173595062354") return message.reply("You can't use this command on bot.");
    let kickMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (kickMember) return message.reply("This user isn't banned")


    let reason = args.slice(1).join(" ");
    if (!reason) reason = "No reason given."

    let unmuterole = message.guild.roles.cache.find(r => r.name === "Muted");
    if (!unmutee.roles.cache.find(r => r.name === "Muted")) return message.channel.send("That person isn't muted")

    unmutee.roles.remove(unmuterole.id).then(() => {
        let embed = new Discord.MessageEmbed()
            .setTitle("You've been unmuted")
            .setAuthor(bot.user.username, bot.user.avatarURL())
            .setDescription(`**You've been unmuted in:** ${message.guild.name}\n**Reason**: ${reason}\n**By:** ${message.author.tag}\n**Date:** ${message.createdAt.toLocaleString()}`)
            .setTimestamp()
            .setThumbnail(unmutee.user.avatarURL())
            .setColor(color.lightgreen);
        unmutee.send(embed)
        let mutechannel = message.guild.channels.cache.find(ch => ch.name === "mod-logs")
        if (!mutechannel) return message.reply("Please create a channel named `mod-logs` If you want to send a log.")

        let embed2 = new Discord.MessageEmbed()
            .setTitle(`${unmutee.user.tag} was unmuted!`)
            .setAuthor(bot.user.username, bot.user.avatarURL())
            .setDescription(`** Unmuted by:** ${message.author.tag}\n ** Reason **: ${reason}\n ** By:** ${message.author.username}\n ** Date:** ${message.createdAt.toLocaleString()}`)
            .setTimestamp()
            .setThumbnail(unmutee.user.avatarURL())
            .setColor(color.lightgreen);

        mutechannel.send(embed2)
    })
}
module.exports.help = {
    name: 'unmute',
    aliases: [],
    description: "Unmute user!",
    noaliases: "None",
    accessability: "Admin/Moderators"
}