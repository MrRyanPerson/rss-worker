let Parser = require('rss-parser');

let parser = new Parser();

let bbcRSS = "https://feeds.bbci.co.uk/news/world/rss.xml";
let abcRSS = "https://abcnews.com/abcnews/topstories";

export default {
	async scheduled(event, env, ctx) {
		let bbcFeed = await parser.parseURL(bbcRSS);
		let abcFeed = await parser.parseURL(abcRSS);

		console.log(`trigger fired at ${event.cron}: ${bbcFeed.title}, ${abcFeed.title}`);

		await env.RSS_STORAGE.put(bbcFeed.title + ".json", JSON.stringify(bbcFeed.items));
		await env.RSS_STORAGE.put(abcFeed.title + ".json", JSON.stringify(abcFeed.items));

	},
};
