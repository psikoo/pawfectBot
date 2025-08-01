const { SlashCommandBuilder, MessageFlags } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("echo")
		.setDescription("Are we in a cave?")
		.addStringOption(option => option
			.setName("message")
			.setDescription("Message to echo")
			.setRequired(true)),
	async execute(interaction) {
		await interaction.reply({ content: "Sending...", flags: MessageFlags.Ephemeral });
		await interaction.channel.send(interaction.options.getString("message"));
	},
};
