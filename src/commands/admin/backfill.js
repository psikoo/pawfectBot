
const { storeMessage } = require('../../db/create.js');
const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("backfill")
		.setDescription("DO NOT RUN IF YOU DONT KNOW WHAT YOU ARE DOING")
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction) {
		const channels = interaction.guild.channels.cache.filter(c => c.isTextBased());
		interaction.channel.send(`[SERVER SCAN] Found ${channels.size} channels to index`);
		
    let serverTotal = 0;
		let currentChannel = 0;
    for (const channel of channels.values()) {
			const count = await fetchChannelHistory(channel, interaction);
			serverTotal += count;
			interaction.channel.send(`[SERVER SCAN] Fetched ${++currentChannel} channels`);
			await new Promise(resolve => setTimeout(resolve, 3000));
    }

    console.log(`[SERVER SCAN] Server indexing complete. Total: ${serverTotal} messages.`);
    return serverTotal;
	},
};

async function fetchChannelHistory(channel, interaction) {
	let lastId = null;
	let totalFetched = 0;

	interaction.channel.send(`[CRAWLER] Starting: #${channel.name}`);

	while (true) {
		try {
			const options = { limit: 100 };
			if(lastId) options.before = lastId;
			// Fetch batch
			const messages = await channel.messages.fetch(options);
			if(messages.size === 0) break;
			// Save to batch
			for(const message of messages.values()) {
				if(!message.author.bot || !message.content || message.content.trim().length === 0) await storeMessage(message);
			}
			// Set new start point
			lastId = messages.last().id;
			totalFetched += messages.size;
			interaction.channel.send(`[CRAWLER] #${channel.name}: ${totalFetched} messages saved.`);
			// Wait to avoid rate limit
			await new Promise(resolve => setTimeout(resolve, 1500));
		} catch (error) {
			if (error.code === 50001) {
				interaction.channel.send(`[ERROR] Missing Access to #${channel.name}`);
				break;
			}
			interaction.channel.send(`[ERROR] Error in #${channel.name}: `+error);
			break; 
		}
	}
	return totalFetched;
}