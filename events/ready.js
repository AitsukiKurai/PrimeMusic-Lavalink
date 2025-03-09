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

    const statusMessages = config.statusMessages;
    let statusIndex = 0;
    const statusArray = [statusMessages];

    async function updateStatus() {
        const activePlayers = Array.from(client.riffy.players.values()).filter(player => player.playing);

        if (!activePlayers.length) {
            // Hiển thị statusMessages khi không có bài hát
            client.user.setActivity({
                name: statusArray[statusIndex],
                type: ActivityType.Listening,
            });
            statusIndex = (statusIndex + 1) % statusArray.length;
            return;
        }

        const player = activePlayers[0];

        if (!player.current || !player.current.info || !player.current.info.title) {
            return;
        }

        const trackName = player.current.info.title;

        // Hiển thị cả tên bài hát và statusMessages khi đang phát nhạc
        client.user.setActivity({
            name: ` ${trackName} - ${statusMessages}`,
            type: ActivityType.Listening,
        });
    }

    setInterval(updateStatus, 5000);

    client.errorLog = config.errorLog;
};
