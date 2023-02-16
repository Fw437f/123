const fs = require("fs");
const { mku } = require("../../Database/dataschema.js");

module.exports = {
    name: "leave",
    alias: ["leavegc"],
    desc: "Bitten Sie den Bot, eine Gruppe zu verlassen",
    category: "Group",
    usage: "leave",
    react: "👋",
    start: async (
      Miku,
      m,
      { args, text,prefix, isCreator, pushName,isAdmin,participants }
    ) => {
      var modStatus = await mku.findOne({id:m.sender}).then(async (user) => {
        if (user.addedMods=="true") {
          return "true";
        }
        else{
          return "false";
        }
      }).catch(error => {
        console.log(error)
        //return Miku.sendMessage(m.from, { text: `An internal error occurred while checking your mod status.` }, { quoted: m });
      });

      
      if (modStatus=="false"&&!isCreator && !isAdmin)  return Miku.sendMessage(m.from, { text: 'Entschuldigung, nur *GroupAdmins* und *Mods* können diesen Befehl verwenden !' }, { quoted: m });
      let img ="https://wallpapercave.com/wp/wp9667218.png";

      await Miku.sendMessage(m.from, { image:{url:"https://wallpapercave.com/wp/wp9667218.png"  }, caption: `Ich verlasse diese Gruppe auf Anfrage... \n\nMacht's gut alle zusammen :)`,mentions: participants.map((a) => a.id) , quoted: m }).then(async () => {
         Miku.groupLeave(m.from).catch(e => {
          Miku.sendMessage(m.from, { text: `Ein Fehler ist aufgetreten !` }, { quoted: m });
        });
      });

      
            }
          }
