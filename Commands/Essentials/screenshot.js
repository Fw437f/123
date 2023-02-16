const { getBuffer } = require("../../lib/myfunc");

module.exports = {
    name: "screenshot",
    alias: ["ss"],
    desc: "Machen Sie einen Screenshot einer Website, ohne sie zu besuchen.",
    usage: "ss <link>",
    react: "🍁",
    category: "Essentials",
    start: async(Miku, m,{pushName,prefix,args,text}) => {       
        if(!args[0]) return m.reply(`Bitte geben Sie mir einen Link zur Suche !`);
        if (!args[0].includes("http")){
            lookupURL= `https://${args[0]}`;
        }
        else{
            lookupURL = args[0];
        }   
        try {
            const resImage = await getBuffer(`https://api.popcat.xyz/screenshot?url=${lookupURL}`);
            await Miku.sendMessage(m.from, {image: resImage, caption: `_So sieht diese URL aus:_\n${args[0]}\n`}, {quoted: m});
        } catch (error) {
            m.reply(`Bei der Bearbeitung Ihrer Anfrage ist ein Fehler aufgetreten !\n\nBitte überprüfen Sie Ihren Link und versuchen Sie es erneut !`);
        }
    }
}

        
