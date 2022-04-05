import * as path from "path";
const fs = require("fs");

export function mainStart(bot) {
	bot.start((ctx) => {
		const DB = JSON.parse(fs.readFileSync(path.dirname(__dirname) + '/DB/DB.json', 'utf8'));
		const USER = ctx.update.message.from;
		const isAuthUser = Boolean(DB[USER.username]);
		//* приветствие пользователя если он был авторизован
		if(isAuthUser) {
			const userFromDB = DB[USER.username];
			ctx.reply(`Привет, ${userFromDB.appeal || userFromDB.first_name}`);
		} else {
			//* если нет, то знакомимся (просим ввести имя)
			ctx.reply(`Привет, давай познакомимся. Как тебя зовут?`);
			bot.on('message', (ctx) => {
				const newUser: any = {};
				for(const key in USER) {
					newUser[key] = USER[key];
				}
				//** обращение
				newUser.appeal = ctx.update.message.text;
				//** подписка
				newUser.subscription = {};
				newUser.subscription.active_subscription = false;
				newUser.subscription.active_subscription_time = 0;
				DB[newUser.username] = newUser;
				fs.writeFileSync(path.dirname(__dirname) + '/DB/DB.json', JSON.stringify(DB, null, 2), 'utf-8');
			})
		}
	})
	// ctx.reply('Выбор', Markup
	// 	.keyboard(['Кофе', 'Чай', 'Смузи'])
	// 	.oneTime()
	// 	.resize()
	// )
}
