const Discord = require('discord.js');

const colors = require('../../json/colors.json')

module.exports.run = async (bot, message, args) => {
    let Emojis = "";
    let EmojisAnimated = "";
    let EmojiCount = 0;
    let Animated = 0;
    let OverallEmojis = 0;

    function Emoji(id) {
        return bot.emojis.cache.get(id).toString()
    }
    message.guild.emojis.cache.forEach(emoji => {
        OverallEmojis++;
        if (emoji.animated) {
            Animated++;
            EmojisAnimated += Emoji(emoji.id)
        } else {
            EmojiCount++;
            Emojis += Emoji(emoji.id)
        }
    })


    let embed = new Discord.MessageEmbed()
        .setAuthor(message.guild.name, message.guild.iconURL())
        .setTitle("Emojis")
        .addField(`<a:peepoJAM:585829015449763880> Animated ${Animated}`, EmojisAnimated)
        .addField(`<:peepoShy:704281248855621684> Standard ${EmojiCount}`, Emojis)
        .addField("Total emojis", OverallEmojis)
        .setColor(colors.yellow)
        .setTimestamp()
        .setFooter("tk!help for commands", bot.user.avatarURL());
    message.channel.send(embed);


}

module.exports.help = {
    name: 'emojis',
    aliases: [],
    description: "Show all server emojis!",
    noaliases: "None",
    accessability: "Everyone"
}