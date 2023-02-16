const mongoose = require("mongoose");
require("../../config.js");
require("../../Core.js");
const { mk } = require("../../Database/dataschema.js");



module.exports = {
    name: "cmd",
    alias: ["bot","botswitch"],
    desc: "Bot in einer Gruppe aktivieren oder deaktivieren",
    category: "Group",
    usage: "cmd [on/off]",
    react: "🎀",
    start: async (
      Miku,
      m,
      { args, isBotAdmin, isAdmin, isCreator, reply,prefix,pushName,participants }
    ) => {
      
        if (!isAdmin)
        return Miku.sendMessage(
          m.from,
          {
            text: `*${pushName}* muss *Admin* sein, um den Bot ON/OFF zuschalten !`,
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
          await new mk({ id: m.from, botSwitch: "true" }).save();
          Miku.sendMessage(
            m.from,
            {
              text: `*${botName}* wurde in dieser Gruppe Aktiviert!`,
              contextInfo: { mentionedJid: mems },
            },
            { quoted: m }
          );
          return Miku.sendMessage(
            m.from,
            { text: `*${botName}* wurde in dieser Gruppe Aktiviert!` },
            { quoted: m }
          );
        } else {
          if (checkdata.botSwitch == "true")
            return Miku.sendMessage(
                m.from,
                { text: `*${botName}* ist in dieser Gruppe bereits aktiviert !` },
                { quoted: m }
              );
          await mk.updateOne({ id: m.from }, { botSwitch: "true" });
          return Miku.sendMessage(
            m.from,
            { text: `*${botName}* wurde in dieser Gruppe aktiviert!` },
            { quoted: m }
          );
        }
      } else if (args[0] === "off") {
        if (!checkdata) {
          await new mk({ id: m.from, botSwitch: "false" }).save();
          return Miku.sendMessage(
            m.from,
            { text: `*${botName}* wurde in dieser Gruppe deaktiviert!\n\nJetzt können nur *Admins* den Bot verwenden` },
            { quoted: m }
          );
        } else {
          if (checkdata.botSwitch == "false") return Miku.sendMessage(
            m.from,
            { text: `*${botName}* ist in dieser Gruppe bereits deaktiviert !` },
            { quoted: m }
          );
          await mk.updateOne({ id: m.from }, { botSwitch: "false" });
          return Miku.sendMessage(
            m.from,
            { text: `${botName} wurde in dieser Gruppe deaktiviert !\n\nJetzt können nur *Admins* den Bot verwenden` },
            { quoted: m }
          );
        }
      } else {
        let buttonsntilink = [
          {
            buttonId: `${prefix}cmd on`,
            buttonText: { displayText: "On" },
            type: 1,
          },
          {
            buttonId: `${prefix}cmd off`,
            buttonText: { displayText: "Off" },
            type: 1,
          },
        ];
        let bmffg = {
          image: {url : botImage2} ,
          caption: `\nBitte klicken Sie auf die Schaltfläche unten\n*On / Off*\n`,
          footer: `*${botName}*`,
          buttons: buttonsntilink,
          headerType: 4,
        };
        await Miku.sendMessage(m.from, bmffg, { quoted: m });
    }
  },
};
