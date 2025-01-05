const { SlashCommandBuilder } = require('discord.js');
const config = require("../config.js");
module.exports = {
data: new SlashCommandBuilder()
.setName('say')
.setDescription('Make the bot repeat a message')
.addStringOption(option =>
option.setName('message')
.setDescription('The message to repeat')
.setRequired(true)
),
async execute(interaction, client) {
const message = interaction.options.getString('message');
await interaction.reply(message);
},
};
