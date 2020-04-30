const cheerio = require('cheerio');

const prefix = require('../../json/config.json')

const request = require('request');

module.exports.run = async (bot, message, args) => {

    image(message)


    function image(message) {

        let args = message.content.slice(prefix.prefix.length).split(" ");
        var search = args.toString();

        var options = {
            url: "http://results.dogpile.com/serp?qc=images&q" + search,
            method: "GET",
            headers: {
                "Accept": "text/html",
                "User-Agent": "Chrome"
            }
        };

        request(options, function (error, response, responseBody) {
            if (error) {
                console.log(error)
            }

            $ = cheerio.load(responseBody);

            var links = $(".image a.link");

            var urls = new Array(links.length).fill(0).map((v, i) => links.eq(1).attr("href"));

            console.log(urls);
            if (!urls.length) {
                return console.log("no url")
            }

            message.channel.send(urls[Math.floor(Math.random() * url.length)]);
        })
    }

}

module.exports.help = {
    name: 'image',
    aliases: [],
    description: "Get random image by your choice!",
    noaliases: "None",
    accessability: "Everyone"
}