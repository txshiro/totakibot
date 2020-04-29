const Discord = require('discord.js');
const color = require('../../json/colors.json')
const ms = require('ms');


module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission(["MANAGE_ROLES", "MUTE_MEMBERS"])) return message.reply("You don't have enough permissions!");

    let mutee = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!mutee) return message.reply("You need to specify a user!")
    if (mutee.id === message.author.id) return message.reply("You can't mute yourself.")
    if (mutee.id === "694857173595062354") return message.reply("I can't be muted by mere human.");

    let time = args[2]

    let reason = args.slice(1).join(" ");
    if (!reason) reason = "No reason given."
    if (!reason) time = args[1]

    let muterole = message.guild.roles.cache.find(r => r.name === "Muted");
    if (!muterole) return message.channel.send("You need to create `Muted` role first.")

    if (mutee.roles.cache.find(r => r.name === "Muted")) return message.channel.send("That person is already muted")

    if (!time) return message.reply("Please specify a time.")

    mutee.roles.add(muterole.id).then(() => {
        let embed = new Discord.MessageEmbed()
            .setTitle("You've been muted")
            .setAuthor(bot.user.username, bot.user.avatarURL())
            .setThumbnail(mutee.user.avatarURL())
            .setDescription(`**You've been muted in:** ${message.guild.name}\n**Reason:** ${reason}\n**For:** Not specified\n**By:** ${message.author.tag}\n**Date:** ${message.createdAt.toLocaleString()}`)
            .setTimestamp()
            .setColor(color.red);
        mutee.send(embed);

        let mutechannel = message.guild.channels.cache.find(ch => ch.name === "mod-logs")
        if (!mutechannel) return message.reply("Person was succesfully muted. Please create a channel named `mod-logs` If you want to send a log.")


        let embed2 = new Discord.MessageEmbed()
            .setTitle(`${mutee.user.tag} was muted!`)
            .setThumbnail(mutee.user.avatarURL())
            .setAuthor(bot.user.username, bot.user.avatarURL())
            .setDescription(`** Muted by:** ${message.author.tag}\n**For:** ${time}\n** Reason **: ${reason}\n ** Date:** ${message.createdAt.toLocaleString()}`)
            .setTimestamp()
            .setColor(color.red);

        mutechannel.send(embed2)

        if (time) {
            let mutechannel = message.guild.channels.cache.find(ch => ch.name === "mod-logs")
            if (!mutechannel) return message.reply(`Person was succesfully muted for ${time}. Please create a channel named 'mod-logs' If you want to send a log.`)
            setTimeout(function () {
                mutee.roles.remove(muterole.id).then(() => {

                    let embed4 = new Discord.MessageEmbed()
                        .setTitle("You've been automatically unmuted")
                        .setAuthor(bot.user.username, bot.user.avatarURL())
                        .setThumbnail(mutee.user.avatarURL())
                        .setDescription(`** You've been unmuted in:** ${message.guild.name}\n**Reason:** ${reason}\n**For:** ${time}\n**By:** ${message.author.tag}\n**Date:** ${message.createdAt.toLocaleString()}`)
                        .setTimestamp()
                        .setColor(color.green);
                    mutee.send(embed4)

                    let mutechannel = message.guild.channels.cache.find(ch => ch.name === "mod-logs")
                    let embed3 = new Discord.MessageEmbed()
                        .setTitle(`${mutee.user.tag} was unmuted!`)
                        .setThumbnail(mutee.user.avatarURL())
                        .setAuthor(bot.user.username, bot.user.avatarURL())
                        .setDescription(`** Muted by:** ${message.author.tag}\n ** Reason **: ${reason}\n ** Date:** ${message.createdAt.toLocaleString()}`)
                        .setTimestamp()
                        .setColor(color.green);
                    mutechannel.send(embed3);
                })
            }, ms(time));
        }
    })

}
module.exports.help = {
    name: 'mute',
    aliases: [],
    description: "Mute user!",
    noaliases: "None",
    accessability: "Admin/Moderators    "
}