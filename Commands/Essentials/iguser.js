const axios = require("axios");

module.exports = {
  name: "iguser",
  alias: ["instagramuser", "instauser", "iginfo"],
  desc: "Um Details eines Instagram-Benutzers zu erhalten",
  category: "Essentials",
  usage: "iguser <instagram username>",
  react: "🍁",
  start: async (Miku, m, { text, prefix, pushName,args }) => {
    if (!text)
      return m.reply(
        `Bitte geben Sie mir einen Instagram-Benutzernamen ${pushName} senpai !`
      );
    let igSearchTeram = text;
    try {
      fids = await axios.get(
        `https://api.popcat.xyz/instagram?user=${igSearchTeram}`
      );

      console.log(fids.data)
      const reply = `
*⚡Name:* ${fids.data.full_name}
*🔗 Username:* ${fids.data.username}
*🧒 Followers:* ${fids.data.followers}
*✨ Type:* ${fids.data.private}
*✔ Verified:* ${fids.data.verified}
*🙋 Following:* ${fids.data.following}
*👤 Post:* ${fids.data.posts}
*🍭Bio:* ${fids.data.biography}\n`;
      Miku.sendMessage(
        m.from,
        { image: { url: fids.data.profile_pic }, caption: reply },
        { quoted: m }
      );
    } catch (err) {
      console.log(err);
      return m.reply(
        `Ein Fehler ist aufgetreten! Bitte überprüfen Sie den Instagram-Benutzernamen ${pushName} senpai !`
      );
    }
  },
};
