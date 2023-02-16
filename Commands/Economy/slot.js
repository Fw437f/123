const mongoose = require("mongoose");
require("../../config.js");
require("../../Core.js");
const { mku, mk } = require("../../Database/dataschema.js");
const fs = require("fs");


module.exports = { 
    name: "slot",  
    desc: "Spielautomat spielen", 
    alias: ["slot"],
    category: "Economy",  
    react: "🎰", 
    start: async ( 
        Miku, 
        m, 
        { text, prefix, isBotAdmin, isAdmin, mentionByTag, pushName, isCreator,eco,ty} 
    ) => {
      var today = new Date();
      if (today.getDay() == 6 || today.getDay() == 5 || today.getDay() == 0){
          if (text == 'help') return m.reply(`*1:* Gib ${prefix}slot um zu spielen\n\n*2:* Du musst 🪙100 haben in deiner Brieftasche\n\n*3:* Wenn Sie kein Geld in der Brieftasche haben, dann heben Sie es von Ihrer Bank ab\n\n*4:* Wenn Sie auch kein Geld auf Ihrer Bank haben, nutzen Sie die Sparfunktionen, um Geld zu verdienen`)
          if (text == 'money') return m.reply(`*1:* Kleiner Gewinn --> +🪙20\n\n*2:* Kleiner Verlust --> -🪙20\n\n*3:* Großer Gewinn --> +🪙100\n\n*4:* Großer Verlust --> -🪙50\n\n*5:* 🎉 Jackpot --> +🪙1000`)
          const fruit1= ["🥥", "🍎", "🍇"]
          const fruit2 = ["🍎", "🍇", "🥥"]  
          const fruit3 = ["🍇", "🥥", "🍎"]         
          const fruit4 = ["🍇", "🥥", "🍎"]
          const lose = ['*Du bist schlecht darin, dieses Spiel zu spielen*\n\n_--> 🍍-🥥-🍎_', '*Völlig aus der Reihe*\n\n_--> 🥥-🍎-🍍_', '*Bist du ein Neuling?*\n\n_--> 🍎-🍍-🥥_']
          const smallLose = ['*Auf einer Ananasfarm 🍍 kannst du keine Kokosnuss 🥥 ernten*\n\n_--> 🍍>🥥<🍍_', '*Äpfel und Kokosnuss sind nicht die beste Kombination*\n\n_--> 🍎>🥥<🍎_', '*Kokosnüsse und Apfel sind nicht viel*\n\n_--> 🥥>🍎<🥥_']
          const won = ['*Du hast einen Korb voll geerntet*\n\n_--> 🍎+🍎+🍎_', '*Beeindruckend, Sie müssen ein Spezialist für das Pflücken von Kokosnüssen sein*\n\n_--> 🥥+🥥+🥥_', '*Erstaunlich, Sie werden Ananassaft für die Familie machen*\n\n_--> 🍍+🍍+🍍_']             
          const near = ['*Wow, du warst so nah dran, Ananas zu gewinnen*\n\n_--> 🍎-🍍+🍍_', '*Hmmm, du warst so nah dran, Äpfel zu gewinnen*\n\n_--> 🍎+🍎-🍍_']          
          const jack = ['*🥳 JackPot 🤑*\n\n_--> 🍇×🍇×🍇×🍇_', '*🎉 JaaackPooot!*\n\n_--> 🥥×🥥×🥥×🥥_', '*🎊 Sie haben gerade einen Jackpot geknackt 🪙1000*']
          const user = m.sender
          const cara = "cara"
          const k = 100
          const balance1  = await eco.balance(user, cara)
          
          if (k > balance1.wallet) return m.reply(`Sie werden sich auf Ihre Brieftasche drehen, das brauchen Sie zumindest 🪙100`);
          const f1 = fruit1[Math.floor(Math.random() * fruit1.length)];
          const f2 = fruit2[Math.floor(Math.random() * fruit2.length)];
          const f3 = fruit3[Math.floor(Math.random() * fruit3.length)];
          const f4 = fruit4[Math.floor(Math.random() * fruit4.length)];
          const mess1 = lose[Math.floor(Math.random() * lose.length)];
          const mess2 = won[Math.floor(Math.random() * won.length)];
          const mess3 = near[Math.floor(Math.random() * near.length)];
          const mess4 = jack[Math.floor(Math.random() * jack.length)];
          const mess5 = smallLose[Math.floor(Math.random() * smallLose.length)];
          
          if ((f1 !== f2) && f2 !== f3){
             const deduct1 = await eco.deduct(user, cara, 50);
                    m.reply(`${mess1}\n\n*Großer Verlust -->* _🪙50_`)
          }
          else if ((f1 == f2) && f2 == f3){
             const give1 = await eco.give(user, cara, 100); 
                   m.reply(`${mess2}\n*_Großer Gewinn -->* _🪙100_`)
          }
          else if ((f1 == f2) && f2 !== f3){
             const give2 = await eco.give(user, cara, 20);
                   m.reply(`${mess3}\n*Kleiner Gewinn -->* _🪙20_`)
          }
          else if ((f1 !== f2) && f1 == f3){
             const deduct2 = await eco.deduct(user, cara, 20);
                   m.reply(`${mess5}\n\n*Kleiner Verlust -->* _🪙20_`)
          }
          else if ((f1 !== f2) && f2 == f3){
             const give4 = eco.give(user, cara, 20); 
                   m.reply(`${mess3}\n\n*Kleiner Gewinn -->* _🪙20_`)
          }
          else if (((f1 == f2) && f2 == f3) && f3 == f4){
             const give5 = eco.give(user, cara, 1000);
                  m.reply(`${mess4}\n\n_🎊 JackPot --> _🪙1000_`)
          }
          else { 
                  m.reply(`Verstehen Sie, was Sie tun??`)
          }
       }
       else{
                m.reply(`*Sie können dieses Spiel nur am Wochenende spielen*\n\n*🌿 Freitag*\n*🎏 Samstag*\n*🎐 Sontag*`)
         }
    }
}
