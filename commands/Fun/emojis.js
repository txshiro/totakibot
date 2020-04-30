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

    message.channel.send(`**Animated (${Animated}):** ${EmojisAnimated}\n**Standard (${EmojiCount}):** ${Emojis}\n**Emoji Count:** ${OverallEmojis}`);


}

module.exports.help = {
    name: 'emojis',
    aliases: [],
    description: "Show all server emojis!",
    noaliases: "None",
    accessability: "Everyone"
}