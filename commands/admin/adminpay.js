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
    let user = message.mentions.users.first() || bot.users.cache.get(args[0])
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(`You don't have enough permissions`);
    if (!user) return message.reply("I can't find that user");
    if (user.id === "694857173595062354") return message.reply("You can't use this command on bot!");
    if (!args[1]) return message.reply("You need to write add/remove")
    if (args[1] == "add" && args[2] < 0) return message.reply("You can't remove money when you use add")
    if (args[1] == "remove" && args[2] < 0) return message.reply("You can't put negative number if you want to remove money")
    if (args[1] != "remove" && args[1] != "add") return message.reply("You can use only add/remove")
    if (!args[2] && args[2] != "all") return message.reply("You need to write a number")
    if (args[2] != Math.floor(args[2]) && args[2] != "1mil" && args[2] != "all") return message.reply("Please add whole number")
    if (parseInt(args[2]) > 1000000) return message.reply("You can't add/remove that much");



    Data.findOne({
        userID: user.id,
        serverID: message.guild.id,
    }, (err, userData) => {
        if (err) console.log(err)

        if (!userData) {
            const newData = new Data({
                name: bot.users.cache.get(user.id).username,
                userID: user.id,
                serverID: message.guild.id,
                lb: "all",
                money: parseInt(args[2]),
                daily: 0,
            })
            newData.save().catch(err => console.log(err));
            var grabUserData = parseInt(args[2]);
        } else {

            if (args[1] == "add") {
                userData.money += parseInt(args[2]);
                userData.save().catch(err => console.log(err));
                var grabUserData = userData.money
                if (args[2] == "1mil") {
                    userData.money += parseInt("1000000");
                    var grabUserData = userData.money
                }
            }

            if (args[1] == "remove") {

                if (userData.money === 0) {
                    const embed = new Discord.MessageEmbed()
                        .setDescription("**You can't remove anything from that user**")
                        .setColor("0xFF2D00")
                        .setFooter("User doesn't have any beris");
                    return message.reply(embed)
                } else if (args[2] == "all") {
                    userData.money -= userData.money;
                    userData.save().catch(err => console.log(err));
                    var grabUserData = userData.money
                }

                if (userData.money - args[2] < 0) {
                    const embed = new Discord.MessageEmbed()
                        .setDescription("**You can't remove that many beries from user**")
                        .setFooter("User would've had negative amount")
                        .setColor("0xFF2D00");
                    return message.reply(embed)
                } else if (args[2] != "all") {
                    userData.money -= parseInt(args[2]);
                    userData.save().catch(err => console.log(err));
                    var grabUserData = userData.money
                }

            } const embed = new Discord.MessageEmbed()
                .setAuthor("Server", message.guild.iconURL())
                .setTitle(`Server's Payment | ${args[2]} beris`)
                .setColor(0xfdea02)
                .setThumbnail(bot.users.cache.get(user.id).avatarURL())
                .addField("For", bot.users.cache.get(user.id).username, true)
                .addField(`New Balance`, `**${grabUserData.toLocaleString()}**`, true)
                .setFooter("!help for commands", bot.user.avatarURL());
            return message.channel.send(embed);
        }
    })
}

module.exports.help = {
    name: 'adminpay',
    aliases: ["ap"],
    description: "Pay any amount to user",
    noaliases: "ap",
    accessability: "Admins"
}

