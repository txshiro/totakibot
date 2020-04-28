const Discord = require('discord.js')
module.exports.run = async(bot,message,args) =>{
    const NewUserEmbed = new Discord.MessageEmbed()
        .setAuthor(message.author.username, message.author.avatarURL())
        .setTitle("Zostatok")
        .setDescription(`Tvoj aktualny zostatok je: **0** moreckoviek`)
        .setThumbnail("https://static-cdn.jtvnw.net/emoticons/v1/301281493/3.0")
        .setColor("0x1a0be3")
        .addField("Dalsie prikazy", "!daily\n!gamble\n!pay")
        .setFooter("Iba tolko?", "https://cdn.frankerfacez.com/emoticon/262468/2")
        .setTimestamp();

        module.exports = (NewUserEmbed);
}
