const mongoose = require("mongoose");
require("../../config.js");
require("../../Core.js");
const { mku, mk } = require("../../Database/dataschema.js");
const fs = require("fs");


module.exports = { 

    name: "bank",  
    desc: "Zeigt Bankbetrag.", 
    alias: ["bank"],
    category: "Economy",  
    react: "🏦", 
    start: async ( 
        Miku, 
      m, 
      { text, prefix, isBotAdmin, isAdmin, mentionByTag, pushName, isCreator,eco,ty} 
    ) => {
        const pushname = m.pushName //|| 'NO name'
        const user = m.sender
    const cara = "cara"
    const balance = await eco.balance(user, cara);
     var role = 'Brokie😭'
     if (`${balance.bank}`           <= 1000){
        role = 'Pleite😭'
      } else if (`${balance.bank}`   <= 10000){
            role = 'Arm😢'
        } else if (`${balance.bank}` <= 50000){
            role = 'Durchschnitt💸'
        } else if (`${balance.bank}` <= 1000000){
            role = 'Reich💸💰'
        } else if (`${balance.bank}` <= 10000000){
            role = 'Millionär🤑'
        } else if (`${balance.bank}` <= 90000000){
            role = 'Milliardär🤑🤑'
        }    
        let buttons = [
            {
              buttonId: `${prefix}slot`,
              buttonText: { displayText: "Slot 🎰" },
              type: 1,
            },
            {
                buttonId: `${prefix}wallet`,
              buttonText: { displayText: "Wallet 💳" },
              type: 1,

            },
          ];
          let buttonMessage = {
            image: fs.readFileSync("./Assets/Img/card2.png"), 
            caption: `\n🏦 *${pushname}'s Bank*:\n\n🪙 Gleichgewicht: ${balance.bank}/${balance.bankCapacity}\n\n\n*Vermögen: ${role}*\n`,
            footer: `*${botName}*`,
            buttons: buttons,
            type: 4
          };
        
          await Miku.sendMessage(m.from, buttonMessage, { quoted: m });
        }
    }
