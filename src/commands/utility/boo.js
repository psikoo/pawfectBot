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

		const embed = new EmbedBuilder()
			.setTitle("🍅 Boooooooo")
			.setImage("https://i.imgur.com/eZ7F2AD.gif")
			.setFooter({
				text: "PawfectBot /boo",
				iconURL: "https://cdn.discordapp.com/avatars/1400802530144944138/25826bb9713f5a6eb9fb73e75152a524.webp?size=32",
			})
			.setTimestamp();

		await interaction.reply({ content: "Sending...", flags: MessageFlags.Ephemeral });
		if(targetUser) {
			embed.setDescription("🍅 react <@"+targetUser.user.id+">");
			await interaction.channel.send({ embeds: [embed] });
		} else if(replyUrl) {
			embed.setDescription(" ");
			await interaction.channel.send({ embeds: [embed], reply: { messageReference: replyUrl.split("/")[replyUrl.split("/").length-1] } });
		} else {
			embed.setDescription(" ");
			await interaction.channel.send({ embeds: [embed] });
		}
	},
};
