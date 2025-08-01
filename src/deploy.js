const { REST, Routes } = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");
require('dotenv').config()

const commands = [];
const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ("data" in command && "execute" in command) {
			commands.push(command.data.toJSON());
		} else {
			console.log(`🟥 command: ${filePath}`);
		}
	}
}

const rest = new REST().setToken(process.env.BOT_TOKEN);

(async () => {
	try {
		console.log(`🟧 Refreshing ${commands.length} application (/) commands.`);

		const data = await rest.put(
			Routes.applicationGuildCommands(process.env.BOT_CLIENT_ID, process.env.BOT_GUILD_ID),
			{ body: commands },
		);

		console.log(`🟩 Reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();
