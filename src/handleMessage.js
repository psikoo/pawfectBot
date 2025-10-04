async function handleMessage(message) {
	console.log("> Message log: " + message.content);
	if (message.content.includes("01JTA6SWH4MA14NYBB72DYJQHZ")) message.reply("<@&1423819248022851664>:bangbang:");
}

module.exports = {
  handleMessage
};