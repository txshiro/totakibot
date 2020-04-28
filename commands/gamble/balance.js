const Discord = require('discord.js');
const mongoose = require('mongoose');
const botconfig = require("../../json/botconfig.json");

//connect to databse
mongoose.connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

//models
const Data = require("../../models/data.js");

module.exports.run = async (bot, message, args) => {

	const embed = new Discord.MessageEmbed();

	if (!args[0]) {
		var user = message.author;
	} else {
		var user = message.mentions.users.first() || bot.users.cache.get(args[0]);
	}

	Data.findOne({
		userID: user.id,
		serverID: message.guild.id,
	}, (err, data) => {
		if (err) console.log(err);
		if (!data) {
			const newData = new Data({
				name: bot.users.cache.get(user.id).username,
				userID: user.id,
				serverID: message.guild.id,
				lb: "all",
				money: 0,
				daily: 0,
			})
			newData.save().catch(err => console.log(err));
			embed.setTitle("Balance");
			embed.setThumbnail("https://steamcdn-a.akamaihd.net/steamcommunity/public/images/items/425220/444ad6c1332cfc69156de507641913459dfb6d28.png")
			embed.setDescription(`Your current balance is **0** beris`);
			embed.setColor("0x1a0be3")
			embed.setFooter("!help for commands", bot.user.avatarURL());
			embed.setTimestamp();
			return message.channel.send(embed)

		} else {
			data.money.toFixed();
			embed.setAuthor(message.author.username, message.author.avatarURL())
			embed.setTitle("Balance");
			embed.setDescription(`Your current balance is **${data.money.toLocaleString()}** beris`);
			embed.setColor("0x1a0be3")
			embed.setFooter("!help for commands", bot.user.avatarURL());
			embed.setTimestamp();
			embed.setThumbnail("https://steamcdn-a.akamaihd.net/steamcommunity/public/images/items/425220/444ad6c1332cfc69156de507641913459dfb6d28.png")
			return message.channel.send(embed);

		}
	})
}

module.exports.help = {
	name: "balance",
	aliases: ["bal", "money"],
	description: "Check your balance",
	noaliases: "bal, money",
	accessability: "All"
}