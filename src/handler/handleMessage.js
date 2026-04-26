const { storeMessage } = require("../db/create");

async function handleMessage(message) {
	if (message.author.bot) return;
	console.log("> Message log: " + message.content);
	if (message.content.includes("01JTA6SWH4MA14NYBB72DYJQHZ")) message.reply("<@&1423819248022851664>:bangbang:");
	if (message.content.includes(":3")) message.reply(":3");
	if (message.content.includes("٤:")) message.reply("٤:");
	await storeMessage(message);
}

module.exports = {
  handleMessage
};