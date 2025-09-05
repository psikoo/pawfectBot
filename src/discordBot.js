const fs = require("node:fs");
const path = require("node:path");
const { Client, Collection, Events, GatewayIntentBits, version } = require("discord.js");
require("dotenv").config()

const modal = require("./handleModal.js");
const command = require("./handleCommand.js");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Command Status
console.log("Discord.js version: "+version);
console.log("> --------------------------------- <");
client.commands = new Collection();
const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);
for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ("data" in command && "execute" in command) {
			client.commands.set(command.data.name, command);
      console.log(`🟩 command: ${command.data.name}`);
		} else {
			console.log(`🟥 command: ${filePath}`);
		}
	}
}

client.once(Events.ClientReady, readyClient => {
  console.log("> --------------------------------- <");
	console.log(`🟩 Session started: ${readyClient.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
	if (interaction.isModalSubmit()) modal.handleModal(interaction);
  else if (interaction.isChatInputCommand()) command.handleCommand(interaction);
});

client.login(process.env.BOT_TOKEN);
