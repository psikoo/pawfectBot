const { SlashCommandBuilder, EmbedBuilder, MessageFlags, PermissionFlagsBits, Colors } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("createrole")
		.setDescription("Create a customizable role"),
	async execute(interaction) {
		const interactionUser = await interaction.guild.members.fetch(interaction.user.id);
		const colorRole = await interactionUser.roles.color;
    const boosterRole = await interaction.guild.roles.fetch('1375990589660598312');
    const boosterRolePos = boosterRole.position
    const colorRolePos = boosterRole.position + 1
    console.log(boosterRole)
    console.log(boosterRolePos)
    console.log(colorRolePos)

    if(!interactionUser.premiumSince) {
      const response = new EmbedBuilder()
        .setColor(0xFF0000)
        .setTitle("🟥 Error")
        .setDescription("🚫 You need to be a booster to create a customizable role")
      await interaction.reply({ embeds: [response], flags: MessageFlags.Ephemeral });
    } 
    else if(colorRole.name.includes(interactionUser.id)) {
      const response = new EmbedBuilder()
        .setColor(0xFF0000)
        .setTitle("🟥 Error")
        .setDescription("🚫 You already have a customizable role, use /customrole to manage it")
      await interaction.reply({ embeds: [response], flags: MessageFlags.Ephemeral });
    } 
    else if(interactionUser.premiumSince && !colorRole.name.includes(interactionUser.id)) {
      customRole = await interaction.guild.roles.create({
        name: interactionUser.nickname+" ["+interactionUser.id+"]",
        colors: { primaryColor: "f47fff" },
        hoist: false,
        position: colorRolePos,
        mentionable: false,
      });
      interactionUser.roles.add(customRole);
      const response = new EmbedBuilder()
        .setColor(0x00FF00)
        .setTitle("🟩 Success")
        .setDescription("Your role <@&"+customRole.id+"> has been created! Use /customrole to manage it")
      await interaction.reply({ embeds: [response] });
    } 
    else {
      const response = new EmbedBuilder()
        .setColor(0xFF0000)
        .setTitle("🟥 Error")
        .setDescription("🚫 Contact <@614870731322425374> for help!")
      await interaction.reply({ embeds: [response], flags: MessageFlags.Ephemeral });
    }
	},
};
