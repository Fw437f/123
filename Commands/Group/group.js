module.exports = {
    name: "group",
    alias: ["gc", "group open"],
    desc: "Legen Sie ein Gruppenprofilbild fest.",
    category: "Group",
    usage: `Markieren Sie ein Bild und geben Sie es ein -setppgc}`,
    react: "🍁",
    start: async (
      Miku,
      m,
      { text, prefix, isBotAdmin, isAdmin, mentionByTag, args, pushName, mime, quoted }
    ) => {
        if (!isAdmin && !isBotAdmin)
        return Miku.sendMessage(
          m.from,
          {
            text: `Bot und *${pushName}* bot muss Administrator sein, um diesen Befehl verwenden zu können !`,
          },
          { quoted: m }
        );
        if (args[0] === 'close'){
            await Miku.groupSettingUpdate(m.from, 'announcement').then((res) => m.reply(`Gruppe wurde geschlossen!`))
            } else if (args[0] === 'open'){
            await Miku.groupSettingUpdate(m.from, 'not_announcement').then((res) => m.reply(`Gruppe wurde geöffnet!`))
            } else {
            let buttons = [
            { buttonId: '${prefix}group open', buttonText: { displayText: 'Open' }, type: 1 },
            { buttonId: '${prefix}group close', buttonText: { displayText: 'Close' }, type: 1 }
            ]
            let buttonMessage = {
            text: `*「 ${global.botName} 」*\n\n_Gruppen Einstellung Wechsler-Tool_:`,
            footer: `${botName}`,
            buttons: buttons,
            headerType: 4
            }
            Miku.sendMessage(m.from, buttonMessage, { quoted: m })
            }
        }
    }
