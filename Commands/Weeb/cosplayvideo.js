const { getBuffer } = require("../../lib/myfunc");

module.exports = {
  name: "cosplayvideo",
  alias: ["cv","cosplayamv","cosplayvid" ],
  desc: "Um ein zufälliges Cosplayvideo zu erhalten",
  category: "Weeb",
  usage: `cosplayamv`,
  react: "😉",
  start: async (Miku, m, { prefix }) => {
    var VID = await getBuffer(`https://cosplay-video-api.onrender.com`);
    var Button = [
      {
        buttonId: `${prefix}cv`,
        buttonText: { displayText: `Weiter...` },
        type: 1,
      },
    ];
    let bmffg = {
      video: VID,
      gifPlayback:true,
      caption: `Wer bin ich senpai!!!\n`,
      footer: `*${botName}*`,
      buttons: Button,
      headerType: 4,
    };
    await Miku.sendMessage(m.from, bmffg, { quoted: m }).catch((err) => {
      return "Fehler!";
    });
  },
};
