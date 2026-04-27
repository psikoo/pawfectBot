const { SlashCommandBuilder, MessageFlags, PermissionFlagsBits, EmbedBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("sog")
		.setDescription("The soggening")
		.addUserOption(option => option
			.setName("user")
			.setDescription("User to be sogged")),
	async execute(interaction) {
		let targetUser = interaction.options.getMember("user");

		await interaction.reply({ content: "<@"+targetUser.id+"> get sogged dummy!!", allowedMentions: { parse: [] } });
	},
};
