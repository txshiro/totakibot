const Discord = require('discord.js');

const colors = require('../../json/colors.json');

const urban = require('relevant-urban');

module.exports.run = async (bot, message, args) => {

    let embed = new Discord.MessageEmbed();
    if (!args[0]) {
        embed.setDescription("You need to write word/text");
        embed.setColor(colors.darkred);
        message.channel.send(embed);
    }

    let res = await urban(args.join(' ')).catch(e => {
        embed.setDescription("Couldn't found that word");
        embed.setColor(colors.darkred);
        return message.channel.send(embed)
    })

    let string1 = res.definition
    string1.replace('[', ']')

    embed.setColor(colors.darkblue)
    embed.setTitle("Urban Dictionary")
    embed.setURL(res.urbanURL)
    embed.addField("📋 Word", res.word)
    embed.addField("📖 Definition", string1)
    embed.addField("📕 Example", res.example)
    embed.addField('🖊️ Author', res.author)
    embed.addField("👍 Upvotes", res.thumbsUp);
    embed.addField("👎 Downvotes", res.thumbsDown);

    if (res.tags.length > 0 && res.tags.join(', ').length < 1024) {
        embed.addField("🏷️ Tags", res.tags.join(', '))
    }

    message.channel.send(embed)
}

module.exports.help = {
    name: 'urbandictionary',
    aliases: ['urb'],
    description: "Check for word meaning",
    noaliases: "urb",
    accessability: "Everyone"
}