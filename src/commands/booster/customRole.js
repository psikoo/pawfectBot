const { SlashCommandBuilder, EmbedBuilder, MessageFlags, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("customrole")
		.setDescription("Customize color role"),
	async execute(interaction) {
		const interactionUser = await interaction.guild.members.fetch(interaction.user.id);
		const colorRole = await interactionUser.roles.color;
		if(colorRole.name.includes(interactionUser.id)) {
			const modal = new ModalBuilder()
				.setCustomId("customRoleModal")
				.setTitle("Edit your custom role");

			const Name = new TextInputBuilder()
				.setCustomId("Name")
				.setLabel("Name for your role:")
				.setStyle(TextInputStyle.Short)
				.setMaxLength(20)
				.setPlaceholder("your cool and epic name!")
				.setValue(colorRole.name.substring(0,colorRole.name.length-21))
				.setRequired(true);
			const Color1 = new TextInputBuilder()
				.setCustomId("Color1")
				.setLabel("Main Color of your role (hex without a #):")
				.setStyle(TextInputStyle.Short)
				.setMinLength(6)
				.setMaxLength(6)
				.setPlaceholder("example: ff00ff")
				.setRequired(true);
			const Color2 = new TextInputBuilder()
				.setCustomId("Color2")
				.setLabel("Second color for your role (hex without a #):")
				.setStyle(TextInputStyle.Short)
				.setMinLength(6)
				.setMaxLength(6)
				.setPlaceholder("example: ff00ff")
				.setRequired(false);

			const NameActionRow = new ActionRowBuilder().addComponents(Name);
			const Color1ActionRow = new ActionRowBuilder().addComponents(Color1);
			const Color2ActionRow = new ActionRowBuilder().addComponents(Color2);

			modal.addComponents(NameActionRow, Color1ActionRow, Color2ActionRow);
			await interaction.showModal(modal);
		} else {
			const response = new EmbedBuilder()
				.setColor(0xFF0000)
				.setTitle("🟥 Error")
				.setDescription("🚫 Your color role isn't customizable")
			await interaction.reply({ embeds: [response], flags: MessageFlags.Ephemeral });
		}
	},
};
