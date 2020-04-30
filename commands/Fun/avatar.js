const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {

    if (!args[0]) {
        var user = message.author;
    } else {
        var user = message.mentions.users.first() || bot.users.cache.get(args[0]);
    }

    if (user.id === message.author.id) {
        let embed = new Discord.MessageEmbed()
            .setAuthor(user, user.avatarURL())
            .setTitle("Your avatar")
            .setImage(user.avatarURL())
            .setTimestamp()
            .setFooter("tk!help for commands", bot.user.avatarURL())
        return message.channel.send(embed);

    } else {
        let embed2 = new Discord.MessageEmbed()
            .setAuthor(user, user.avatarURL())
            .setTitle(`${user}'s avatar`)
            .setImage(user.avatarURL())
            .setTimestamp()
            .setFooter("tk!help for commands", bot.user.avatarURL())
        return message.channel.send(embed2);
    }


}

module.exports.help = {
    name: 'avatar',
    aliases: [],
    description: "Get user's avatar",
    noaliases: "None",
    accessability: "Everyone"
}