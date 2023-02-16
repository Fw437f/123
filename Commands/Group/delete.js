module.exports = {
  name: "delete",
  alias: ["del"],
  desc: "Um eine Nachricht zu löschen",
  category: "Group",
  usage: `Tag a message and type *del*`,
  react: "🍁",
  start: async (Miku, m, { isAdmin, isBotAdmin, pushName }) => {
    if (!m.quoted)
      return Miku.sendMessage(
        m.from,
        { text: `Bitte erwähnen Sie eine zu löschende Nachricht !` },
        { quoted: m }
      );
    if (!isAdmin && !isBotAdmin)
      return Miku.sendMessage(
        m.from,
        {
          text: `Bot und *${pushName}* bot muss Administrator sein, um diesen Befehl verwenden zu können !`,
        },
        { quoted: m }
      );
    
    var { from, fromMe, id } = m.quoted;

    const key = {
      remoteJid: m.from,
      fromMe: false,
      id: m.quoted.id,
      participant: m.quoted.sender,
    };

    await Miku.sendMessage(m.from, { delete: key });
  },
};
