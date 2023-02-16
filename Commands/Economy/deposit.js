const mongoose = require("mongoose");
require("../../config.js");
require("../../Core.js");
const { mku, mk } = require("../../Database/dataschema.js");
const fs = require("fs");


module.exports = { 

    name: "deposit",  
    desc: "Gold hinterlegen.", 
    alias: ["deposit"],
    category: "Economy",  
    react: "💵", 
    start: async ( 
        Miku, 
      m, 
      { text, prefix, isBotAdmin, isAdmin, mentionByTag, pushName, isCreator,eco,ty} 
    ) => {
        if(!text)  {
            return Miku.sendMessage( 
                m.from, 
                { text: `Baka!! Geben Sie den 💰Betrag an, den Sie einzahlen möchten!` }, 
                { quoted: m } 
            );
        }
        let d = parseInt(text)
        const pushname = m.pushName //|| 'NO name'
        const texts = text.trim();
		const user = m.sender;
		const cara = 'cara'
    const deposit = await eco.deposit(m.sender, "cara", texts);
    const balance = await eco.balance(m.sender, "cara")
        if(deposit.noten) return m.reply('Sie können nicht einzahlen, was Sie nichts haben.');
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
            caption: `\n⛩️ Sender: ${m.pushName}\n\n🍀Erfolgreich eingezahlt 💴 ${deposit.amount} zu Ihrer Bank.\n`,
            footer: `*${botName}*`,
            buttons: buttons,
            type: 4
          };
        
          await Miku.sendMessage(m.from, buttonMessage, { quoted: m });
        }
    }
