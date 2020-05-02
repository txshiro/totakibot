const mongoose = require("mongoose");
const botconfig = require("../../json/botconfig.json");

// CONNECT TO DATABASE
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// MODELS
const Data = require("../../models/data.js");

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`You are missing this permission: 'ADMINISTRATOR'`);
    if (!args[1]) return message.reply("You need to write a number");
    if (args[1] != Math.floor(args[1])) return message.reply("Please add only whole numbers");
    if (!args[0]) return message.reply("Pleae write add/remove")
    if (parseInt(args[1]) < 100) return message.reply("You can't give less than 100 beris");
    if (args[0] != "remove" && args[0] != "add") return message.reply("You can use only add/remove")

    if (args[0] == "remove") {
        const embed = new Discord.MessageEmbed()
            .setDescription(`**Admin just took ${args[1]} beris to everyone!**`)
            .setColor("0xFF2D00")
            .setAuthor(message.author.username, message.author.avatarURL())
            .setFooter("User doesn't have any beris");
        message.channel.send(embed)
    }
    if (args[0] == "add") {
        const embed = new Discord.MessageEmbed()
            .setDescription(`**Admin just gave ${args[1]} beris to everyone!**`)
            .setColor("0xFF2D00")
            .setAuthor(message.author.username, message.author.avatarURL())
            .setFooter("User doesn't have any beris");
        message.channel.send(embed)
    }

    Data.find({
        lb: "all"
    }).sort([
        ['money', 'descending']
    ]).exec((err, res) => {
        if (err) console.log(err);



        if (!res) return message.reply("No users");

        for (i = 0; i < res.length; i++) {
            Data.findOne({
                userID: res[i].userID,
                serverID: message.guild.id,
            }, (err, data) => {
                if (err) console.log(err);
                if (data) {
                    if (args[0] == "remove") {
                        data.money -= parseInt(args[1]);
                        data.save().catch(err => console.log(err));
                    }
                    if (args[0] == "add") {
                        data.money += parseInt(args[1]);
                        data.save().catch(err => console.log(err));
                    }
                }

            });
        }
    })

}

module.exports.help = {
    name: 'adminpayall',
    aliases: ['apl'],
    description: "Pay any amount to everyone",
    noaliases: "apl",
    accessability: "Admins"
}