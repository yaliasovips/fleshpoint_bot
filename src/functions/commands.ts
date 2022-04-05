export async function commandsList(bot){
	bot.command('/sos', (ctx) => {
		console.log(ctx.update.message.from);
		ctx.reply('123');
	})
	bot.command('findmatch', (ctx) => ctx.reply('Three matches found'));
}
