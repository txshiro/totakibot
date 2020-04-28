const Discord = require('discord.js');
const color = require('../../json/colors.json')

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission(["MANAGE_ROLES", "MUTE_MEMBERS"])) return message.reply("You don't have enough permissions!");

    let mutee = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!mutee) return message.reply("You need to specify a user!")
    if (mutee.id === message.author.id) return message.reply("You can't mute yourself.")
    if (mutee.id === "694857173595062354") return message.reply("I can't be muted by mere human.");

    let reason = args.slice(1).join(" ");
    if (!reason) reason = "No reason given."

    let muterole = message.guild.roles.cache.find(r => r.name === "Muted");
    if (!muterole) return message.channel.send("You need to create `Muted` role first.")

    mutee.roles.add(muterole.id).then(() => {
        message.delete()
        message.channel.send(`${mutee.username} you've been muted. Check your dm's for more info. `)
        let embed = new Discord.MessageEmbed()
            .setTitle("You've been muted")
            .setAuthor(bot.user.username, bot.user.avatarURL())
            .setDescription(`You've been muted in ${message.guild.name}\n**Reason**: ${reason}`)
            .setTimestamp()
        mutee.send(embed)
        if (message.guild.id === "703661705997189200") {
            let mutechannel = message.guild.channel.cache.find(ch => ch.name === "mutes")

            let embed2 = new Discord.MessageEmbed()
                .setTitle(`${mutee} was muted!`)
                .setAuthor(bot.user.username, bot.user.avatarURL())
                .setDescription(`Muted by ${message.author.username}\n**Reason**: ${reason}`)
                .setTimestamp()

            mutechannel.send(embed2)
        } else {
            console.log("yes")
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