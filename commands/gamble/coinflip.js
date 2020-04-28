const Discord = require('discord.js');
const mongoose = require('mongoose');
const botconfig = require("../../json/botconfig.json")

//connect to databse
mongoose.connect(botconfig.mongoPass, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//models
const Data = require("../../models/data.js");

module.exports.run = async (bot, message, args) => {

    if (message.mentions.members.first()) return message.reply("You can't tag anyone when using this command");
    //check if the number is full number
    try {
        var bet = parseFloat(args[1]);
    } catch {
        return message.reply("Please put a whole number");
    }

    //check first args
    if (!args[0]) return message.reply("You need to write Heads or Tails");
    if (args[0] != "Tails" && args[0] != "tails" && args[0] != "Heads" && args[0] != "heads") return message.reply("You can do only Heads or Tails");

    //check second args
    if (!args[1]) return message.reply("You need to write a number")
    if (args[1] != Math.floor(args[1]) && args[1] != "all" && args[1] != "half") return message.reply("The amount can be only a number")
    if (args[1] <= 0) return message.reply("That amount is invalid")

    //actual code
    Data.findOne({
        userID: message.author.id,
        serverID: message.guild.id,
    }, (err, data) => {
        if (err) console.log(err);
        if (!data) {
            const newData = new Data({
                name: message.author.username,
                userID: message.author.id,
                serverID: message.guild.id,
                lb: "all",
                money: 0,
                daily: 0,
            })
            newData.save().catch(err => console.log(err));
            return message.reply("You don't have enough beris, try using !daily command");
        } else {

            let embed = new Discord.MessageEmbed();

            if (data.money <= 0 || data.money < bet) {
                embed.setColor("0xFF2D00")
                embed.setDescription(`You don't have enough beris. Your current balance is: ${data.money}`)
                return message.reply(embed)
            }

            if (args[1] == "all") bet = data.money;
            if (args[1] == "half") bet = data.money / 2;
            if (args[1] == "none") return message.channel.reply("good one LULW")

            let chances = ["heads", "tails"];
            var pick = chances[Math.floor(Math.random() * chances.length)];

            message.channel.send("**Throwing**...")

            if (pick === "heads" && args[0] === "Tails" || pick === "heads" && args[0] === "tails") {
                data.money -= bet;
                data.save().catch(err => console.log(err));

                embed.setAuthor(message.author.username, message.author.avatarURL());
                embed.setTitle("It's heads | You lost!");
                embed.setDescription(`Your new balance is: **${data.money.toLocaleString()}** beris`);
                embed.setColor("0xFF2D00")
                embed.setThumbnail("https://thumbs.gfycat.com/AcidicIncredibleLcont-max-1mb.gif")
                embed.setFooter("!help for commands", bot.user.avatarURL());
                embed.setTimestamp();
                var interval = setTimeout(function () {
                    return message.channel.send(embed)
                }, 1000);
            }

            if (pick === "tails" && args[0] === "Heads" || pick === "tails" && args[0] === "heads") {
                data.money -= bet;
                data.save().catch(err => console.log(err));

                embed.setAuthor(message.author.username, message.author.avatarURL());
                embed.setTitle("It's tails! | You lost!");
                embed.setDescription(`Your new balance is: **${data.money.toLocaleString()}** beris`);
                embed.setColor("0xFF2D00")
                embed.setThumbnail("https://thumbs.gfycat.com/AcidicIncredibleLcont-max-1mb.gif")
                embed.setFooter("!help for commands", bot.user.avatarURL());
                embed.setTimestamp();
                var interval = setTimeout(function () {
                    return message.channel.send(embed)
                }, 1000);
            }

            if (pick === "heads" && args[0] === "Heads" || pick === "heads" && args[0] === "heads") {
                data.money += bet;
                data.save().catch(err => console.log(err));

                embed.setAuthor(message.author.username, message.author.avatarURL());
                embed.setTitle("It's heads | You won!");
                embed.setDescription(`Your new balance is: **${data.money.toLocaleString()}** beris`);
                embed.setColor("0x00ff1a")
                embed.setThumbnail("https://thumbs.gfycat.com/AcidicIncredibleLcont-max-1mb.gif")
                embed.setFooter("!help for commands", bot.user.avatarURL());
                embed.setTimestamp();
                var interval = setTimeout(function () {
                    return message.channel.send(embed)
                }, 1000);

            }

            if (pick === "tails" && args[0] === "Tails".toLowerCase || pick === "tails" && args[0] === "tails") {
                data.money += bet;
                data.save().catch(err => console.log(err));

                embed.setAuthor(message.author.username, message.author.avatarURL());
                embed.setTitle("It's tails | You won!");
                embed.setDescription(`Your new balance is: **${data.money.toLocaleString()}** beris`);
                embed.setColor("0x00ff1a")
                embed.setThumbnail("https://thumbs.gfycat.com/AcidicIncredibleLcont-max-1mb.gif")
                embed.setFooter("!help for commands", bot.user.avatarURL());
                embed.setTimestamp();
                var interval = setTimeout(function () {
                    return message.channel.send(embed)
                }, 1000);
            }
        }
    })

}


module.exports.help = {
    name: 'coinflip',
    aliases: ['cf', 'coinf'],
    description: "Play coinflip for money",
    noaliases: "cf, coinf",
    accessability: "Everyone"
}