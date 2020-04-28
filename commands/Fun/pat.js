//Requiring discord.js
const Discord = require('discord.js');

//Requiring colors.json
const colors = require("../../json/colors.json")

module.exports.run = async (bot, message, args) => {

    //Creating array of gifs
    var gifs = [
        "https://media1.tenor.com/images/1e92c03121c0bd6688d17eef8d275ea7/tenor.gif?itemid=9920853",
        "https://gifimage.net/wp-content/uploads/2017/09/anime-head-pat-gif-4.gif",
        "https://66.media.tumblr.com/a72dd82535f3e7accd827c202dacc09a/tumblr_pfyiqz0pFL1th206io1_640.gif",
        "https://i.imgur.com/d9CH89Q.gif",
        "https://media1.tenor.com/images/6151c42c94df654b1c7de2fdebaa6bd1/tenor.gif?itemid=16456868"
    ]

    //Choosing random gif
    const randomGif = gifs[Math.floor(Math.random() * gifs.length)];

    //Creating embed
    let embed = new Discord.MessageEmbed();
    embed.setColor(colors.aqua)
    embed.setTitle()
    embed.setImage(randomGif);
    embed.setTimestamp();

    //Checking if user has tagged someone
    if (args[0]) {
        let user = message.mentions.members.first();
        //if user has tagged himself
        if (user.id === message.author.id) {
            embed.setTitle(`${message.author.username} wants a pat`);
            //user has tagged someone else
        } else {
            embed.setTitle(`${message.author.username} pats ${bot.users.cache.get(user.id).username}`);
        }
        //user hasnt tagged anyone
    } else {
        embed.setTitle(`${bot.user.username} pats ${message.author.username}`);
    }

    //sending embed
    message.channel.send(embed)


}

module.exports.help = {
    name: "pat",
    aliases: [],
    description: "Pat someone",
    noaliases: "None",
    accessability: "Everyone"
}
