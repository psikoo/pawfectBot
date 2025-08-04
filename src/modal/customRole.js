const axios = require("axios");
require("dotenv").config()

async function updateCustomRole(interaction) {
  const interactionUser = await interaction.guild.members.fetch(interaction.user.id)
  const colorRole = await interactionUser.roles.color;
  const color1 = (interaction.fields.getTextInputValue("Color1") == "000000")? "010101" : interaction.fields.getTextInputValue("Color1");
  const color2 = (interaction.fields.getTextInputValue("Color2")) ? interaction.fields.getTextInputValue("Color2") : null;
  const hex1 = Number("0x"+color1);
  const hex2 = (color2)? Number("0x"+color2) : null;

  // Update name
  colorRole.setName(interaction.fields.getTextInputValue("Name")+" ["+interaction.user.id+"]");
  // Update colors - support wil be added on discord.js 15
  let data = JSON.stringify({
    "colors": {
      "primary_color": hex1,
      "secondary_color": hex2,
      "tertiary_color": null
    }
  });

  let config = {
    method: "patch",
    url: "https://discord.com/api/v10/guilds/"+process.env.BOT_GUILD_ID+"/roles/"+colorRole.id,
    headers: { 
      "Authorization": "Bot "+process.env.BOT_TOKEN, 
      "Content-Type": "application/json", 
    },
    data : data
  };

  axios.request(config)
  .then((response) => {
    // console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log(error);
  });

}

module.exports = {
  updateCustomRole
};