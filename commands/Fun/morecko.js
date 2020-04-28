module.exports.run = async (bot, message, args) => {
    const Moreckoemoji = '<a:mouLeti:704281265725112350>'
    message.reply(`You are morecko on ${Math.floor(Math.random() * 101) + 0}% ${Moreckoemoji}`);
}

module.exports.help = {
    name: "morecko",
    aliases: [],
    description: "I don't know why this command is here",
    noaliases: "None",
    accessability: "Everyone"
}
