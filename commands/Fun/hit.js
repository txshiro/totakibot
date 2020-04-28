//Requiring discord.js
const Discord = require('discord.js');

//Requiring colors.json
const colors = require("../../json/colors.json")

module.exports.run = async (bot, message, args) => {
    //Creating array of gifs
    var gifs = [
        "https://media1.tenor.com/images/347f852d3dfa48502406fa949fcc1449/tenor.gif?itemid=15150394",
        "https://media.tenor.com/images/a913f5b7e0059ebd8fe4df3efe65e92b/tenor.gif",
        "https://media1.tenor.com/images/f448f06f6674c95e298f68600d607fec/tenor.gif?itemid=12389656",
        "https://thumbs.gfycat.com/SpryPastelDrake-size_restricted.gif",
        "https://thumbs.gfycat.com/SpryPastelDrake-size_restricted.gif"
    ]

    //Picking random one
    const randomGif = gifs[Math.floor(Math.random() * gifs.length)];

    //Creating Embed
    let embed = new Discord.MessageEmbed();
    embed.setColor(colors.lightcoral)
    embed.setTitle()
    embed.setImage(randomGif);
    embed.setTimestamp();


    //Checking first argument
    if (args[0]) {
        //declaring user
        let user = message.mentions.members.first();
        //if user wants to hit himself
        if (user.id === message.author.id) {
            embed.setTitle(`${message.author.username} hits himself`);
            //if user wants to hit a bot Totaki
        } if (user.id === "694857173595062354") {
            return message.reply("Hurting bots isn't cool.")
            //if user has tagged someone
        } else {
            embed.setTitle(`${message.author.username} hits ${bot.users.cache.get(user.id).username}`);
        }
        //if user didnt tag someone
    } else {
        embed.setTitle(`${bot.user.username} hits ${message.author.username}`);
    }

    //sending the message
    message.channel.send(embed)


}

module.exports.help = {
    name: "hit",
    aliases: [],
    description: "Hit someone.",
    noaliases: "None",
    accessability: "Everyone"
}
