const Discord = require('discord.js');
const mongoose = require('mongoose');
const botconfig = require("../../json/botconfig.json")

//connect to databse
mongoose.connect(botconfig.mongoPass, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//modules
const Data = require("../../models/data.js")

module.exports.run = async (bot, message, args) => {

    if (message.mentions.members.first()) return message.reply("You can't tag anyone when using this command");


    Data.find({
        lb: "all"
    }).sort([
        ['money', 'descending']
    ]).exec((err, res) => {
        if (err) console.log(err);

        var page = Math.ceil(res.length / 10)

        let embed = new Discord.MessageEmbed();
        embed.setTitle("Leaderboard of rich people")
        embed.setThumbnail("https://steamcdn-a.akamaihd.net/steamcommunity/public/images/items/425220/444ad6c1332cfc69156de507641913459dfb6d28.png")
        embed.setTimestamp();
        embed.setColor('cf0cae')

        let pg = parseInt(args[0]);
        if (pg != Math.floor(pg)) pg = 1;
        if (!pg) pg = 1;
        let end = pg * 10;
        let start = (pg * 10) - 10;

        if (res.length === 0) {
            embed.addField("Error, no pages found")
        } else if (res.length <= start) {
            embed.addField("Error", "page doesn't exist")
        } else if (res.length <= end) {
            embed.setFooter(`page ${pg} from ${page}`);
            for (i = start; i < res.length; i++) {
                embed.addField(`${i + 1}. **${res[i].name}**`, `${res[i].money.toLocaleString()} beris`)
            }
        } else {
            embed.setFooter(`page ${pg} from ${page}`)
            for (i = start; i < end; i++) {
                embed.addField(`${i + 1}. **${res[i].name}**`, `${res[i].money.toLocaleString()} beris`)

            }
        }

        message.channel.send(embed)
    });
}

module.exports.help = {
    name: 'leaderboard',
    aliases: ["lb", "top"],
    description: "Check who are the richest people",
    noaliases: "top, lb",
    accessability: "Everyone"

}

