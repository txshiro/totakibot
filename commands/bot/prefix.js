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
    let prefix = prefixes[message.guild.id].prefix;

    let embed = new Discord.MessageEmbed()
        .setTitle("Prefix Info")
        .setColor(color.pink)
        .setDescription(`**Your current prefix is:** ${prefixes[message.guild.id]}\n${prefixes[message.guild.id]}setprefix if you want to change prefix!`)
        .setTimestamp()
        .setFooter(`${prefixes[message.guild.id]}help for commands`);

    message.channel.send(embed)
}

module.exports.help = {
    name: 'prefix',
    aliases: [],
    description: "View current prefix",
    noaliases: "",
    accessability: "Everybody"
}