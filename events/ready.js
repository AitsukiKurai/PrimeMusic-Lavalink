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

        type: ActivityType.Listening

    };



    async function updateStatus() {



        const activePlayers = Array.from(client.riffy.players.values()).filter(player => player.playing);



        if (!activePlayers.length) {

            //console.log("⏹️ No song is currently playing. Setting default status.");

            client.user.setActivity(defaultActivity);

            return;

        }



        const player = activePlayers[0];



        if (!player.current || !player.current.info || !player.current.info.title) {

            //console.log("⚠️ Current track info is missing. Keeping default status.");

            return;

        }



        const trackName = player.current.info.title;

        //console.log(`🎵 Now Playing: ${trackName}`);



        client.user.setActivity({

            name: `🎶 ${trackName}`, // Thêm biểu tượng nốt nhạc cho phù hợp

            type: ActivityType.Listening // Thay đổi thành Listening

        });

    }



    setInterval(updateStatus, 5000);



    client.errorLog = config.errorLog;

};
