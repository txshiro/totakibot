const Discord = require('discord.js');

const colors = require('../../json/colors.json')

module.exports.run = async (bot, message, args) => {

    if (args[0]) {
        let command = args[0]
        if (bot.commands.has(command)) {
            command = bot.commands.get(command)
            let embed2 = new Discord.MessageEmbed()
                .setColor(colors.cyan)
                .setTitle("Commands Info")
                .setThumbnail(bot.user.avatarURL())
                .setDescription(`** >>Command:** ${command.help.name}\n**>>Description:** ${command.help.description}\n**>>Aliases:** ${command.help.noaliases}\n**>>Accessable by:** ${command.help.accessability}`)
                .setFooter("tk!help for commands", bot.user.avatarURL())
                .setTimestamp();
            message.channel.send(embed2)
        }
    }

    if (!args[0]) {
        let embed = new Discord.MessageEmbed();
        embed.setTitle("Totaki's commands")
        embed.setDescription("**tk!help <command name>** for more info on certain command!")
        embed.addField("1. Fun", "`8ball` `iq` `pp` `morecko` `hit` `hug` `pat` `wave` `userinfo` `image`    `avatar` `urbandictionary`")
        embed.addField("2. Gamble", "`balance` `coinflip` `daily` `gamble` `leaderboards` `pay` `slots`")
        embed.addField("3. Admin", "`adminpayall` `adminpay` `clear` `mute` `unmute` `kick` `ban` `permaban` `unban`")
        embed.addField("4. Bot", "`ping` `uptime` `help` `info`")
        embed.setColor(colors.blanchedalmond)
        embed.setFooter("Thanks for using this bot!", bot.user.avatarURL())
        embed.setTimestamp();

        message.channel.send(embed);
    }


}

module.exports.help = {
    name: 'help',
    aliases: [],
    description: "Help command for a Totaki!",
    noaliases: "None",
    accessability: "Everyone"
}