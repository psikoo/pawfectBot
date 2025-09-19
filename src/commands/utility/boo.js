const { SlashCommandBuilder, MessageFlags, PermissionFlagsBits, EmbedBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("boo")
		.setDescription("🍅")
		.addUserOption(option => option
			.setName("user")
			.setDescription("User the bot should mention"))
		.addStringOption(option => option
			.setName("reply")
			.setDescription("Url of a message to which the bot should reply to"))
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction) {
		let targetUser = interaction.options.getMember("user");
		let replyUrl = interaction.options.getString("reply");

		const response = new EmbedBuilder()
			.setColor(0x00FF00)
			.setTitle("🍅 Boooooooo")
			.setImage("https://i.imgur.com/eZ7F2AD.gif");

		await interaction.reply({ content: "Sending...", flags: MessageFlags.Ephemeral });
		if(targetUser) {
			response.setDescription("🍅 react <@"+targetUser.user.id+">");
			await interaction.channel.send({ embeds: [response] });
		} else if(replyUrl) {
			response.setDescription(" ");
			await interaction.channel.send({ embeds: [response], reply: { messageReference: replyUrl.split("/")[replyUrl.split("/").length-1] } });
		} else {
			response.setDescription(" ");
			await interaction.channel.send({ embeds: [response] });
		}
	},
};
