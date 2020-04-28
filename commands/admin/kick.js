const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("You don't have enough permissions!");

    let kickMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!kickMember) return message.reply("You need to specify a user!");

    if (kickMember.id === message.author.id) return message.reply("You can't kick yourself");

    let reason = args.slice(1).join(" ");
    if (!reason) reason = "No reason given."


    let embed = new Discord.MessageEmbed()
        .setTitle("You've been kick")
        .setAuthor(bot.user.username, bot.user.avatarURL())
        .setDescription(`**You've been kicked from:** ${message.guild.name}\n**Reason**: ${reason}\n**By:** ${message.author.username}\n**Date:** ${message.createdAt.toLocaleString()}`)
        .setThumbnail(kickMember.user.avatarURL())
        .setTimestamp()
        .setColor(color.red);
    kickMember.send(embed).then(() => kickMember.kick()).catch(err => console.log(err))

    if (message.guild.id === "703661705997189200") {
        let mutechannel = message.guild.channels.cache.find(ch => ch.name === "mutes")

        let embed2 = new Discord.MessageEmbed()
            .setTitle(`${kickMember.user.username} was kicked!`)
            .setAuthor(bot.user.username, bot.user.avatarURL())
            .setThumbnail(kickMember.user.avatarURL())
            .setDescription(`** Kicked by:** ${message.author.username}\n ** Reason **: ${reason}\n ** By:** ${message.author.username}\n ** Date:** ${message.createdAt.toLocaleString()}`)
            .setTimestamp()
            .setColor(color.green);

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