//Requiring discord.js
const Discord = require('discord.js');

//Requiring colors.json
const colors = require("../../json/colors.json")

module.exports.run = async (bot, message, args) => {
    //Creating array of gifs
    var gifs = [
        "https://i.pinimg.com/originals/85/dc/ef/85dcef131af84b515106955e142df54e.gif",
        "https://media.tenor.com/images/aab83bd3725feeaccb9929f8ca964db9/tenor.gif",
        "https://i.pinimg.com/originals/03/14/11/0314113c8ed42b1faf18adcaff95b05e.gif",
        "https://i.imgur.com/VgP2ONn.gif",
        "https://cdn.lowgif.com/medium/d26c65f2d66be540-merriberri-graphic-arts-services-requests.gif"
    ]

    //Picking random gif
    const randomGif = gifs[Math.floor(Math.random() * gifs.length)];

    //Creating Embed
    let embed = new Discord.MessageEmbed();
    embed.setColor(colors.aqua)
    embed.setTitle()
    embed.setImage(randomGif);
    embed.setTimestamp();

    //if user has tagged anyone
    if (args[0]) {
        let user = message.mentions.members.first();
        //if user wants to hug himself
        if (user.id === message.author.id) {
            embed.setTitle(`${message.author.username} wants a hug`);
            //if user has tagged someone
        } else {
            embed.setTitle(`${message.author.username} hugs ${bot.users.cache.get(user.id).username}`);
        }
        //If user hasnt tag anyone
    } else {
        embed.setTitle(`${bot.user.username} hugs ${message.author.username}`);
    }

    //send the message
    message.channel.send(embed)


}

module.exports.help = {
    name: "hug",
    aliases: [],
    description: "Hug someone.",
    noaliases: "None",
    accessability: "Everyone"
}
