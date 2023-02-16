const pTable = require("ptable"); 
const npt = require("node-periodic-table");


module.exports = {
    name: "element",
    alias: ["elementinfo"],
    desc: "Um Informationen über ein Element aus der Priodic-Tabelle zu erhalten", 
    usage: "element br",
    react: "🍁",
    category: "Essentials",
    start: async(Miku, m,{pushName,prefix,args,text}) => {
        if(!args[0]) return m.reply(`Bitte verwenden Sie diesen Befehl wie folgt: ${prefix}element br`);
        const query = args.join(" ");
       const search = await pTable(query);
       if (search === undefined) return m.reply(`Bitte geben Sie mir ein gültiges Element, indem Sie hier vorbeischauen !\n\nhttps://en.m.wikipedia.org/wiki/Periodic_table`);

       const response = await npt.getByNumber(search.number);
       let caption  = "";
        caption = "              *『  Elementdetails  』*\n\n";
        caption += `🔴 *Elelment:* ${response.name}\n`;
		caption += `⬜ *Ordnungszahl:* ${response.number}\n`;
		caption += `🟡 *Atommasse:* ${response.atomic_mass}\n`;
		caption += `⬛ *Symbol:* ${response.symbol}\n`;
		caption += `❓ *Aussehen:* ${response.apearance}\n`;
		caption += `🟢 *Phase:* ${response.phase}\n`;
		caption += `♨️ *Siedepunkt:* ${response.boil} K\n️`;
		caption += `💧 *Schmelzpunkt:* ${response.melt} K\n`;
		caption += `🟣 *Dichte:* ${response.density} g/mL\n`;
		caption += `⚫ *Muscheln:* ${response.shells.join(", ")}\n`;
		caption += `🌐 *URL:* ${response.source}\n\n`;
		caption += `💬 *Zusammenfassung:* ${response.summary}\n`;
        await Miku.sendMessage(m.from,  {image: {url: botImage1},caption: caption}, {quoted: m });
    }
}
