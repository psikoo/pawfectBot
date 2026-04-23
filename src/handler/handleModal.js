const axios = require("axios");
require("dotenv").config()
const { EmbedBuilder } = require("discord.js");

const customRole = require("../modals/customRole.js");

async function handleModal(interaction) {
	if (interaction.customId === "customRoleModal") {
		await customRole.updateCustomRole(interaction);
		const interactionUser = await interaction.guild.members.fetch(interaction.user.id)
  	const colorRole = interactionUser.roles.color;

		const response = new EmbedBuilder()
			.setColor(0x00FF00)
			.setTitle("🟩 Success")
			.setDescription(`Your role <@&${colorRole.id}> was updated!\n> ${colorRole.colors.primaryColor}\n${colorRole.colors.secondaryColor? "> "+colorRole.colors.secondaryColor : ""}`)
		await interaction.reply({ embeds: [response] });
	}
}

module.exports = {
  handleModal
};