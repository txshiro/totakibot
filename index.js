const Discord = require('discord.js');
const read = require('fs-readdir-recursive');

const { prefix, token } = require("./json/config.json");
const ms = require('ms');
const bot = new Discord.Client();

const DBL = require('dblapi.js');
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NDg1NzE3MzU5NTA2MjM1NCIsImJvdCI6dHJ1ZSwiaWF0IjoxNTg4MDc2NjI2fQ.bwx8evJflf5clAh4fKiyGZZIoc2PqxcxnInb6UXUhU8', { webhookPort: 5000, webhookAuth: 'password' });

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

dbl.webhook.on('ready', hook => {
    console.log(`Webhook running at http://${hook.hostname}:${hook.port}${hook.path}`);
});
dbl.webhook.on('vote', vote => {
    console.log(`User with ID ${vote.user} just voted!`);
});

const files = read('./commands/');
files.forEach(file => {
    let cmd = file.replace('.js', '.js');
    let props = require(`./commands/${cmd}`);

    console.log(`|${cmd}|✔ |`)
    bot.commands.set(props.help.name, props);

    props.help.aliases.forEach(alias => {
        bot.aliases.set(alias, props.help.name);
    })
})

bot.on('ready', () => {

    bot.user.setActivity('tk!help', { type: 'PLAYING' }).catch(console.error);
    console.log("[Bot]: Pripraveny")

})
bot.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(channel => channel.name === "welcome");
    if (!channel) return console.log("No welcome channel")
    channel.send(`👋 Welcome ${member}, to Totaki Support Server! 👋`);

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

    const guildID = message.guild.id;
    module.exports = { exportGuildID: guildID };

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