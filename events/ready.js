const config = require("../config.js");
const { ActivityType } = require("discord.js");

module.exports = async (client) => {
    const { REST } = require("@discordjs/rest");
    const { Routes } = require("discord-api-types/v10");
    const rest = new REST({ version: "10" }).setToken(config.TOKEN || process.env.TOKEN);

    (async () => {
        try {
            await rest.put(Routes.applicationCommands(client.user.id), {
                body: await client.commands,
            });
            console.log("✅ Commands Loaded Successfully");
        } catch (err) {
            console.error("❌ Failed to load commands:", err.message);
        }
    })();

    const defaultActivity = {
        name: config.activityName,
        type: ActivityType.Listening,
    };

    const statusMessages = config.statusMessages; // Lấy statusMessages từ config
    let statusIndex = 0;
    const statusArray = [statusMessages]; // Tạo mảng chứa statusMessages

    async function updateStatus() {
        const activePlayers = Array.from(client.riffy.players.values()).filter(player => player.playing);

        if (!activePlayers.length) {
            // Hiển thị statusMessages khi không có bài hát đang phát
            client.user.setActivity({
                name: statusArray[statusIndex],
                type: ActivityType.Listening,
            });
            statusIndex = (statusIndex + 1) % statusArray.length; // Chuyển đến status tiếp theo
            return;
        }

        const player = activePlayers[0];

        if (!player.current || !player.current.info || !player.current.info.title) {
            return;
        }

        const trackName = player.current.info.title;

        client.user.setActivity({
            name: `🎶 ${trackName}`,
            type: ActivityType.Listening,
        });
    }

    setInterval(updateStatus, 5000);

    client.errorLog = config.errorLog;
};
