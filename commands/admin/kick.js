const Discord = require('discord.js');
const color = require('../../json/colors.json');

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("You don't have enough permissions!");

    let kickMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!kickMember) return message.reply("You need to specify a user!");

    if (kickMember.id === message.author.id) return message.reply("You can't kick yourself");

    let reason = args.slice(1).join(" ");
    if (!reason) reason = "No reason given."


    let embed = new Discord.MessageEmbed()
        .setTitle("You've been kicked")
        .setAuthor(bot.user.username, bot.user.avatarURL())
        .setDescription(`**You've been kicked from:** ${message.guild.name}\n**Reason**: ${reason}\n**By:** ${message.author.tag}\n**Date:** ${message.createdAt.toLocaleString()}`)
        .setThumbnail(kickMember.user.avatarURL())
        .setTimestamp()
        .setColor(color.red);
    kickMember.send(embed).then(() => kickMember.kick()).catch(err => console.log(err))

    if (message.guild.id === "703661705997189200") {
        let mutechannel = message.guild.channels.cache.find(ch => ch.name === "mod-logs")
        if (!mutechannel) return message.reply("Please create a channel named `mod-logs` If you want to send a log.")


        let embed2 = new Discord.MessageEmbed()
            .setTitle(`${kickMember.user.tag} was kicked!`)
            .setAuthor(bot.user.username, bot.user.avatarURL())
            .setThumbnail(kickMember.user.avatarURL())
            .setDescription(`** Kicked by:** ${message.author.tag}\n ** Reason **: ${reason}\n ** By:** ${message.author.tag}\n ** Date:** ${message.createdAt.toLocaleString()}`)
            .setTimestamp()
            .setColor(color.red);

        mutechannel.send(embed2)
    }
}

module.exports.help = {
    name: 'kick',
    aliases: [],
    description: "Kick user!",
    noaliases: "None",
    accessability: "Admin/Moderators"
}