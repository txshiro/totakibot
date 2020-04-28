const Discord = require('discord.js');
const fs = require('fs');
const config = require("../../json/config.json")
const color = require("../../json/colors.json")

module.exports.run = async (bot, message, args) => {

    let prefixes = JSON.parse(fs.readFileSync("././json/prefixes.json", "utf8"));
    if (!prefixes[message.guild.id]) {
        prefixes[message.guild.id] = {
            prefix: config.prefix
        }
    }
    let prefix = prefix[message.guild.id].prefix;

    if (!message.member.hasPermission("MANAGE_GUILD")) return message.reply("You can't use this command!");

    if (!args[0]) return message.reply("Please enter a prefix!");

    prefixes[message.guild.id] = {
        prefix: args[0]
    }

    fs.writeFile("././json/prefixes.json", JSON.stringify(prefixes), (err) => {
        if (err) console.log(err)
    })

    let embed = new Discord.MessageEmbed()
        .setTitle("Prefix change")
        .setColor(color.springgreen)
        .setDescription(`**Your new prefix is:** ${args[0]}`)
        .setTimestamp()
        .setFooter(`${prefixes[message.guild.id].prefix}help for commands`)
}

module.exports.help = {
    name: 'setprefix',
    aliases: ['sp'],
    description: "Change current prefix",
    noaliases: "sp",
    accessability: "Admin/Moderators"
}