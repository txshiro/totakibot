const Discord = require('discord.js');

const colors = require('../../json/colors.json');

const weather = require('weather-js');

module.exports.run = async (bot, message, args) => {
    weather.find({ search: args.join(" "), degreeType: 'C' }, function (err, result) {
        if (err) message.channel.send(err)

        var current = result[0].current;
        var location = result[0].location;

        let embed = new Discord.MessageEmbed()
            .setAuthor(message.author.username, message.author.avatarURL())
            .addField("☁️ Weather for", current.observationpoint)
            .addField("☀️ Sky", current.skytext)
            .addField("🕒 Timezone", `UTC ${location.timezone}`)
            .addField("🛰️ Degree Type", location.degreetype)
            .addField("🌡️ Temperature", `${current.temperature} Degrees`)
            .addField("🌞 Feels like", `${current.feelslike} Degrees`)
            .addField("🌬️ Winds", current.winddisplay)
            .addField("💦 Humidity", `${current.humidity}%`)
            .setThumbnail(current.imageUrl)
            .setFooter("tk!help for commands", bot.user.avatarURL())
            .setTimestamp();

        message.channel.send(embed)
    })
}

module.exports.help = {
    name: 'weather',
    aliases: [],
    description: "Get weather in any city!",
    noaliases: "None",
    accessability: "Everyone"
}