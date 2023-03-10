const mongoose = require("mongoose");
require("../../config.js");
require("../../Core.js");
const { mku, mk } = require("../../Database/dataschema.js");
const fs = require("fs");
const { economy } = require("discord-mongoose-economy/models/economy.js");

 
 module.exports = { 
    name: "leaderboard", 
    desc: "Um die Rangliste der aktuellen Benutzer anzuzeigen", 
    alias: ["lb"],
    category: "Economy", 
    usage: "leaderboard", 
    react: "π", 
    start: async (Miku, m,{ text, prefix, isBotAdmin, isAdmin, mentionByTag, pushName, isCreator,eco,ty} ) => { 
        try { 
            let h = await eco.lb('cara', 10);
            if(h.length === 0) {
                return Miku.sendMessage(m.from, { text: 'Keine Benutzer auf der Bestenliste gefunden.' }, { quoted: m });
            }
            let str = `*Top ${h.length} Benutzer mit mehr Geld in der Brieftasche.*\n`;
            let arr = [];
            for(let i = 0; i < h.length; i++){
                let username = await mku.findOne({ id: h[i].userID, name: m.pushName });
                var tname;
                if (username && username.name) {
                    tname = username.name;
                } else {
                    tname = Miku.getName(h[i].userID);
                }
                str += `*${i+1}*\nβ­ββββββββββββββ\nβ *π Name:-* _${tname}_\nβ *βοΈ Benutzer:-* _@${h[i].userID.split('@')[0]}_\nβ *π³ Geld:-* _${h[i].wallet}_\nβ *π Bank Menge:-* _${h[i].bank}_\nβ *π Bank KapazitΓ€t:-* _${h[i].bankCapacity}_\nβ°ββββββββββββββ\n\n`;  	 
                arr.push(h[i].userID);
            }
            Miku.sendMessage(m.from, { text: str, mentions: arr }, { quoted: m });
        } catch (err) {
            console.log(err);
            return Miku.sendMessage(m.from, { text: `Beim Abrufen der Bestenliste ist ein interner Fehler aufgetreten.` }, { quoted: m });
        }
    }
}
