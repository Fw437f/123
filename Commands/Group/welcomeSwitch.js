const mongoose = require("mongoose");
require("../../config.js");
require("../../Core.js");
const { mk } = require("../../Database/dataschema.js");



module.exports = {
    name: "welcome",
    alias: ["welcomemess","welcomeswitch"],
    desc: "Willkommens-/Auf Wiedersehensnachrichten in einer Gruppe aktivieren oder deaktivieren",
    category: "Group",
    usage: "welcome [on/off]",
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
            text: `*${pushName}* muss *Admin* sein, um  ON/OFF *Welcome/Goodbye* nachricht !`,
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
          await new mk({ id: m.from, switchWelcome: "true" }).save();
          Miku.sendMessage(
            m.from,
            {
              text: `*Willkommens-/Auf Wiedersehens*-Nachrichten wurden in dieser Gruppe *aktiviert*!!`,
              contextInfo: { mentionedJid: mems },
            },
            { quoted: m }
          );
          return Miku.sendMessage(
            m.from,
            { text: `*Willkommens-/Auf Wiedersehens*-Nachrichten wurden in dieser Gruppe *Aktiviert*!` },
            { quoted: m }
          );
        } else {
          if (checkdata.switchWelcome == "true")
            return Miku.sendMessage(
                m.from,
                { text: `*Welcome/Goodbye* messages is already *Activated* in this group!` },
                { quoted: m }
              );
          await mk.updateOne({ id: m.from }, { switchWelcome: "true" });
          return Miku.sendMessage(
            m.from,
            { text: `*Welcome/Goodbye* messages has been *Activated* in this group!` },
            { quoted: m }
          );
        }
      } else if (args[0] === "off") {
        if (!checkdata) {
          await new mk({ id: m.from, switchWelcome: "false" }).save();
          return Miku.sendMessage(
            m.from,
            { text: `*Welcome/Goodbye* messages has been *De-Activated* in this group!` },
            { quoted: m }
          );
        } else {
          if (checkdata.switchWelcome == "false") return Miku.sendMessage(
            m.from,
            { text: `*Welcome/Goodbye* is not *Activated* in this group!` },
            { quoted: m }
          );
          await mk.updateOne({ id: m.from }, { switchWelcome: "false" });
          return Miku.sendMessage(
            m.from,
            { text: `*Welcome/Goodbye* messages has been *De-Activated* in this group!` },
            { quoted: m }
          );
        }
      } else {
        let buttonsntilink = [
          {
            buttonId: `${prefix}welcome on`,
            buttonText: { displayText: "On" },
            type: 1,
          },
          {
            buttonId: `${prefix}welcome off`,
            buttonText: { displayText: "Off" },
            type: 1,
          },
        ];
        let bmffg = {
          image: {url : botImage2} ,
          caption: `\nPlease click the button below\n*On / Off*\n`,
          footer: `*${botName}*`,
          buttons: buttonsntilink,
          headerType: 4,
        };
        await Miku.sendMessage(m.from, bmffg, { quoted: m });
    }
  },
};
