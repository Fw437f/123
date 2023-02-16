const mongoose = require("mongoose");
require("../../config.js");
require("../../Core.js");
const { mk } = require("../../Database/dataschema.js");



module.exports = {
    name: "nsfw",
    alias: ["nsfwswitch","nsfwmode"],
    desc: "Aktivieren oder deaktivieren Sie NSFW-Befehle in einer Gruppe",
    category: "Group",
    usage: "nsfw [on/off]",
    react: "🎀",
    start: async (
      Miku,
      m,
      { args, isBotAdmin, isAdmin, isCreator, reply,prefix,pushName }
    ) => {
      
        if (!isAdmin)
        return Miku.sendMessage(
          m.from,
          {
            text: `*${pushName}* muss *Admin* sein, um NSFW ON/OFF zuschalten !`,
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
          await new mk({ id: m.from, switchNSFW: "true" }).save();
          Miku.sendMessage(
            m.from,
            {
              text: `*NSFW* wurde in dieser Gruppe *aktiviert*!`,
              contextInfo: { mentionedJid: mems },
            },
            { quoted: m }
          );
          return Miku.sendMessage(
            m.from,
            { text: `*NSFW* wurde in dieser Gruppe *aktiviert*!` },
            { quoted: m }
          );
        } else {
          if (checkdata.switchNSFW == "true")
            return Miku.sendMessage(
                m.from,
                { text: `*NSFW* ist in dieser Gruppe bereits *aktiviert* !` },
                { quoted: m }
              );
          await mk.updateOne({ id: m.from }, { switchNSFW: "true" });
          return Miku.sendMessage(
            m.from,
            { text: `*NSFW* wurde in dieser Gruppe *aktiviert*!` },
            { quoted: m }
          );
        }
      } else if (args[0] === "off") {
        if (!checkdata) {
          await new mk({ id: m.from, switchNSFW: "false" }).save();
          return Miku.sendMessage(
            m.from,
            { text: `*NSFW* wurde in dieser Gruppe *deaktiviert* !` },
            { quoted: m }
          );
        } else {
          if (checkdata.switchNSFW == "false") return Miku.sendMessage(
            m.from,
            { text: `*NSFW* ist in dieser Gruppe bereits *Deaktiviert* !` },
            { quoted: m }
          );
          await mk.updateOne({ id: m.from }, { switchNSFW: "false" });
          return Miku.sendMessage(
            m.from,
            { text: `*NSFW* wurde in dieser Gruppe *deaktiviert* !` },
            { quoted: m }
          );
        }
      } else {
        let buttonsntilink = [
          {
            buttonId: `${prefix}nsfw on`,
            buttonText: { displayText: "On" },
            type: 1,
          },
          {
            buttonId: `${prefix}nsfw off`,
            buttonText: { displayText: "Off" },
            type: 1,
          },
        ];
        let bmffg = {
          image: {url : botImage5} ,
          caption: `\nBitte klicken Sie auf die Schaltfläche unten\n*On / Off*\n`,
          footer: `*${botName}*`,
          buttons: buttonsntilink,
          headerType: 4,
        };
        await Miku.sendMessage(m.from, bmffg, { quoted: m });
    }
  },
};
