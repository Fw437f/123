const mongoose = require("mongoose");
require("../../config.js");
require("../../Core.js");
const { mku } = require("../../Database/dataschema.js");

module.exports = { 

    name: "owner", 
    desc: "Um die Liste der aktuellen Mods anzuzeigen", 
    alias: ["modlist","mods","mod"],
    category: "Core", 
    usage: "owner", 
    react: "🏅", 
    start: async (
      Miku, 
      m, 
      { text, prefix, mentionByTag, pushName, isCreator,owner,includes,modStatus} 
    ) => { 

        try { 
        
            var modlist = await mku.find({addedMods: "true"});
            var modlistString = "";
            var ownerList = global.owner;
            modlist.forEach(mod => {
              modlistString += `\n@${mod.id.split("@")[0]}\n`
            });
            var mention = await modlist.map(mod => mod.id);
            let xy = modlist.map(mod => mod.id);
            let yz = ownerList.map(owner => owner+"@s.whatsapp.net");
            let xyz = xy.concat(yz);

            ment = [ownerList.map(owner => owner+"@s.whatsapp.net"), mention];
            let textM = `             🧣  *${botName} Mods*  🧣\n\n`;

            if(ownerList.length == 0){
              textM = "*Keine Mods hinzugefügt !*";
            }

            for (var i = 0; i < ownerList.length; i++) {
              textM += `\n〽️ @${ownerList[i]}\n`
            }

            if(modlistString != ""){
              for (var i = 0; i < modlist.length; i++) {
                textM += `\n🎀 @${modlist[i].id.split("@")[0]}\n`
              }
            } 
            
            if(modlistString != "" || ownerList.length != 0){
               textM += `\n\n📛 *Spammen Sie sie nicht, um eine Blockierung zu vermeiden !*\n\n🎀 Für jede Hilfe, Geben Sie *${prefix}owner* und fragen Sie ihm.\n\n*💫 Vielen Dank für die Verwendung ${botName}. 💫*\n`
            }
            
            return Miku.sendMessage( 
              m.from, 
              { text: textM, mentions: xyz }, 
              { quoted: m } 
            );

          } catch (err) { 
            console.log(err);
            return Miku.sendMessage(m.from, { text: `Beim Abrufen der Mod-Liste ist ein interner Fehler aufgetreten.` }, { quoted: m });
          } 
        }, 
    }
