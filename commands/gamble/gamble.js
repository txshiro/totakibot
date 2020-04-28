//Requiring discord.js so we can use embeds
const Discord = require('discord.js');

//Requiring mongoose
const mongoose = require('mongoose');

//Require botconfig in which i have mongaPass
const botconfig = require("../../json/botconfig.json")

//connecting to mongoose database
mongoose.connect(botconfig.mongoPass, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//requiring Data which i have in models folder
const Data = require("../../models/data.js");

module.exports.run = async (bot, message, args) => {

    var thumbnail = "https://lh3.googleusercontent.com/proxy/Ccd_EYQps2xPskQpqCb-3vWTOzlArU0rnBSYpooNJk2RaJZ2IPIBcXuygupebCKIxr135XpNTrmk3zlz96W9L84lsUdZyM6D8d7qKwv7uKN7Cvca-p0UKFtXXniYoiSfRQ"

    if (message.mentions.members.first()) return message.reply("You can't tag anyone when using this command");

    //Finding a data
    Data.findOne({
        userID: message.author.id,
        serverID: message.guild.id,
    }, (err, data) => {
        //if error then log the error
        if (err) console.log(err);
        //if user has no data create one   
        if (!data) {
            const newData = new Data({
                name: message.author.username,
                userID: message.author.id,
                serverID: message.guild.id,
                lb: "all",
                money: 0,
                daily: 0,
            })
            //save that data and if any errors then log them
            newData.save().catch(err => console.log(err));

            //return message that they dont have any money
            return message.reply("You don't have enough beris. Try using !daily command");
        } else {
            //defining embed
            let embed = new Discord.MessageEmbed();
            embed.setAuthor(message.author.username, message.author.avatarURL());
            embed.setThumbnail(thumbnail)
            embed.setFooter("tk!help for commands", bot.user.avatarURL());
            embed.setTimestamp();

            //checking if user doesnt have enough money
            if (data.money <= 0 || data.money < bet) {
                embed.setColor("0xFF2D00")
                embed.setDescription(`You don't have enough beris. Your current balance is ${data.money} beris`)
                return message.reply(embed)
            }

            //Checking first argument
            if (!args[0]) return message.reply("Write an amount");
            if (args[0] === "all") args[0] = data.money;
            if (args[0] === "none") return message.reply("good one LULW")

            //Checking if user is using good multiplier
            if (args[1] && args[1] !== "3x" && args[1] !== "5x" && args[1] !== "10x") return message.reply("You can only use '3x', '5x' or '10x'")

            //try and catch for checking if amount does not have decimal number in it
            try {
                var bet = parseInt(args[0]);
            } catch{
                return message.reply("you can add only whole numbers")
            }

            if (bet > data.money) return message.reply("You don't have that many beries.");

            //Checking if the bet is actuall number
            if (bet != Math.floor(bet)) return message.reply("You can add only numbers");

            if (bet < 10) return message.reply("You can't bet less than 10 beris.")

            //Declaring chances with percentage rate
            let chances = ["win", "lose"];
            var pick = chances[Math.floor(Math.random() * chances.length)] + Math.random * 100;

            //using switch function instead of IF
            switch (args[1]) {
                //declaring cases. It's the same as 'if(args[1] === "3x")' but its a lot easier to debug 
                case '3x':
                    if (pick <= 33) {
                        pick = "win"

                        data.money += bet * 3;
                        data.money = parseInt(data.money)
                        data.save().catch(err => console.log(err));

                        embed.setTitle("You won 3x!");
                        embed.setDescription(`Your new balance is: **${data.money.toLocaleString()}** beris`);
                        embed.setColor("0x0acf3f")
                        message.channel.send(embed);
                        break;
                    } else {
                        pick = "lose";

                        if ((data.money - (bet + data.money / 7.5)) < 0) {
                            data.money = 0
                            //saving and catching
                            data.save().catch(err => console.log(err));

                            embed.setTitle("You lost 3x!");
                            embed.setDescription(`Your new balance is: **0** beris`);
                            embed.setColor("0xFF2D00")
                            message.channel.send(embed);

                            break;
                        } else {

                            data.money -= bet + data.money / 2;
                            //rounding it up
                            data.money = parseInt(data.money)

                            data.save().catch(err => console.log(err));


                            embed.setTitle("You lost 3x!");
                            embed.setDescription(`Your new balance is: **${data.money.toLocaleString()}** beris`);
                            embed.setColor("0xFF2D00")
                            message.channel.send(embed);
                            break;
                        }


                    }
                case '5x':
                    if (pick <= 20) {
                        pick = "win"

                        data.money += bet * 5;
                        data.money = parseInt(data.money)
                        data.save().catch(err => console.log(err));

                        embed.setTitle("You won 5x!");
                        embed.setDescription(`Your new balance is: **${data.money.toLocaleString()}** beris`);
                        embed.setColor("0x0acf3f")
                        message.channel.send(embed);
                        break;
                    } else {
                        pick = "lose";

                        if ((data.money - (bet + data.money / 5)) < 0) {
                            data.money = 0
                            //saving and catching
                            data.save().catch(err => console.log(err));

                            embed.setTitle("You lost 5x!");
                            embed.setDescription(`Your new balance is: **${data.money.toLocaleString()}** beris`);
                            embed.setColor("0xFF2D00")
                            message.channel.send(embed);

                            break;
                        } else {

                            data.money -= bet + data.money / 2;

                            //rounding it up
                            data.money = parseInt(data.money)
                            //saving and catching
                            data.save().catch(err => console.log(err));

                            embed.setTitle("You lost 5x!");
                            embed.setDescription(`Your new balance is: **${data.money.toLocaleString()}** beris`);
                            embed.setColor("0xFF2D00")
                            message.channel.send(embed);
                        }


                    }
                case '10x':
                    if (pick <= 10) {
                        pick = "win"

                        data.money += bet * 10;
                        data.money = parseInt(data.money)
                        data.save().catch(err => console.log(err));

                        embed.setTitle("You won 10x!");
                        embed.setDescription(`Your new balance is: **${data.money.toLocaleString()}** beris`);
                        embed.setColor("0x0acf3f")
                        message.channel.send(embed);
                        break;
                    } else {
                        pick = "lose";

                        if ((data.money - (bet + data.money / 2)) < 0) {
                            data.money = 0
                            //saving and catching
                            data.save().catch(err => console.log(err));
                            message.channel.send(`You lost 10x! Your new balance is 0`);

                            break;
                        } else {
                            data.money -= bet + data.money / 2;
                            data.money = parseInt(data.money)
                            data.save().catch(err => console.log(err));

                            embed.setTitle("You lost 10x!");
                            embed.setDescription(`Your new balance is: **${data.money.toLocaleString()}** beris`);
                            embed.setColor("0xFF2D00")
                            message.channel.send(embed);
                            break;

                        }
                    }
            }
            //Now if we want a normal gamble we will just check if second argument is deosnt exist             
            if (!args[1]) {
                //We will remake pick variable so it has 50% to be win/lose
                var pick = chances[Math.floor(Math.random() * chances.length)];

                if (pick === "lose") {
                    data.money -= bet;
                    data.money = parseInt(data.money)
                    data.save().catch(err => console.log(err));

                    embed.setTitle("You lost");
                    embed.setDescription(`Your new balance is: **${data.money.toLocaleString()}** beris`);
                    embed.setColor("0xFF2D00")
                    return message.channel.send(embed)
                } else {
                    data.money += bet;
                    data.money = parseInt(data.money)
                    data.save().catch(err => console.log(err));

                    embed.setTitle("You won!");
                    embed.setDescription(`Your new balance is: **${data.money.toLocaleString()}** beris`);
                    embed.setColor("0x0acf3f")
                    return message.channel.send(embed);
                }
            }

        }
    })
}

module.exports.help = {
    name: "gamble",
    aliases: ['g'],
    description: "Gamble some beris. You can gamble 3x, 5x or 10x",
    noaliases: "g",
    accessability: "Everyone"
}