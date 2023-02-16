const mongoose = require("mongoose");
require("../../config.js");
require("../../Core.js");
const { mku, mk } = require("../../Database/dataschema.js");
const fs = require("fs");


module.exports = { 
    name: "withdraw",  
    desc: "Geld vom Bankkonto abheben.", 
    alias: ["withdraw"],
    category: "Economy",  
    react: "💳", 
    start: async ( 
        Miku, 
        m, 
        { text, prefix, isBotAdmin, isAdmin, mentionByTag, pushName, isCreator,eco,ty} 
    ) => {
        if(!text)  {
            return Miku.sendMessage( 
                m.from, 
                { text: `*Geben Sie den Betrag an, den Sie abheben möchten!*` }, 
                { quoted: m } 
            );
        }
        const user = m.sender
        const query = text.trim();
        const cara = 'cara'
        const withdraw = await eco.withdraw(user, cara, query);
        if(withdraw.noten) Miku.sendMessage(m.from, { text: '*🏧 Unzureichendes Guthaben in der Bank*' }, { quoted: m });
        const add = eco.give(user, cara, query);
        Miku.sendMessage(m.from, { image: fs.readFileSync("./Assets/Img/card.png"), caption: `*🏧 ALARM*  _💶 ${withdraw.amount} wurde in Ihrer Brieftasche hinzugefügt._*` }, { quoted: m });
        
}
}
