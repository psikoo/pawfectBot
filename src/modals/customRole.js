const axios = require("axios");
require("dotenv").config()

async function updateCustomRole(interaction) {
  const interactionUser = await interaction.guild.members.fetch(interaction.user.id)
  const colorRole = await interactionUser.roles.color;
  const hex1 = (interaction.fields.getTextInputValue("Color1") == "000000")? "010101" : interaction.fields.getTextInputValue("Color1");
  const hex2 = (interaction.fields.getTextInputValue("Color2")) ? interaction.fields.getTextInputValue("Color2") : null;
  const color1 = Number("0x"+hex1);
  const color2 = (hex2)? Number("0x"+hex2) : null;

  // Update name
  colorRole.setName(interaction.fields.getTextInputValue("Name")+" ["+interaction.user.id+"]");
  colorRole.setColors({ primaryColor: color1, secondaryColor: color2, tertiaryColor: null });
}

module.exports = {
  updateCustomRole
};