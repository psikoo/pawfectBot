const { SlashCommandBuilder, MessageFlags, PermissionFlagsBits } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("echo")
		.setDescription("Are we in a cave?")
		.addStringOption(option => option
			.setName("message")
			.setDescription("Message to echo")
			.setRequired(true))
		.addStringOption(option => option
			.setName("reply")
			.setDescription("Url of a message to which the bot should reply to"))
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction) {
		await interaction.reply({ content: "Sending...", flags: MessageFlags.Ephemeral });
		if(interaction.options.getString("reply")) {
			await interaction.channel.send({ content: interaction.options.getString("message"), reply: { messageReference: interaction.options.getString("reply").split("/")[interaction.options.getString("reply").split("/").length-1] } });
		} else {
			await interaction.channel.send(interaction.options.getString("message"));
		}
	},
};
