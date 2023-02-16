const axios = require("axios");

module.exports = {
    name: "urbandictionary",
    alias: ["udictionary"],
    desc: "Um etwas im Urban Dictionary zu suchen",
    usage: "udictionary <text>",
    react: "🍁",
    category: "Essentials",
    start: async(Miku, m,{pushName,prefix,args,text}) => {
        if(!args[0]) return m.reply(`Bitte geben Sie mir einen Text zur Suche im Urban Dictionary !`);
        const query = args.join(" ");
        await axios.get(`https://api.urbandictionary.com/v0/define?term=${query}`).then((res) => {
            const text = `         *『  Urban Dictionary  』*\n\n📚 *Suchbegriff :* ${query}\n\n📖 *Definition :* ${res.data.list[0].definition
                .replace(/\[/g, "")
                .replace(/\]/g, "")}\n\n💬 *Beispiel :* ${res.data.list[0].example
                .replace(/\[/g, "")
                .replace(/\]/g, "")}\n`;

             Miku.sendMessage(m.from,  {image: {url: botImage1},caption: text}, {quoted: m });
                }).catch((err) => {
                    m.reply(`Ein Fehler ist aufgetreten !`);
                }
            );
    }
}
