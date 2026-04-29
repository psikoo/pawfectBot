const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { getRank } = require("../../db/read.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("rank")
		.setDescription("Whats my rank?"),
	async execute(interaction) {
		const rows = await getRank(interaction.user.id);
		if(rows.length === 0) return interaction.reply("No data found yet! :3");

		const embed = new EmbedBuilder()
			.setTitle(interaction.user.username)
			.setFooter({
				text: "PawfectBot /rank",
				iconURL: "https://cdn.discordapp.com/avatars/1400802530144944138/25826bb9713f5a6eb9fb73e75152a524.webp?size=32",
			})
			.setTimestamp();

		rows.forEach((row, index) => {
			const user = interaction.client.users.cache.get(row.author_id);
			const username = user ? user.username : `${row.author_id}`;
			embed.addFields({
				name: "Top "+row.rank_position,
				value: "<@"+row.author_id+"> - "+row.message_count.toString()+" messages",
				inline: false
			})
		});

		await interaction.reply({ embeds: [embed], allowedMentions: { parse: [] } });
	},
};
