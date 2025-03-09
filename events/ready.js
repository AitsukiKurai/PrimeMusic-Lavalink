

const config = require("../config.js");
const { ActivityType } = require("discord.js");

module.exports = async (client) => {
    // ... (phần đăng ký lệnh)

    const defaultActivity = {
        name: config.activityName + "A" + config.statusMessages, // Thêm statusMessages vào tên hoạt động
        type: ActivityType.Listening
    };

    async function updateStatus() {
        // ... (phần kiểm tra bài hát)

        if (!activePlayers.length) {
            client.user.setActivity(defaultActivity);
            return;
        }

        // ... (phần hiển thị tên bài hát)
    }

    setInterval(updateStatus, 5000);

    client.errorLog = config.errorLog;
};
