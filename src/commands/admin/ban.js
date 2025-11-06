const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("killfaggot")
		.setDescription("Ban a user")
		.addUserOption(option => option
			.setName("user")
			.setDescription("User to ban"))
		.addStringOption(option => option
			.setName("id")
			.setDescription("Id to ban"))
		.addBooleanOption(option => option
			.setName("keep")
			.setDescription("Keep the messages from the user"))
		.addStringOption(option => option
			.setName("reason")
			.setDescription("Reason for the ban"))
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction) {
		let targetUser = interaction.options.getMember("user");
		let targetId = interaction.options.getString("id");
		let keepMessages = interaction.options.getBoolean("keep");
		let banReason = interaction.options.getString("reason");

		if(targetUser === null) {
			if(targetId === null ) {
				const response = new EmbedBuilder()
					.setColor(0x00FF00)
					.setTitle("⚠ Killfaggot")
					.setDescription("OwO, what faggot should I kill!")
					.setImage("https://i.imgur.com/g5C3kq9.gif")
				interaction.reply({embeds: [response]});
			} else {
				if(keepMessages == true || !keepMessages) keepMessages = 0;
				else keepMessages = 604800;
				interaction.guild.members.ban(targetId, { reason: banReason, deleteMessageSeconds: keepMessages });
				const response = new EmbedBuilder()
					.setColor(0x00FF00)
					.setTitle("🟩 Success")
					.setDescription("⛔ banned <@"+targetId+">, for "+banReason+".")
					.setImage("https://cdn.discordapp.com/attachments/1375288772987715735/1406076443200585780/image0.gif?ex=68a1263b&is=689fd4bb&hm=689150c9c45f67ccc590301d409c605c74da212934fc52045cf82c8c415f2407&")
				interaction.reply({embeds: [response]});
			}
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
				.setImage("https://cdn.discordapp.com/attachments/1375288772987715735/1406076443200585780/image0.gif?ex=68a1263b&is=689fd4bb&hm=689150c9c45f67ccc590301d409c605c74da212934fc52045cf82c8c415f2407&")
			interaction.reply({embeds: [response]});
		}
	},
};

