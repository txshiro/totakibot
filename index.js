const Discord = require('discord.js');
const { prefix } = require("./json/config.json");
const bot = new Discord.Client();

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

["command"].forEach(handler => {
    require(`./handler/${handler}`)(bot);
});

bot.on('ready', () => {

    bot.user.setActivity('tk!help', { type: 'PLAYING' }).catch(console.error);
    console.log(`[${bot.user.username}]: ready!`)

})
bot.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(channel => channel.name === "welcome");
    if (!channel) return;
    var server = bot.guilds.cache.get("703661705997189200");
    if (server) {
        channel.send(`👋 Welcome ${member}, to Totaki Support Server! 👋`);
    } else {
        channel.send(`👋 Welcome ${member}! Hope you enjoy your stay!`)
    }

})


bot.on('message', message => {

    var server = bot.guilds.cache.get("703661705997189200");
    if (server) {
        if (message.channel.id === "703934542725120070") {
            if (message.content !== "yo") {
                message.delete();
                const embed = new Discord.MessageEmbed()
                embed.setColor("0xFF2D00")
                embed.setDescription(`**You can only type "yo" in that channel**`)
                embed.setTimestamp()
                message.author.send(embed)
            }
        }
    } else {
        return;
    }

    if (!message.content.startsWith(prefix)) return;
    if (message.author.bot) return;

    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let cmd;
    cmd = args.shift().toLowerCase();
    let command;
    let commandfile = bot.commands.get(cmd.slice(prefix.length));

    if (commandfile) commandfile.run(bot, message, args);

    if (bot.commands.has(cmd)) {
        command = bot.commands.get(cmd);
    } else if (bot.aliases.has(cmd)) {
        command = bot.commands.get(bot.aliases.get(cmd));
    }
    try {
        command.run(bot, message, args);
    } catch (e) {
        return;
    }
})


bot.login(process.env.token);