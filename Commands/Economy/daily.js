const mongoose = require("mongoose");
require("../../config.js");
require("../../Core.js");
const { mku, mk } = require("../../Database/dataschema.js");
const fs = require("fs");
require("../../Database/dataschema.js");

module.exports = { 

    name: "daily",  
    desc: "daily gold.", 
    alias: ["daily"],
    category: "Economy",  
    react: "💷", 
    start: async ( 
        Miku, 
      m, 
      { text, prefix, isBotAdmin, isAdmin, mentionByTag, pushName, isCreator,eco,ty} 
    ) => {
         if (!m.isGroup) return Miku.sendMessage(m.from, { text: '*Gruppenbefehl*' }, { quoted: m });
         let user = m.sender 
         const cara = "cara"
         const daily  = await eco.daily(user, cara, 500); //give 500 for daily, can be changed
         if(daily.cd) {

            let buttons = [
                {
                  buttonId: `${prefix}wallet`,
                  buttonText: { displayText: "Wallet 💳" },
                  type: 1,
                },
                {
                    buttonId: `${prefix}Bank`,
                  buttonText: { displayText: "Bank 🏦" },
                  type: 1,

                },
              ];
              let buttonMessage = {
                image: fs.readFileSync("./Assets/Img/card.png"), 
                caption: `\n🧧 Sie haben heute bereits Ihren Tagesumsatz beansprucht, kommen Sie wieder  ${daily.cdL} wieder abzuholen 🫡`,
                footer: `*${botName}*`,
                buttons: buttons,
                type: 4
              };
            
              await Miku.sendMessage(m.from, buttonMessage, { quoted: m });
            
            } else {
   
              return Miku.sendMessage( 
                m.from, 
                { text: `Sie haben Ihren Tagesumsatz erfolgreich beansprucht ${daily.amount} 💴 Heute 🎉.` }, 
                { quoted: m } 
            )}
      }
   }
