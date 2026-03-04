let Parser = require('rss-parser');

let parser = new Parser({
  customFields: {
    item: [
      ['media:thumbnail', 'mediathumbnail'],
    ]
  }
});

let bbcRSS = "https://feeds.bbci.co.uk/news/world/rss.xml";
let abcRSS = "https://abcnews.com/abcnews/topstories";
let wsjRSS = "https://feeds.content.dowjones.io/public/rss/RSSWorldNews";

export default {
	async scheduled(event, env, ctx) {
		let bbcFeed = await parser.parseURL(bbcRSS);
		let abcFeed = await parser.parseURL(abcRSS);
		let wsjFeed = await parser.parseURL(wsjRSS);

		console.log(`trigger fired at ${event.cron}: ${bbcFeed.title}, ${abcFeed.title}`);

		// delete old feeds before putting new ones
		await env.RSS_STORAGE.delete("bbcFeed" + ".json");
		await env.RSS_STORAGE.delete("abcFeed" + ".json");
		await env.RSS_STORAGE.delete("wsjFeed" + ".json");

		// put new feeds in storage
		await env.RSS_STORAGE.put("bbcFeed" + ".json", JSON.stringify(bbcFeed.items));
		await env.RSS_STORAGE.put("abcFeed" + ".json", JSON.stringify(abcFeed.items));
		await env.RSS_STORAGE.put("wsjFeed" + ".json", JSON.stringify(wsjFeed.items));

		console.log("feeds updated in storage");


	},
};
