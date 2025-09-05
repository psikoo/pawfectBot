const axios = require("axios");
require("dotenv").config()
const { EmbedBuilder } = require("discord.js");

const customRole = require("./modals/customRole.js");

async function handleModal(interaction) {
	if (interaction.customId === "customRoleModal") {
		await customRole.updateCustomRole(interaction);
		const interactionUser = await interaction.guild.members.fetch(interaction.user.id)
  	const colorRole = interactionUser.roles.color;

		// Get colors - support wil be added on discord.js 15
		let color1 = 0;
		let color2 = 0;
		let config = {
			method: "get",
			url: "https://discord.com/api/v10/guilds/"+process.env.BOT_GUILD_ID+"/roles/"+colorRole.id,
			headers: { 
				"Authorization": "Bot "+process.env.BOT_TOKEN, 
				"Content-Type": "application/json", 
			}
		};
		await axios.request(config).then((response) => { 
			console.log(response.data)
			color1 = response.data.colors.primary_color;
			color2 = response.data.colors.secondary_color;
		}).catch((error) => { console.log(error); });

		const color1Str = `\n - ${color1.toString(16).padStart(6, "0")}`;
		const color2Str = (color2)? `\n - ${color2.toString(16).padStart(6, "0")}` : "";
		const response = new EmbedBuilder()
			.setColor(0x00FF00)
			.setTitle("🟩 Success")
			.setDescription(`Your role <@&${colorRole.id}> was updated!${color1Str + color2Str}`)
		await interaction.reply({ embeds: [response] });
	}
}

module.exports = {
  handleModal
};