const { SlashCommandBuilder, MessageFlags, PermissionFlagsBits, EmbedBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("sog")
		.setDescription("The soggening")
		.addUserOption(option => option
			.setName("user")
			.setDescription("User to be sogged")
			.setRequired(true))
		.addStringOption(option => option
			.setName("cat/dog")
			.setDescription("choose between 'cat' or 'dog'")),
	async execute(interaction) {
		let targetUser = interaction.options.getMember("user");
		let animal = interaction.options.getString("cat/dog");

		const dog = '[dog](https://tenor.com/view/water-spray-dog-hose-gif-5915950447361850547 "mwehehhe")';
		const cat = '[cat](https://tenor.com/view/cat-doe-how-is-this-man-how-is-this-cat-he-be-starring-doe-wet-bath-gif-17193684 "mwehehhe")';
		let reply = "<@"+targetUser.id+"> get sogged dummy!! "

		if(animal == "dog") reply += dog;
		if(animal == "cat") reply += cat;

		await interaction.reply({ content: reply, allowedMentions: { parse: [] } });
	},
};
