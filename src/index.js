let Parser = require('rss-parser');

let bbcRSS = "https://feeds.bbci.co.uk/news/world/rss.xml";
let abcRSS = "https://abcnews.com/abcnews/topstories";

export default {
	async scheduled(event, env, ctx) {
		let bbcResp = await fetch(bbcRSS);
		let abcResp = await fetch(abcRSS);
		let bbcSuccessful = bbcResp.ok ? 'success' : 'fail';
		let abcSuccessful = abcResp.ok ? 'success' : 'fail';


		console.log(`trigger fired at ${event.cron}: ${bbcSuccessful} , ${abcSuccessful}`);
	},
};
