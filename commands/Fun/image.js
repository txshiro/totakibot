const cheerio = require('cheerio');

const request = require('request');

module.exports.run = async (bot, message, args) => {

    image(message)


    function image(message) {

        let result = args.slice(0).join(" ");
        if (!result) reason = "one piece"

        var options = {
            url: "http://results.dogpile.com/serp?qc=images&q" + result,
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
                return
            }

            message.channel.send(urls[Math.floor(Math.random() * url.length)] + " " + message.guild.member.random());
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