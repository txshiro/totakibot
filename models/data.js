const mongoose = require("mongoose");
const guildID = require('../index.js').exportGuildID;

const dataSchema = mongoose.Schema({
    name: String,
    userID: String,
    serverID: String,
    lb: String,
    money: Number,
    daily: Number,
    serverprefix: String
})

module.exports = mongoose.model(`Data`, dataSchema)