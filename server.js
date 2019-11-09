// pull in dependencies

// snatches html from urls
var request = require("request");
// scrapes the html
var cheerio = require("cheerio");

console.log("___ENTER app.js___");

// making a request call for the ONION news homepage
request("http://www.theonion.com/", function(error, response, html) {
    if (error) {
        console.log("ERROR: " + error);

    } else {
        // load the body of the html into cheerio
        var $ = cheerio.load(html);

        // empty array to save our scraped data
        var numArticles = 0;
        var scrapeResults = [];

        // with cheerio, find each article tag with the class "summary"
        $("article.summary").each(function(i, element) {
            // article data
        var title = $(this).find("header").find("a").attr("title");
        var url = "theonion.com" + $(this).find("a").attr("href");
        var date = $(this).find("a").attr("data-pubdate");
        var img = $(this).find("noscript").children("img").attr("src");
        var description = $(this).find("div.desc").text().trim();

        var articleData = {
            "index": i,
            "title": title,
            "description": description,
            "url": url,
            "date": date,
            "img": img
        };

        scrapeResults.push(articleData);
        });

        // after the program scans all of the articles, log the result
        console.log(scrapeResults);
    }
});