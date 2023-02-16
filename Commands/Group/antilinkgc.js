const mongoose = require("mongoose");
require("../../config.js");
require("../../Core.js");
const { mk } = require("../../Database/dataschema.js");



module.exports = {
    name: "antilinkgc",
    alias: ["alinkgc","antilink"],
    desc: "Aktivieren oder deaktivieren Sie die Antilink-Funktion in einer Gruppe",
    category: "Group",
    usage: "antilinkgc [on/off]",
    react: "🔒",
    start: async (
      Miku,
      m,
      { args, isBotAdmin, isAdmin, isCreator, reply,prefix,pushName }
    ) => {
        if (!isAdmin && !isBotAdmin)
        return Miku.sendMessage(
          m.from,
          {
            text: `Bot and *${pushName}* bot muss Administrator sein, um diesen Befehl verwenden zu können !`,
          },
          { quoted: m }
        );
  
      let checkdata = await mk.findOne({ id: m.from });
      var groupe = await Miku.groupMetadata(m.from);
      var members = groupe["participants"];
      var mems = [];
      members.map(async (adm) => {
        mems.push(adm.id.replace("c.us", "s.whatsapp.net"));
      });
  
      if (args[0] === "on") {
        if (!checkdata) {
          await new mk({ id: m.from, antilink: "true" }).save();
          Miku.sendMessage(
            m.from,
            {
              text: `\`\`\`「 Warnung 」\`\`\`\n\nAntilink-System aktiviert!`,
              contextInfo: { mentionedJid: mems },
            },
            { quoted: m }
          );
          return Miku.sendMessage(
            m.from,
            { text: `*Antilink erfolgreich aktiviert*` },
            { quoted: m }
          );
        } else {
          if (checkdata.antilink == "true")
            return Miku.sendMessage(
                m.from,
                { text: `*Bereits aktiviert.*` },
                { quoted: m }
              );
          await mk.updateOne({ id: m.from }, { antilink: "true" });
          return Miku.sendMessage(
            m.from,
            { text: `*Antilink ist in dieser Gruppe aktiviert*` },
            { quoted: m }
          );
        }
      } else if (args[0] === "off") {
        if (!checkdata) {
          await new mk({ id: m.from, antilink: "false" }).save();
          return Miku.sendMessage(
            m.from,
            { text: `*Antilink erfolgreich deaktiviert*` },
            { quoted: m }
          );
        } else {
          if (checkdata.antilink == "false") return Miku.sendMessage(
            m.from,
            { text: `*Bereits deaktiviert.*` },
            { quoted: m }
          );
          await mk.updateOne({ id: m.from }, { antilink: "false" });
          return Miku.sendMessage(
            m.from,
            { text: `*Antilink ist in dieser Gruppe deaktiviert*` },
            { quoted: m }
          );
        }
      } else {
        let buttonsntilink = [
          {
            buttonId: `${prefix}antilinkgc on`,
            buttonText: { displayText: "On" },
            type: 1,
          },
          {
            buttonId: `${prefix}antilinkgc off`,
            buttonText: { displayText: "Off" },
            type: 1,
          },
        ];
        let bmffg = {
          image: {url : botImage6} ,
          caption: `\n*「  Gruppen-Altilink-Konfiguration  」*\n\nBitte klicken Sie auf die Schaltfläche unten\n*On / Off*\n`,
          footer: `*${botName}*`,
          buttons: buttonsntilink,
          headerType: 4,
        };
        await Miku.sendMessage(m.from, bmffg, { quoted: m });
    }
  },
};
