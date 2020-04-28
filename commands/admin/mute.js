const Discord = require('discord.js');
const color = require('../../json/colors.json')

module.exports.run = async (bot, message, args) => {

    if (!message.author.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.reply("You don't have enough permissions!");

    let mutee = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!mutee) return message.reply("You need to specify a user!")
    if (mutee.id === message.author.id) return message.reply("You can't mute yourself")
    if (mutee.id === "694857173595062354") return message.reply("You can't be muted by mere human.");

    let reason = args.slice(1).join(" ");
    if (!reason) reason = "No reason given"

    let muterole = message.guild.roles.find(r => r.name === "Muted");
    if (!muterole) {
        try {
            muterole = await message.guild.createRole({
                name: "Muted",
                color: color.grey,
                permissions: []
            })
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false,
                    SEND_TTS_MESSAGES: false,
                    ATTACH_FILES: false,
                    SPEAK: false
                })
                message.channel.send("Created mute role.")
            })
        } catch (e) {
            console.log(e.stack)
        }
    }

    mutee.roles.add(muterole.id).then(() => {
        message.delete()
        mutee.send(`You've been muted in ${message.guild.name} for: ${reason}`)
        message.channel.send(`${mutee.user.username} was muted.`)
    })
}
module.exports.help = {
    name: 'mute',
    aliases: [],
    description: "Mute user!",
    noaliases: "None",
    accessability: "Admin/Moderators    "
}