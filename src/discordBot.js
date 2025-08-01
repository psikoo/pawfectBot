const fs = require("node:fs");
const path = require("node:path");
const { Client, Collection, Events, GatewayIntentBits, version, EmbedBuilder } = require("discord.js");
require("dotenv").config()

const customRole = require("./modal/customRole.js");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

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
  if (!interaction.isChatInputCommand()) return;
	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`🟥 ${interaction.commandName} doesn"t exist`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: "🟥 Error executing command", ephemeral: true });
		} else {
			await interaction.reply({ content: "🟥 Error executing command", ephemeral: true });
		}
	}
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isModalSubmit()) return;
	if (interaction.customId === "customRoleModal") {
		await customRole.updateCustomRole(interaction);
		const interactionUser = await interaction.guild.members.fetch(interaction.user.id)
  	const colorRole = interactionUser.roles.color;
		const response = new EmbedBuilder()
			.setColor(0x00FF00)
			.setTitle("🟩 Success")
			.setDescription(`Your role <@&${colorRole.id}> was updated!`)
		await interaction.reply({ embeds: [response] });
	}
});

client.login(process.env.BOT_TOKEN);
