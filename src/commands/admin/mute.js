const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("shutup")
		.setDescription("Mute a user")
		.addUserOption(option => option
			.setName("user")
			.setDescription("User to mute")
			.setRequired(true))
		.addNumberOption(option => option
			.setName("time")
			.setDescription("Time in minutes")
			.setRequired(true))
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction) {
		let targetUser = interaction.options.getMember("user");
		let muteTime = interaction.options.getNumber("time");

		if(targetUser === null) {
			const response = new EmbedBuilder()
				.setColor(0xFF0000)
				.setTitle("🟥 Error")
				.setDescription("🚫 This user is not part of this server!")
			interaction.reply({embeds: [response]});
		} else if(!targetUser.manageable) {
			const response = new EmbedBuilder()
				.setColor(0xFF0000)
				.setTitle("🟥 Error")
				.setDescription("🚫 Can't mute <@"+targetUser.user.id+"> missing permissions")
			interaction.reply({embeds: [response]});
		} else {
			targetUser.timeout(muteTime*60*1000, "shush")
			const response = new EmbedBuilder()
				.setColor(0x00FF00)
				.setTitle("🟩 Success")
				.setDescription("⛔ Muted <@"+targetUser.user.id+">")
				.setImage("https://cdn.discordapp.com/attachments/1375288772987715735/1406076443200585780/image0.gif?ex=68a1263b&is=689fd4bb&hm=689150c9c45f67ccc590301d409c605c74da212934fc52045cf82c8c415f2407&")
			interaction.reply({embeds: [response]});
		}
	},
};

