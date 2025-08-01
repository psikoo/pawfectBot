const axios = require("axios");
const { SlashCommandBuilder } = require("discord.js");
require('dotenv').config()

module.exports = {
	data: new SlashCommandBuilder()
		.setName("update")
		.setDescription("Update the ip"),
	async execute(interaction) {
    // Get the current public ip
		let ipHeadersList = { "Accept": "*/*", }
		let ipHeqOptions = { 
      url: "https://api64.ipify.org?format=json", 
      method: "GET", 
      headers: ipHeadersList, 
    }
		let ipResponse = await axios.request(ipHeqOptions);
    let currentIp = ipResponse.data.ip;

    // Get domain ID
    let idData = JSON.stringify({
      "secretapikey": process.env.SECRET,
      "apikey": process.env.KEY
    });
    let idHeadersList = { 
      "Accept": "*/*", 
      'Content-Type': 'application/json',
    }
		let idReqOptions = { 
      url: process.env.API_URL+"api/json/v3/dns/retrieve/"+process.env.DOMAIN, 
      method: "POST", 
      headers: idHeadersList, 
      data: idData,
    }
		let idResponse = await axios.request(idReqOptions);
    let domainId = "";
    for(let i=0; i<idResponse.data.records.length; i++) {
      if(idResponse.data.records[i].name == process.env.DOMAIN) {
        domainId = idResponse.data.records[i].id;
        if(idResponse.data.records[i].content == currentIp) { await interaction.reply(".\n`🔴 The IP is the same`"); }
      }
    }
    if(domainId == "" || !domainId) { await interaction.reply(".\n`🔴 ERROR Domain ID is null`"); }

    // Update the DNS
    let upData = JSON.stringify({
      "secretapikey": process.env.SECRET,
      "apikey": process.env.KEY,
      "type": "A",
      "content": currentIp,
      "notes": "updated by pawfectBot "+new Date()
    });
    let upHeadersList = { 
      "Accept": "*/*", 
      'Content-Type': 'application/json',
    }
		let upReqOptions = { 
      url: process.env.API_URL+"api/json/v3/dns/edit/"+process.env.DOMAIN+"/"+domainId, 
      method: "POST", 
      headers: upHeadersList, 
      data: upData,
    }
		let upResponse = await axios.request(upReqOptions);
    if(upResponse.data.status == "SUCCESS") {
      await interaction.reply(".\n`🟢 Updated DNS record for "+process.env.DOMAIN+" to "+ currentIp+"`");
    } else {
      await interaction.reply(".\n`🔴 ERROR updating DNS record for "+process.env.DOMAIN+"`");
    }
	},
};