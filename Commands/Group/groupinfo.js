const moment = require('moment-timezone')

module.exports = {
    name: "gcinfo",
    alias: ["groupinfo"],
    desc: "Γndern Sie die Gruppenbeschreibung",
    category: "Group",
    usage: `setdesc <New group description>`,
    react: "π",
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

          let txt = `                 *γ Gruppen Info γ*\n\n_π Gruppen Name:_ *${metadata.subject}*\n\n_π§© Gruppenbeschreibung:_\n${desc}\n\n_π Gruppenbesitzer:_ @${metadata.owner.split('@')[0]}\n_π« Gruppe Erstellt am:_ *${moment(`${metadata.creation}` * 1000).tz('Asia/Kolkata').format('DD/MM/YYYY')}*\n_π Insgesamt Administratoren:_ *${groupAdmins.length}*\n_π Teilnehmer insgesamt:_ *${metadata.participants.length}*\n`;
        

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
