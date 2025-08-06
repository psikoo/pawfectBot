const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("killfaggot")
		.setDescription("Ban a user")
		.addUserOption(option => option
			.setName("user")
			.setDescription("User to ban")
			.setRequired(true))
		.addBooleanOption(option => option
			.setName("keep")
			.setDescription("Keep the messages from the user"))
		.addStringOption(option => option
			.setName("reason")
			.setDescription("Reason for the ban"))
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction) {
		let targetUser = interaction.options.getMember("user");
		let keepMessages = interaction.options.getBoolean("keep");
		let banReason = interaction.options.getString("reason");

		if(targetUser === null) {
			const response = new EmbedBuilder()
				.setColor(0xFF0000)
				.setTitle("🟥 Error")
				.setDescription("🚫 This user is not part of this server!")
			interaction.reply({embeds: [response]});
		} else if(!targetUser.bannable) {
			const response = new EmbedBuilder()
				.setColor(0xFF0000)
				.setTitle("🟥 Error")
				.setDescription("🚫 Can't ban <@"+targetUser.user.id+"> missing permissions")
			interaction.reply({embeds: [response]});
		} else {
			if(keepMessages == true || !keepMessages) keepMessages = 0;
			else keepMessages = 604800;
			targetUser.ban({ reason: banReason, deleteMessageSeconds: keepMessages });
			const response = new EmbedBuilder()
				.setColor(0x00FF00)
				.setTitle("🟩 Success")
				.setDescription("⛔ banned <@"+targetUser.user.id+">, for "+banReason+".")
			interaction.reply({embeds: [response]});
		}
	},
};
