const Discord = require('discord.js');
const colors = require("../../json/colors.json")

module.exports.run = async (bot, message, args) => {
    var gifs = [
        "https://media.tenor.com/images/6870fd2f3f7be6bc6f08083a899c4889/tenor.gif",
        "https://media.giphy.com/media/VUC9YdLSnKuJy/giphy.gif",
        "https://i.pinimg.com/originals/40/66/a5/4066a57e49c748d90330db89c15af609.gif",
        "https://thumbs.gfycat.com/LikableYellowGander-size_restricted.gif",
        "https://i0.wp.com/drunkenanimeblog.com/wp-content/uploads/2018/06/anime-wave-gif.gif?resize=620%2C345&ssl=1"
    ]

    const randomGif = gifs[Math.floor(Math.random() * gifs.length)];

    let embed = new Discord.MessageEmbed();
    embed.setColor(colors.aqua)
    embed.setTitle()
    embed.setImage(randomGif);
    embed.setTimestamp();

    if (args[0]) {
        let user = message.mentions.members.first();
        if (user.id === message.author.id) {
            embed.setTitle(`${message.author.username} wants to be waved at`);
        } else {
            embed.setTitle(`${message.author.username} waves at ${bot.users.cache.get(user.id).username}`);
        }
    } else {
        embed.setTitle(`${bot.user.username} waves at ${message.author.username}`);
    }

    message.channel.send(embed)


}

module.exports.help = {
    name: "wave",
    aliases: [],
    description: "Wavve at someone.",
    noaliases: "None",
    accessability: "Everyone"
}
