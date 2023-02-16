module.exports = {
    name: "hi",
    alias: ["hello"],
    desc: "Sag hallo zu bot.",
    react: "🧣",
    category: "Core",
    start: async(Miku, m,{pushName,prefix}) => {
        await Miku.sendMessage(m.from,{text:`Konichiwa *${pushName}* senpai, Ich bin *${botName}* bot. gib *${prefix}help* um meine vollständige Befehlsliste zu erhalten.`},{quoted:m})
    }
}
