module.exports.run = async (bot, message, args) => {
    const PepeLaugh = "<:PepeLaugh:700419119459205130>";
    message.reply(`Your PP is ${Math.floor(Math.random() * 25) + 0} cm long ${PepeLaugh}`);
}

module.exports.help = {
    name: 'PP',
    aliases: [],
    description: "Get your PP size",
    noaliases: "None",
    accessability: "Everyone"
}