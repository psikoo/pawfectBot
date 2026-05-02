const { SlashCommandBuilder, MessageFlags, PermissionFlagsBits, EmbedBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("sog")
		.setDescription("The soggening")
		.addUserOption(option => option
			.setName("user")
			.setDescription("User to be sogged")
			.setRequired(true))
		.addStringOption((option) => option
			.setName('animal')
			.setDescription('choose a soggy animal')
			.addChoices(
				{ name: 'cat', value: 'cat' },
				{ name: 'dog', value: 'dog' },
				{ name: 'owl', value: 'owl' },
			),
		),
	async execute(interaction) {
		let targetUser = interaction.options.getMember("user");
		let animal = interaction.options.getString("animal");

		const dog = '[dog](https://tenor.com/view/water-spray-dog-hose-gif-5915950447361850547 "mwehehhe")';
		const cat = '[cat](https://tenor.com/view/cat-doe-how-is-this-man-how-is-this-cat-he-be-starring-doe-wet-bath-gif-17193684 "mwehehhe")';
		const owl = '[owl](https://tenor.com/view/wet-owl-gif-5658056727679848013 "mwehehhe")';
		let reply = "<@"+targetUser.id+"> get sogged dummy!! "

		if(animal == "dog") reply += dog;
		if(animal == "cat") reply += cat;
		if(animal == "owl") reply += owl;

		await interaction.reply({ content: reply, allowedMentions: { parse: [] } });
	},
};
