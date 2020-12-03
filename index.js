const TelegramBot = require('node-telegram-bot-api');
const puppeteer = require('puppeteer');

// replace the value below with the Telegram token you receive from @BotFather
const token = '1431804287:AAGWDDAPuDrq5oit-GiBtJAfXMczIUYXq3U';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});
let text = '';

(async () => {
    try {
        const browser = await puppeteer.launch({
            headless: false,
            args: [ '--proxy-server=http://109.194.175.135:9050']
        });
        const page = await browser.newPage();
        await page.setViewport({ width: 1920, height: 1080});
        await page.goto('https://www.avito.ru/rossiya#login');
        await page.screenshot({path: 'example.png'});
        await page.type('input[name=login]', '89040432785');
        await page.type('input[name=password]', '999-251296dimaD!123');
        await page.screenshot({path: 'example1.png'});

        await page.click('button[type=submit]');
        await page.waitFor(5000);
        await page.screenshot({path: 'example2.png'});
        await page.goto('https://www.avito.ru/profile/messenger');
        await page.screenshot({path: 'example3.png'});
        await page.click('a[data-marker="channels/channelLink"]');
        await page.screenshot({path: 'example4.png'});
        text = await page.evaluate(() => {
            const message = document.querySelector('div[data-marker="messageText"]');
            return message.textContent;
        });

        await browser.close();
    }
    catch (e) {
        console.log(e);
    }

})();

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, text);
});
