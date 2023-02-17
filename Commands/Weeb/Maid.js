const axios = require('axios')

module.exports = {
    name: "maid",
    alias: ["safemaid","smd"],
    desc: "Holen Sie sich ein Anime-Mädchen-Bild.",
    react: "🥵",
    category: "Weeb",
    start: async(Miku, m,{pushName,prefix}) => {
        let maids = await axios.get('https://neko-maid-api.onrender.com');  

var Button = [
      {
        buttonId: `${prefix}smd`,
        buttonText: { displayText: `Weiter...` },
        type: 1,
      },
    ];
    let neko = {
      image: {url:maids.data.url},
      caption: `Hier Ich bin Oujou...Sama...!!`,
      footer: `*${botName}*`,
      buttons: Button,
      headerType: 4,
    };
    await Miku.sendMessage(m.from, neko, { quoted: m }).catch((err) => {
      return "Error!";
    });
}, 
};
