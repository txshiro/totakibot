//Requing discord.js
const Discord = require('discord.js');

//Requiring colors
const color = require('../../json/colors.json')

//Requiring mongoose & botconfig so we have mongoPass
const mongoose = require('mongoose');
const botconfig = require("../../json/botconfig.json")

var ger = false;
var kc = false;
var bs = false;

//connecting to the databse
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//Requiring models
const Data = require("../../models/data.js");

module.exports.run = async (bot, message, args) => {

    //creating variables
    var thumbnail = "https://freesvg.org/img/slot-machine.png"
    let name = message.author.username;
    let icon = message.author.avatarURL();

    //creating embed
    let embed = new Discord.MessageEmbed()
    embed.setAuthor(name, icon)
    embed.setFooter("tk!help for commands")
    embed.setThumbnail(thumbnail)

    //If user didnt specified amount and he didnt type 'all' or 'half'
    if (!args[0] && args[0] != 'all' && args[0] != "half") return message.reply("Write an amount");

    //if user is trying to put decimal numbers into his bet
    try {
        var bet = parseFloat(args[0]);
        //we catch that and return with a message
    } catch {
        return message.reply("You can write only whole number");
    }

    //checking if number
    if (typeof args[0] != "number" && args[0] != parseInt(args[0]) && args[0] != "all" && args[0] != "half") return message.reply("Please use only numbers")

    //Limiting bet
    if (parseInt(args[0]) > 100000) return message.reply("You can't bet more than 10k beris");




    //declaring the slots "emojis"
    let slots = ["<:KC:703217046703439903>",
        "<:SF:703216082172772394>",
        "<:GE:703215876337565696>",
        "<:CD:703267824898146480>",
        "<:KQ:703215109337514052>",
        "<:SP:703267804882665492>",
        "<:BS:703274106811842614>"
        , "<:GER:703274540511526912>"
    ];

    //picking random results from the "slots" above
    let result1 = slots[Math.floor(Math.random() * slots.length)];
    let result2 = slots[Math.floor(Math.random() * slots.length)];
    let result3 = slots[Math.floor(Math.random() * slots.length)];

    //Finding Data
    Data.findOne({
        userID: message.author.id,
        serverID: message.guild.id,
    }, (err, data) => {
        if (err) console.log(err);
        //creating new data if user doesnt have data 
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
            //returning wiith a message
            return message.reply("You don't have enough beris, try using !daily command");
            //if user has data
        } else {
            //checking if user has enough money
            if (data.money < bet || data.money <= 0 || bet > data.money) {
                embed.setColor("0xFF2D00")
                embed.setThumbnail(null)
                embed.setDescription(`You don't have enough beris. Your current balance: ${data.money.toLocaleString()} beris`)
                return message.reply(embed)
            }

            //If user wants to gamble all we simplify things for him
            if (args[0] == "all") bet = data.money;
            if (args[0] == "half") bet = data.money / 2;

            //if all results are equals to first emoji in our array
            if (result1 === slots[0] && result2 === slots[0] && result3 === slots[0]) {

                //we add money
                data.money += bet * 3;

                //and then save and catch any errors
                data.save().catch(err => console.log(err));

                //setuping embed
                embed.setTitle('KINGU "**YOU WON 3X!**" CRIMSONU')
                embed.setThumbnail("https://preview.redd.it/xgu7a53kmkj21.png?auto=webp&s=9cf136f4b51d34d67ee553b38d43bdef89cae9cc")
                embed.setImage("https://media1.tenor.com/images/5a59d78e15fc83332fd9048b63fa533b/tenor.gif?itemid=14291964")
                embed.setDescription(`>> ${result1} ${result2}  ${result3} << \n\n New Balance : **${data.money.toLocaleString()}** beris`)
                embed.setColor(color.darkred);

                //and sending him
                message.channel.send(embed).then(sendMessage => {
                    setTimeout(() => {
                        sendMessage.delete();
                        message.channel.send("Wait, did something happen ?")
                    }, 3000);
                })
            } else if (result1 === slots[7] && result2 === slots[7] && result3 === slots[7]) {

                data.money += bet * 10;
                data.save().catch(err => console.log(err));

                embed.setTitle('KOREGA REQUIEM DA!!!! YOU WON 10X')
                embed.setThumbnail("https://66.media.tumblr.com/a828005c5e00b41f067b82b9e9c9233a/tumblr_plw9x5ScSI1sw01y3_540.png")
                embed.setDescription(`>> ${result1} ${result2}  ${result3} << \n\n NEW BALANCE : **${data.money.toLocaleString()}** beris`)
                embed.setColor(color.gold)
                embed.setImage("https://media1.tenor.com/images/7b55915c502947996f8c32ad87375e8a/tenor.gif")
                embed.setFooter("THAT CANT BE TRUE", "https://vignette.wikia.nocookie.net/jjba/images/2/29/Boss_Loop.gif/revision/latest?cb=20190728155721")
                embed.setTimestamp();
                message.channel.send(embed)

            } else if (result1 === slots[6] && result2 === slots[6] && result3 === slots[6]) {

                data.money += bet * 5;
                data.save().catch(err => console.log(err));

                embed.setAuthor(name, icon)
                embed.setTitle(`${slots[6]} **YOU WON 5X!** ${slots[6]}`)
                embed.setThumbnail("https://static.jojowiki.com/images/thumb/3/38/Black_Sabbath_Infobox_Manga.png/270px-Black_Sabbath_Infobox_Manga.png")
                embed.setImage("https://i.kym-cdn.com/photos/images/original/001/425/092/801.gif")
                embed.setDescription(`>> ${result1} ${result2}  ${result3} << \n\n New Balance : **${data.money.toLocaleString()}** beris`)
                embed.setColor("0x000000f")
                message.channel.send(embed);
            } else if (result1 === result2 || result2 === result3) {
                if (result1 === slots[0] && result2 === slots[0] && result3 === slots[0] || result1 === slots[7] && result2 === slots[7] && result3 === slots[7] || result1 === slots[6] && result2 === slots[6] && result3 === slots[6]) {
                    return console.log("wont send")
                } else {
                    data.money += bet;
                    data.save().catch(err => console.log(err));
                    let embed2 = new Discord.MessageEmbed()
                    embed2.setAuthor(name, icon)
                    embed2.setTitle(':slot_machine: **You Won 1x!** :slot_machine:')
                    embed2.setDescription(`>> ${result1} ${result2}  ${result3} << \n\n New Balance : **${data.money.toLocaleString()}** beris`)
                    embed2.setColor("0x0acf3f")
                    embed2.setThumbnail(thumbnail)
                    embed2.setFooter("tk!help for commands")
                    embed2.setTimestamp();
                    message.channel.send(embed2);
                }
            } else {
                if (result1 === slots[0] && result2 === slots[0] && result3 === slots[0] || result1 === slots[7] && result2 === slots[7] && result3 === slots[7] || result1 === slots[6] && result2 === slots[6] && result3 === slots[6]) {
                    return console.log("wont send")
                } else {
                    data.money -= bet;
                    data.save().catch(err => console.log(err));
                    let embed3 = new Discord.MessageEmbed()
                    embed3.setAuthor(name, icon)
                    embed3.setTitle(':slot_machine: **You Lost!** :slot_machine:')
                    embed3.setDescription(`>> ${result1} ${result2}  ${result3} << \n\n New Balance : **${data.money.toLocaleString()} beris**`)
                    embed3.setColor("0xFF2D00")
                    embed3.setThumbnail(thumbnail)
                    embed3.setTimestamp()
                    embed3.setFooter("tk!help for commands")
                    message.channel.send(embed3)
                }
            }
        }
    })
}

module.exports.help = {
    name: 'slots',
    aliases: ['sl'],
    description: "Play slots with beris",
    noaliases: "sl",
    accessability: "Everyone"
}