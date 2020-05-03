const Discord = require('discord.js');
const color = require('../../json/colors.json');
const API = require('apextab-api'), ApexTab = API.Apextab_API;

module.exports.run = async (bot, message, args) => {

    if (!args[0]) return message.channel.send("Please provide a username!");
    if (!args[1]) return message.channel.send("Please provide a platform!");

    const platformCheck = { pc: API.Platform.PC, xbox: API.Platform.XBOX_ONE, ps4: API.Platform.PS4 };
    const platform = platformCheck[args[1].toLowerCase()];

    try {
        const results = await ApexTab.searchPlayer(args[0], platform ? platform : API.Platform.PC)

        for (let playerResult of results.results) {
            const player = await ApexTab.getPlayerById(playerResult.aid)
            const { name, skillratio, visits, avatar, legend, level, kills, headshots, matches, globalrank, utime } = player;

            const embed = new Discord.MessageEmbed()
                .setColor(color.red)
                .setAuthor(`Apex Legends | ${name}`, avatar)
                .setThumbnail(avatar)
                .addField('**Active Legend:**', `${legend || "Not found."}`)
                .addField("**Global Rank:**", `${globalrank || "Not ranked."}`)
                .addField("**Level:**", `${level || 0}`)
                .addField("**Skill Ratio:**", `${skillratio || "0%"}`)
                .addField("**Matches:**", `${matches || 0}`)
                .addField("**Kills:**", `${kills || 0}`)
                .addField("**Headshots:**", `${headshots || 0}`)
                .addField("**Visits:**", `${visits || 0}`)
                .addField("**Playtime:**", `${Math.ceil(utime / (1000 * 60 * 60 * 24)) || 0} days`)
                .setTimestamp();

            message.channel.send(embed)
        }

    } catch (err) {
        return message.channel.send("Can't find player with that name")
    }



}
module.exports.help = {
    name: 'apex',
    aliases: [],
    description: "Get info about any Apex profile!",
    noaliases: "None",
    accessability: "Everyone"
}