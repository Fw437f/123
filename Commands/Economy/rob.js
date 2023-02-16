const mongoose = require("mongoose");
require("../../config.js");
require("../../Core.js");
const { mku, mk } = require("../../Database/dataschema.js");
const fs = require("fs");


module.exports = { 
    name: "rob",  
    desc: "Bankbetrag rauben", 
    alias: ["rob"],
    category: "Economy",  
    react: "💶", 
    start: async ( 
        Miku, 
        m, 
        { text, prefix, isBotAdmin, isAdmin, mentionByTag, pushName, isCreator,eco,ty} 
    ) => {
        if (!text && !m.quoted) {
        return Miku.sendMessage( 
          m.from, 
          { text: `Bitte markieren Sie einen Benutzer mit *Ban*!` }, 
          { quoted: m } 
        )}
       
        if(m.quoted){
          var mentionedUser = m.quoted.sender;
        }
        else{
          var mentionedUser = mentionByTag[0];
        }
        const cara = "cara";
        const user1 = m.sender;
        const user2 = mentionedUser;
        const k = 100;
        const amount = Math.floor(Math.random() * 200) + 1;
        const balance1 = await eco.balance(user1, cara);
        const balance2 = await eco.balance(user2, cara);
        const typ = ['ran','rob','caught'];
        const random = typ[Math.floor(Math.random() * typ.length)];
        if (k > balance1.wallet) return Miku.sendMessage(m.from, { text: '*☹️ Du hast nicht genug Geld, um eine Strafe zu zahlen, falls du erwischt wirst*' }, { quoted: m }); 
        if (k > balance2.wallet) return Miku.sendMessage(m.from, { text: '*Tut mir leid, dein Opfer ist zu arm 🤷🏽‍♂️ lass los.*' }, { quoted: m }); 

        switch (random) {
            case 'ran':
                return Miku.sendMessage(m.from, { text: `*Lassen wir diese arme Seele in Ruhe.*\n\nEr ist zu arm.` }, { quoted: m });
            case 'rob':
                await eco.deduct(user2, cara, amount);
                await eco.give(user1, cara, amount); 
                return Miku.sendMessage(m.from, { text: `*🤑 Sie haben gestohlen ${amount} erfolgreich .🗡️*` }, { quoted: m });
            case 'caught':
                await eco.deduct(user1, cara, balance1.wallet); 
                return Miku.sendMessage(m.from, { text: `*Tut mir leid, das FBI👮 hat dich eingeholt, du hast alles verloren 🪙 im Portemonnaie.*` }, { quoted: m });
                default:
                return Miku.sendMessage(m.from, { text: 'Was versuchst du zu machen?' }, { quoted: m });
                }
                }
                }
