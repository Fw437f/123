const { getBuffer } = require("../../lib/myfunc");

module.exports = {
  name: "cosplay",
  alias: ["crosplay", "cos", "cplay"],
  desc: "Um ein zufälliges Cosplay-Bild zu erhalten",
  category: "Weeb",
  usage: `cosplay`,
  react: "🍁",
  start: async (Miku, m, { prefix }) => {
    var cosplayImage = await getBuffer(`https://fantox-cosplay-api.onrender.com/`);
    var cosplayButton = [
      {
        buttonId: `${prefix}cosplay`,
        buttonText: { displayText: `weiter...` },
        type: 1,
      },
    ];
    let bmffg = {
      image: cosplayImage,
      caption: `Wer bin ich *${pushName}* senpai!!!\n`,
      footer: `*${botName}*`,
      buttons: cosplayButton,
      headerType: 4,
    };
    await Miku.sendMessage(m.from, bmffg, { quoted: m }).catch((err) => {
      return "Fehler!";
    });
  },
};
