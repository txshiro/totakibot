const cheerio = require('cheerio');

const prefix = require('../../json/config.json')

const request = require('request');

module.exports.run = async (bot, message, args) => {

    image(message)


    function image(message) {
        let args = message.content.slice(prefix.prefix.length).split(" ");
        var search = args.toString();
        if (!search) search = "TonyTonyChopper"

        var options = {
            url: "http://results.dogpile.com/serp?qc=images&q=" + search,
            method: "GET",
            headers: {
                "Accept": "text/html",
                "User-Agent": "Chrome"
            }
        };

        request(options, function (error, response, responseBody) {
            if (error) {
                return;
            }


            $ = cheerio.load(responseBody);


            var links = $(".image a.link");

            var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));

            if (!urls.length) {

                return;
            }

            // Send result
            message.channel.send(urls[Math.floor(Math.random() * urls.length)]);
        });
    }

}

module.exports.help = {
    name: 'image',
    aliases: [],
    description: "Get random image by your choice!",
    noaliases: "None",
    accessability: "Everyone"
}