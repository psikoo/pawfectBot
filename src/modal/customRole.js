const axios = require("axios");
require("dotenv").config()

async function updateCustomRole(interaction) {
  const interactionUser = await interaction.guild.members.fetch(interaction.user.id)
  const colorRole = await interactionUser.roles.color;
  let color1 = Number("0x"+interaction.fields.getTextInputValue("Color1"));
  let color2 = (interaction.fields.getTextInputValue("Color2")) ? Number("0x"+interaction.fields.getTextInputValue("Color2")) : null;

  // Update name
  colorRole.setName(interaction.fields.getTextInputValue("Name")+" ["+interaction.user.id+"]");
  // Update colors - support wil be added on discord.js 15
  let data = JSON.stringify({
    "colors": {
      "primary_color": color1,
      "secondary_color": color2,
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