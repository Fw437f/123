const moment = require('moment-timezone')

module.exports = {
    name: "gcinfo",
    alias: ["groupinfo"],
    desc: "Ändern Sie die Gruppenbeschreibung",
    category: "Group",
    usage: `setdesc <New group description>`,
    react: "🍁",
    start: async (
      Miku,
      m,
      { text, prefix, isBotAdmin, isAdmin, pushName, metadata, args,mime }
    ) => {
        try {
            ppgc = await Miku.profilePictureUrl(m.from, "image");
          } catch {
            ppgc = botImage1;
          }
          const participants = m.isGroup ? await metadata.participants : ''
          const groupAdmins = m.isGroup ? await participants.filter(v => v.admin !== null).map(v => v.id) : ''
          const groupOwner = m.isGroup ? metadata.owner : ''
          
          desc = metadata.desc ? metadata.desc : 'Keine Beschreibung'

          let txt = `                 *『 Gruppen Info 』*\n\n_🎀 Gruppen Name:_ *${metadata.subject}*\n\n_🧩 Gruppenbeschreibung:_\n${desc}\n\n_👑 Gruppenbesitzer:_ @${metadata.owner.split('@')[0]}\n_💫 Gruppe Erstellt am:_ *${moment(`${metadata.creation}` * 1000).tz('Asia/Kolkata').format('DD/MM/YYYY')}*\n_📛 Insgesamt Administratoren:_ *${groupAdmins.length}*\n_🎈 Teilnehmer insgesamt:_ *${metadata.participants.length}*\n`;
        

          await Miku.sendMessage(
            m.from,
        {
          image: { url: ppgc, mimetype: "image/jpeg" },
          caption: txt,
          mentions: [metadata.owner]
        },
        { quoted: m }
      );
    }
  }
