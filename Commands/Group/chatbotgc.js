const mongoose = require("mongoose");
require("../../config.js");
require("../../Core.js");
const { mk } = require("../../Database/dataschema.js");



module.exports = {
    name: "chatbotgc",
    alias: ["autochat","autoreply","chatbotgroup"],
    desc: "Aktivieren oder deaktivieren Sie die automatische Antwortfunktion in einer Gruppe",
    category: "Group",
    usage: "chatbotgc [on/off]",
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
            text: `*${pushName}* muss *Admin* sein, um Chatbot zu aktivieren !`,
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
          await new mk({ id: m.from, chatBot: "true" }).save();
          Miku.sendMessage(
            m.from,
            {
              text: `*Gruppen-Chatbot aktiviert! *\n\nUm es zu verwenden, erwähnen Sie die Nachricht des Bots mit Ihrer Nachricht.`,
              contextInfo: { mentionedJid: mems },
            },
            { quoted: m }
          );
          return Miku.sendMessage(
            m.from,
            { text: `*Gruppen-Chatbot aktiviert !*\n\nUm es zu verwenden, erwähnen Sie die Nachricht des Bots mit Ihrer Nachricht.` },
            { quoted: m }
          );
        } else {
          if (checkdata.chatBot == "true")
            return Miku.sendMessage(
                m.from,
                { text: `*Bereits aktiviert.*\n\nUm es zu verwenden, erwähnen Sie die Nachricht des Bots mit Ihrer Nachricht.` },
                { quoted: m }
              );
          await mk.updateOne({ id: m.from }, { chatBot: "true" });
          return Miku.sendMessage(
            m.from,
            { text: `*Gruppen-Chatbot aktiviert !*` },
            { quoted: m }
          );
        }
      } else if (args[0] === "off") {
        if (!checkdata) {
          await new mk({ id: m.from, chatBot: "false" }).save();
          return Miku.sendMessage(
            m.from,
            { text: `*Gruppen-Chatbot deaktiviert!*` },
            { quoted: m }
          );
        } else {
          if (checkdata.chatBot == "false") return Miku.sendMessage(
            m.from,
            { text: `*Bereits deaktiviert.*` },
            { quoted: m }
          );
          await mk.updateOne({ id: m.from }, { chatBot: "false" });
          return Miku.sendMessage(
            m.from,
            { text: `*Gruppen-Chatbot deaktiviert !*` },
            { quoted: m }
          );
        }
      } else {
        let buttonsntilink = [
          {
            buttonId: `${prefix}chatbotgc on`,
            buttonText: { displayText: "On" },
            type: 1,
          },
          {
            buttonId: `${prefix}chatbotgc off`,
            buttonText: { displayText: "Off" },
            type: 1,
          },
        ];
        let bmffg = {
          image: {url : botImage4} ,
          caption: `\n *「  Gruppen-Chatbot-Konfiguration  」*\n\nBitte klicken Sie auf die Schaltfläche unten\n*On / Off*\n`,
          footer: `*${botName}*`,
          buttons: buttonsntilink,
          headerType: 4,
        };
        await Miku.sendMessage(m.from, bmffg, { quoted: m });
    }
  },
};
