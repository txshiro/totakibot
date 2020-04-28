const Discord = require('discord.js');
const color = require('../../json/colors.json')

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission(["MANAGE_ROLES", "MUTE_MEMBERS"])) return message.reply("You don't have enough permissions!");

    let unmutee = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!unmutee) return message.reply("You need to specify a user!")
    if (unmutee.id === message.author.id) return message.reply("You can't use this command on yourself.")
    if (unmutee.id === "694857173595062354") return message.reply("You can't use this command on bot.");

    let reason = args.slice(1).join(" ");
    if (!reason) reason = "No reason given."

    let unmuterole = message.guild.roles.cache.find(r => r.name === "Muted");
    if (unmutee.roles.has(unmuterole.id)) return message.channel.send("That person isn't muted")

    unmutee.roles.remove(unmuterole.id).then(() => {
        let embed = new Discord.MessageEmbed()
            .setTitle("You've been muted")
            .setAuthor(bot.user.username, bot.user.avatarURL())
            .setDescription(`**You've been unmuted in:** ${message.guild.name}\n**Reason**: ${reason}`)
            .setTimestamp()
            .setColor(color.green);
        unmutee.send(embed)
        if (message.guild.id === "703661705997189200") {
            let mutechannel = message.guild.channels.cache.find(ch => ch.name === "mutes")

            let embed2 = new Discord.MessageEmbed()
                .setTitle(`${mutee} was unmuted!`)
                .setAuthor(bot.user.username, bot.user.avatarURL())
                .setDescription(`**Unmuted by:** ${message.author.username}\n**Reason**: ${reason}`)
                .setTimestamp()
                .setColor(color.green);

            mutechannel.send(embed2)
        }
    })
}
module.exports.help = {
    name: 'unmute',
    aliases: [],
    description: "Unmute user!",
    noaliases: "None",
    accessability: "Admin/Moderators"
}