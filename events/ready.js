const config = require("../config.js");
const { ActivityType } = require("discord.js");

module.exports = async (client) => {
    // ... (phần đăng ký lệnh)

    const defaultActivity = {
        name: config.activityName,
        type: ActivityType.Listening
    };

    const statusMessages = config.statusMessages;
    let statusIndex = 0;
    const statusArray = [statusMessages];

    async function updateStatus() {
        const activePlayers = Array.from(client.riffy.players.values()).filter(player => player.playing);

        if (!activePlayers.length) {
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

        client.user.setActivity({
            name: `🎶 ${trackName}`,
            type: ActivityType.Listening
        });
    }

    setInterval(updateStatus, 5000);

    client.errorLog = config.errorLog;
};
