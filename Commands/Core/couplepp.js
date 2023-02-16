const {fetchJson} = require('../../lib/myfunc')

module.exports = {
    name: "couplepp",
    alias: ["ppcouple"],
    desc: "Holen Sie sich ein passendes Paar-Profilbild.",
    react: "💞",
    category: "Core",
    start: async(Miku, m,{pushName,prefix}) => {
        let anu = await fetchJson('https://raw.githubusercontent.com/iamriz7/kopel_/main/kopel.json');
        let randompplink = anu[Math.floor(Math.random() * anu.length)];
        Miku.sendMessage(m.from, { image: { url: randompplink.male }, caption: `_Für ihn..._` }, { quoted: m })
        Miku.sendMessage(m.from, { image: { url: randompplink.female }, caption: `_Für Sie..._` }, { quoted: m })

    }
}
