let Parser = require('rss-parser');

let parser = new Parser();

let bbcRSS = "https://feeds.bbci.co.uk/news/world/rss.xml";
let abcRSS = "https://abcnews.com/abcnews/topstories";

export default {
	async scheduled(event, env, ctx) {
		let bbcFeed = await parser.parseURL(bbcRSS);
		let abcFeed = await parser.parseURL(abcRSS);

		console.log(`trigger fired at ${event.cron}: ${bbcFeed.title}, ${abcFeed.title}`);

		// delete old feeds before putting new ones
		await env.RSS_STORAGE.delete("bbcFeed" + ".json");
		await env.RSS_STORAGE.delete("abcFeed" + ".json");

		// put new feeds in storage
		await env.RSS_STORAGE.put("bbcFeed" + ".json", JSON.stringify(bbcFeed.items));
		await env.RSS_STORAGE.put("abcFeed" + ".json", JSON.stringify(abcFeed.items));

		console.log("feeds updated in storage");


	},
};
