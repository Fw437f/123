const moment = require('moment-timezone')

module.exports = {
    name: "report",
    alias: ["issue"],
    desc: "Um dem Eigentümer ein Problem zu melden",
    cool:3600,
    category: "Group",
    usage: `report <describe issue>`,
    react: "🍁",
    start: async (
      Miku,
      m,
      { text, prefix, isBotAdmin, isAdmin, pushName, metadata, args }
    ) => {
        if(!m.isGroup){
            if (!args[0]) return m.reply(`Bitte senden Sie eine Nachricht, um Entwickler zu melden !`);
            let userTag = m.sender.split("@")[0];
            let userMess = args.join(" ");
            let userName = pushName;

            try {
                userPfp = await Miku.profilePictureUrl(m.sender, "image");
              } catch (e) {
                userPfp = botImage3;
              }

            let reportMessage = `              *「 Bericht erhalten 」*\n\n*👤 Berichtet von:* @${userTag}\n\n*📝 Nachricht:* ${userMess}\n\n*📅 Datum:* ${moment().tz('Asia/Kolkata').format('DD/MM/YYYY')}\n*⏰ Zeit:* ${moment().tz('Asia/Kolkata').format('hh:mm:ss A')}\n*🍁 Charakter verwenden:* ${botName}\n\n*📌 Notizt: Dies ist eine automatisierte Nachricht, bitte antworten Sie nicht auf diese Nachricht, um eine Blockierung zu vermeiden.*`;
            m.reply(`Senden des Berichts an den Hauptentwickler...\n\nWenn es sich um Spam handelt, werden Sie möglicherweise *blockiert* und *gesperrt*.`);
            
            let devs = [`4915212908434@s.whatsapp.net`]

            for (let i = 0; i < devs.length; i++) {
              await Miku.sendMessage(devs[i],{image: {url: userPfp}, caption: reportMessage,mentions: [m.sender],});
            }
        }
        else{
            if (!args[0]) return m.reply(`Bitte senden Sie eine Nachricht, um Entwickler zu melden !`);
            let userTag = m.sender.split("@")[0];
            let userMess = args.join(" ");
            let userName = pushName;
            let gcName = metadata.subject;

            try {
                ppgc = await Miku.profilePictureUrl(m.from, "image");
              } catch {
                ppgc = botImage3;
              }
              let reportMessage = `              *「 Bericht erhalten 」*\n\n*👤 Berichtet von:* @${userTag}\n*🧩 Gruppenname:* ${gcName}\n\n*📝 Nachricht:* ${userMess}\n\n*📅 Datum:* ${moment().tz('Asia/Kolkata').format('DD/MM/YYYY')}\n*⏰ Zeit:* ${moment().tz('Asia/Kolkata').format('hh:mm:ss A')}\n*🍁 Charakter verwenden:* ${botName}\n\n*📌 Notizt: Dies ist eine automatisierte Nachricht, bitte antworten Sie nicht auf diese Nachricht, um eine Blockierung zu vermeiden.*`;
              m.reply(`Senden des Berichts an den Hauptentwickler...\n\nWenn es sich um Spam handelt, werden Sie möglicherweise *blockiert* und *gesperrt*.`);

              let devs = [`4915212908434@s.whatsapp.net`]

              for (let i = 0; i < devs.length; i++) {
                await Miku.sendMessage(devs[i],{image: {url: ppgc}, caption: reportMessage,mentions: [m.sender],});
            }
        }
    }
}
