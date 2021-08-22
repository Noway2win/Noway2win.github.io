const puppeteer = require('puppeteer');
const { CreateLine } = require('./unit.js');



test('test line', () => {
	const text = CreateLine('hello');
	expect(text).toBe('hello test');
})

// test('open main page log in and log out', async () => {
// 	const browser = await puppeteer.launch({
// 		headless: false,
// 		slowMo: 80,
// 		args: ['--window-size=1920,1280', '--disable-web-security', '--disable-features=IsolateOrigins', ' --disable-site-isolation-trials'],
// 		handleSIGTERM: false,
// 		handleSIGHUP: false,
// 	});
// const username = 'TestingPup1246'
// const email = 'Testing12346@google.com';
// const password = '12344321';
// 	const page = await browser.newPage();
// 	await page.goto(
// 		'https://react-redux.realworld.io/'
// 	);
// 	await page.click("a[href='#register']");
// 	await page.type('[placeholder="Username"]', username);
// 	await page.type('[placeholder="Email"]', email);
// 	await page.type('[placeholder="Password"]', password);
// 	await page.click('.btn.btn-lg.btn-primary.pull-xs-right[type="submit"]');
// 	await page.screenshot({ path: 'test.png' });
// 	await page.waitForTimeout(20000);
// 	await page.click("a[href='#settings']");
// 	await page.click('.btn.btn-outline-danger');
// 	await page.click("a[href='#login']");
// 	await page.type('[placeholder="Email"]', email);
// 	await page.type('[placeholder="Password"]', password);
// 	await page.click('.btn.btn-lg.btn-primary.pull-xs-right[type="submit"]');
// 	await page.waitForTimeout(400000);
// 	// await page.type('input#age', '28');
// 	// await page.click('#btnAddUser');
// 	// const finalText = await page.$eval('.user-item', el => el.textContent);
// 	// expect(finalText).toBe('Anna (28 years old)');
// }, 100000);

test('log in and add post', async () => {
	const browser = await puppeteer.launch({
		headless: false,
		slowMo: 80,
		args: ['--window-size=1920,1280', '--disable-web-security', '--disable-features=IsolateOrigins', ' --disable-site-isolation-trials'],
		handleSIGTERM: false,
		handleSIGHUP: false,
	});
	const username = 'dima1337'
	const email = 'noway2test2@gmail.com';
	const password = '13377331';
	const articleTitle = 'test with Jest+puppeteer';
	const articleAbout = 'About my luck';
	const articleContent = 'Added by jest and Puppeteer)';
	const page = await browser.newPage();
	await page.goto(
		'https://react-redux.realworld.io/'
	);
	await page.click("a[href='#login']");
	await page.type('[placeholder="Email"]', email);
	await page.type('[placeholder="Password"]', password);
	await page.click('.btn.btn-lg.btn-primary.pull-xs-right[type="submit"]');
	await page.waitForTimeout(400);
	const popularTag = await page.$eval('.tag-default.tag-pill', el => el.textContent);
	await page.click("a[href='#editor']");
	await page.type('[placeholder="Article Title"]', articleTitle);
	await page.type(`[placeholder="What's this article about?"]`, articleAbout);
	await page.type('[placeholder="Write your article (in markdown)"]', articleContent);
	await page.type('[placeholder="Enter tags"]', popularTag);
	await page.click('.btn.btn-lg.pull-xs-right.btn-primary[type="button"]');
	await page.click("a[href='#']");
	await page.click("ul.nav.nav-pills.outline-active li:last-child a");
	await page.waitForTimeout(4000);
	const results = await page.$$eval('div.article-meta div.info a.author', (articles) =>
		articles.map((article) => article.textContent)
	);
	console.log(results);
	// await page.waitForTimeout(400000);
	await expect(results.includes(username)).toBeTruthy();
}, 400000);