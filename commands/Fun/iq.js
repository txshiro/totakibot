module.exports.run = async (bot, message, args) => {
    //This is emoji on my server, you can change it to yours
    //to get the id of emoji do
    // "\:EmojiName:" without the ""
    const Heademoji = "<:5Head:700374785749680309>";

    //Choosing random number from 0 to 130
    const randomNumber = Math.floor(Math.random() * 130) + 1

    //if user has tagged anyone
    if (args[0]) {
        let user = message.mentions.members.first();
        //if user wants has tagged himself
        if (user.id === message.author.id) {
            message.reply(`Your iq is ${randomNumber} ${Heademoji}`);
            //if user has tagged bot Totaki
        } if (user.id === "694857173595062354") {
            message.reply("I'm bot. I don't have an IQ.")
            //if user has tagged someone
        } else {
            message.reply(`${bot.users.cache.get(user.id).username}'s is ${randomNumber} ${Heademoji}`);
        }
        //If user hasnt tag anyone
    } else {
        message.reply(`Your iq is ${randomNumber} ${Heademoji}`);
    }
}

module.exports.help = {
    name: "iq",
    aliases: [],
    description: "Get your or someone elses iq.",
    noaliases: "None",
    accessability: "Everyone"
}