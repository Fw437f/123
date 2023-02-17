const { getBuffer } = require("../../lib/myfunc");

module.exports = {
  name: "animequotes",
  alias: ["aniquotes", "quotesanime","animequote"],
  desc: "Um ein zufälliges Bild mit Anime-Zitaten zu erhalten",
  category: "Weeb",
  usage: `quatoes`,
  react: "🍁",
  start: async (Miku, m, { prefix,pushName }) => {
    var Image = await getBuffer(`https://anime-quatoes.onrender.com/`);
    var Button = [
      {
        buttonId: `${prefix}animequotes`,
        buttonText: { displayText: `Weiter...` },
        type: 1,
      },
    ];
    let bmffg = {
      image: Image,
      caption: `Fühle meine Zitate *${pushName}* Senpai ♥️`,
      footer: `*${botName}*`,
      buttons: Button,
      headerType: 4,
    };
    await Miku.sendMessage(m.from, bmffg, { quoted: m }).catch((err) => {
      return "Error!";
    });
  },
};
