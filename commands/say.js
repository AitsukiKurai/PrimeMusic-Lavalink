const { SlashCommandBuilder } = require('discord.js');
const config = require("../config.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('Makes the bot say something')
        .addStringOption(option =>
            option.setName('input')
                .setDescription('The text to make the bot say')
                .setRequired(true)
        ),
    async execute(interaction) {
        const input = interaction.options.getString('input');

        try {
            await interaction.reply(input);
        } catch (error) {
            console.error(error);
            await interaction.reply('Có lỗi xảy ra khi thực hiện lệnh này.');
        }
    },
};
