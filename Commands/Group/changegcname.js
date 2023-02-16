const fs = require("fs");
const Jimp = require("jimp");
require("../../Core.js");

module.exports = {
  name: "setgcname",
  alias: ["setnamegc", "changegcname","setgroupname","changegroupname"],
  desc: "Ändern Sie den Gruppennamen",
  category: "Group",
  usage: `setgcname <New group name>`,
  react: "🍁",
  start: async (
    Miku,
    m,
    { text, prefix, isBotAdmin, isAdmin, pushName, metadata, args,mime }
  ) => {
    if (!isAdmin && !isBotAdmin)
        return Miku.sendMessage(m.from, { text: `*Bot* und *${pushName}* bot muss *Admin* sein, um diesen Befehl zu verwenden!` }, { quoted: m });
    if (!args[0])
        return Miku.sendMessage(m.from, { text: `Bitte geben Sie einen neuen Gruppennamen an !` }, { quoted: m });
    
    var newGCName = args.join(" ");
    var oldGCName = metadata.subject;

    try {
        ppgc = await Miku.profilePictureUrl(m.from, "image");
      } catch {
        ppgc = "https://wallpapercave.com/wp/wp10524580.jpg";
      }

    await Miku.groupUpdateSubject(m.from, newGCName).then((res) => Miku.sendMessage(
        m.from,
        {
          image: { url: ppgc, mimetype: "image/jpeg" },
          caption: `*『 Gruppenname geändert 』*\n\n_🔶 Alte Name:_\n*${oldGCName}*\n\n_🔷 Neu name:_\n*${args.join(" ")}*`,
        },
        { quoted: m }
      )).catch((err) => replay(jsonformat(err)))
    
  },
};

