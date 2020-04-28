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

    var thumbnail = "https://payretailers.com/wp-content/uploads/2019/09/online-payment-method-mobile-icon-1-180x180.png"
    let user = message.mentions.users.first() || bot.users.cache.get(args[0])
    if (!user) return message.reply("I can't find that user");
    if (args[1] != parseInt(args[1])) return message.reply("You can't give decimal numbers")
    if (user.id === message.author.id) return message.reply("You can't pay to yourself");
    if (user.id === "694857173595062354") return message.reply("You can't pay to the bot");

    Data.findOne({
        userID: message.author.id,
        serverID: message.guild.id,
    }, (err, authorData) => {
        if (err) console.log(err);
        if (!authorData) {
            return message.reply("You don't have any beris to send")
        } else {
            Data.findOne({
                userID: user.id
            }, (err, userData) => {
                if (err) console.log(err);

                if (!args[1]) return message.reply("Write an amount");

                if (parseInt(args[1]) > authorData.money) {
                    let embed2 = new Discord.MessageEmbed()
                    embed2.setColor("0xFF2D00")
                    embed2.setDescription(`You don't have enough beris. Your current balance is: ${authorData.money}`)
                    return message.reply(embed2)
                }
                if (parseInt(args[1]) < 5) return message.reply("You can't pay less than 5 beris");
                if (args[1 != Math.floor(args[1])]) return ("Please write only whole numbers")

                if (!userData) {
                    const newData = new Data({
                        name: bot.users.cache.get(user.id).username,
                        userID: user.id,
                        lb: "all",
                        money: parseInt(args[1]),
                        daily: 0,
                    })
                    authorData.money -= parseInt(args[1]);
                    newData.save().catch(err => console.log(err));
                    authorData.save().catch(err => console.log(err));

                    var grabUserData = parseInt(args[1]);

                } else {
                    userData.money += parseInt(args[1]);
                    authorData.money -= parseInt(args[1]);
                    userData.save().catch(err => console.log(err));
                    authorData.save().catch(err => console.log(err));

                    var grabUserData = userData.money
                }

                const embed = new Discord.MessageEmbed()
                    .setTitle(`Payment | ${args[1]} beris`)
                    .setAuthor(message.author.username, message.author.avatarURL())
                    .setColor(0xfdea02)
                    .addField("From", message.author.username, true)
                    .addField("To", bot.users.cache.get(user.id).username, true)
                    .addField('\u200B', '\u200B')
                    .addField(`   **${message.author.username} balance**`, `   ${authorData.money}`, true)
                    .addField('\u200B', '\u200B', true)
                    .addField(`**${bot.users.cache.get(user.id).username} balance**`, `${grabUserData}`, true)
                    .setFooter("Pog", "https://cdn.frankerfacez.com/emoticon/256055/2")
                    .setThumbnail(thumbnail)
                    .addField('\u200B', '\u200B')
                    .setTimestamp();
                return message.channel.send(embed);
            })
        }
    })

}

module.exports.help = {
    name: 'pay',
    aliases: ["p"],
    description: "Pay beris to someone",
    noaliases: "p",
    accessability: "Everyone"
}