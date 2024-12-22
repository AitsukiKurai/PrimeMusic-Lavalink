const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('say')
    .setDescription('Làm cho bot nói bất cứ điều gì bạn muốn!')
    .addStringOption(option =>
      option.setName('input')
        .setDescription('Văn bản bạn muốn bot nói')
        .setRequired(true)
    ),
  async execute(interaction) {
    const input = interaction.options.getString('input');
    await interaction.reply(input);
  },
};
