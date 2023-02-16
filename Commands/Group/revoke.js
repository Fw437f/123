require("../../config.js");
require("../../Core.js");

module.exports = {
  name: "revoke",
  alias: ["resetlink","resetgclink","resetlinkgroup","resetlinkgc"],
  desc: "Gruppenlink zurücksetzen",
  category: "Group",
  usage: "revoke",
  react: "🍁",
  start: async (
    Miku,
    m,
    { prefix, isBotAdmin, isAdmin}
  ) => {
    if (m.from == '120363040838753957@g.us') return m.reply('Tut mir leid, dieser Befehl ist in der *Gruppe* nicht erlaubt* !\n\nSie dürfen den Gruppen-Link nicht ändern !' );
    
    if (!isAdmin)
      return Miku.sendMessage(m.from, { text: mess.useradmin }, { quoted: m });

    try {
      await Miku.groupRevokeInvite(m.from).then(
        (res) =>
          Miku.sendMessage(
            m.from,
            { text: `Der Gruppenlink wurde erfolgreich *aktualisiert*!` },
            { quoted: m }
          )
      );
    } catch (err) {
      Miku.sendMessage(m.from, { text: `${mess.botadmin}` }, { quoted: m });
    }
  },
};
