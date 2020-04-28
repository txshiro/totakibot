const Discord = require("discord.js")
const ms = require("parse-ms")
const mongoose = require('mongoose');
const botconfig = require("../../json/botconfig.json")

//connect to databse
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//models
const Data = require("../../models/data.js");

module.exports.run = async (bot, message, args) => {
    let timeout = 86400000;
    let reward = 2500;

    if (message.mentions.members.first()) return message.reply("You can't tag anyone when using this command");

    let embed = new Discord.MessageEmbed();
    embed.setTitle("Daily Rewards");

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
                money: reward,
                daily: Date.now(),
            })
            newData.save().catch(err => console.log(err));
            embed.setAuthor(message.author.username, message.author.avatarURL());
            embed.setTitle("Balance");
            embed.addField('Daily reward', `**${reward}**`, true);
            embed.addField('\u200B', "\u200B", true);
            embed.addField('Balance', `**${reward}**`, true);
            embed.setThumbnail("https://img.wirexapp.com/images/t_optimize_transf/v1551220884/wirexapp/wirex30/blog/iayk4nrtmnaw0bwc5ifh.png/img")
            embed.setColor("0x1a0be3")
            embed.setFooter("!help for commands", bot.user.avatarURL());
            embed.setTimestamp();
            return message.channel.send(embed);
        } else {
            if (timeout - (Date.now() - data.daily) > 0) {
                let time = ms(timeout - (Date.now() - data.daily));
                embed.setAuthor(message.author.username, message.author.avatarURL());
                embed.setThumbnail("https://fatrapark2.net/wp-content/uploads/2013/12/24-hours.png")
                embed.setDescription(`You have already taken your daily reward.`);
                embed.addField(`You can claim your daily reward again in,`, `**${time.hours}h ${time.minutes}m ${time.seconds}s**`);
                embed.setFooter("!help for commands", bot.user.avatarURL());
                embed.setColor("ff0000");
                embed.setTimestamp();
                return message.channel.send(embed);
            }
            else {
                data.money += reward;
                data.daily = Date.now();
                data.save().catch(err => console.log(err));

                embed.setAuthor(message.author.username, message.author.avatarURL());
                embed.setThumbnail("https://img.wirexapp.com/images/t_optimize_transf/v1551220884/wirexapp/wirex30/blog/iayk4nrtmnaw0bwc5ifh.png/img")
                embed.addField("Daily reward", `${reward}`, true);
                embed.addField('\u200B', '\u200B', true)
                embed.addField("New Balance", data.money, true);
                embed.setFooter("!help for commands", bot.user.avatarURL());
                embed.setColor("00ff00");
                embed.setTimestamp();
                return message.channel.send(embed);
            }
        }
    })
}

module.exports.help = {
    name: "daily",
    aliases: [],
    description: "Pick your daily beris",
    noaliases: "None",
    accessability: "Everyone"
}