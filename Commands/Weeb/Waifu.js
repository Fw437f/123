const axios = require('axios');

module.exports = {
    name: "waifu",
    alias: ["swaifu","wify"],
    desc: "Holen Sie sich ein Anime-Mädchen-Bild.",
    react: "🥵",
    category: "Weeb",
    start: async(Miku, m,{pushName,prefix}) => {
        let waifus = await axios.get('https://api.waifu.pics/sfw/waifu');  

var Button = [
      {
        buttonId: `${prefix}waifu`,
        buttonText: { displayText: `Weiter...` },
        type: 1,
      },
    ];
    let waf = {
      image: {url:waifus.data.url},
      caption: `Hier bin ich senpai!!😜`,
      footer: `*${botName}*`,
      buttons: Button,
      headerType: 4,
    };
    await Miku.sendMessage(m.from, waf, { quoted: m }).catch((err) => {
      return "Error!";
    });
}, 
};
