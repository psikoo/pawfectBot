const axios = require("axios");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("ip")
		.setDescription("Returns a router's public ip"),
	async execute(interaction) {
		let headersList = {
			"Accept": "*/*",
		}
		let reqOptions = {
				url: "https://api64.ipify.org?format=json",
				method: "GET",
				headers: headersList,
		}
		let response = await axios.request(reqOptions);
		await interaction.reply(".\n`"+response.data.ip+"`");
	},
};
