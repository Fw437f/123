const mongoose = require("mongoose");
require("../../config.js");
require("../../Core.js");
const { mku, mk } = require("../../Database/dataschema.js");
const fs = require("fs");



 module.exports = { 

    name: "gamble",  
    desc: "Geld spielen.", 
    alias: ["gamble"],
    category: "Economy",  
    react: "💸", 
    start: async ( 
        Miku, 
        m, 
        { text, prefix, isBotAdmin, isAdmin, mentionByTag, pushName, isCreator,eco,ty} 
    ) => {
        const user = m.sender
	
        var texts = text.split(" ");
     var opp = texts[1];// your value
     var value = texts[0].toLowerCase();
     var gg = parseInt(value)
     const cara = "cara"
     const balance = await eco.balance(user, cara);
     const g = (balance.wallet) > parseInt(value)
     const k = 50
     const a = (k) > parseInt(value)
     const twice = gg*2
     const f = ["up", "right", "left", "down", "up", "left", "down", "right", "up", "down", "right", "left"]
     const r = f[Math.floor(Math.random () * f.length)]
     if (!text) return m.reply(
				`Usage:  *${prefix}gamble 100 left/right/up/down*\n\nExample:  *${prefix}gamble 100 left*`
			);

            if (!value) return m.reply("*Bitte geben Sie den Betrag an, mit dem Sie spielen!*");
            if (!opp) return m.reply("*Geben Sie die Richtung an, auf die Sie wetten!*");
            if (!gg) return m.reply("*Bitte überprüfen Sie Ihren Text, Sie verwenden den Befehl falsch*")
            if (g == false) return m.reply(`*Sie haben nicht genug 🪙 Diamant zum Spielen*`);
        if (a == true) return m.reply(`*Verzeihung ${m.pushName}, Sie können nur mit mehr als 🪙50 spielen.*`);
        if ( r == opp){
           let give = await eco.give(user , cara, twice);
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
            image: fs.readFileSync("./Assets/Img/card.png"), 
            caption: `*📈 Du hast gewonnen 💴 ${twice}*`,
            footer: `*${botName}*`,
            buttons: buttons,
            type: 4
          };
        
          await Miku.sendMessage(m.from, buttonMessage, { quoted: m });
        }
         else{
         let deduct = await eco.deduct(user, cara, texts[0]);
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
            text: `*📉 Du hast verloren 💴 ${texts[0]}*`,
            footer: `*${botName}*`,
            buttons: buttons,
            type: 4
          };
        
          await Miku.sendMessage(m.from, buttonMessage, { quoted: m });
        }
    }
}
