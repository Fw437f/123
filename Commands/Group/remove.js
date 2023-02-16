require("../../config.js");
require("../../Core.js");

module.exports = {
  name: "remove",
  alias: ["rem"],
  desc: "Entfernen Sie ein Mitglied aus der Gruppe",
  category: "Group",
  usage: "remove @user",
  react: "🍁",
  start: async (
    Miku,
    m,
    { text, prefix, isBotAdmin, isAdmin, mentionByTag,pushName}
  ) => {
    if (!text && !m.quoted) return m.reply(`Bitte markieren Sie einen Benutzer zum *Entfernen* aus der Gruppe!`)
    if (!isAdmin) return Miku.sendMessage(m.from, { text: mess.useradmin }, { quoted: m });

    if (!text && !m.quoted) {
      return Miku.sendMessage(
        m.from,
        { text: `Bitte markieren Sie einen Benutzer zum *Entfernen* !` },
        { quoted: m }
      );
    } else if (m.quoted) {
      var mentionedUser = m.quoted.sender;
    } else {
      var mentionedUser = mentionByTag[0];
    }

    let users = (await mentionedUser) || m.msg.contextInfo.participant;

    try {
      await Miku.groupParticipantsUpdate(m.from, [users], "remove").then(
        (res) =>
          Miku.sendMessage(
            m.from,
            { text: `Benutzer wurde erfolgreich *entfernt* von *${pushName}*` },
            { quoted: m }
          )
      );
    } catch (err) {
      Miku.sendMessage(m.from, { text: `${mess.botadmin}` }, { quoted: m });
    }
  },
};
