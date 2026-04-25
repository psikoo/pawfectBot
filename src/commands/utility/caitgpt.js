const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { getMessage } = require("../../db/read.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("caitgpt")
		.setDescription("Generate me a message from pawfect"),
	async execute(interaction) {
		const row = await getMessage();
		console.log("caitgpt: "+row[0].content);
		await interaction.reply({ content: row[0].content, allowedMentions: { parse: [] } });
	},
};
