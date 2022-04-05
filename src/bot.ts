import { Telegraf, Context } from "telegraf";
import { mainStart } from "./functions/start";
import { commandsList } from "./functions/commands";
import * as dotenv from "dotenv";

async function bot() {
	// подгружаем все ключи из dotenv
	dotenv.config();
	const bot = new Telegraf<Context>(process.env.BOT_TOKEN);
	// ngrok http 80
	const https = 'https://2655-185-31-164-254.ngrok.io';
	await bot.telegram.setWebhook(`${https}/secret-path`);
	//@ts-ignore
	bot.startWebhook('/secret-path', null, 8000);

	const isAuth = await mainStart(bot);
	await bot.launch()
}
bot().then(cb => console.log('cb', 'запущен'));
