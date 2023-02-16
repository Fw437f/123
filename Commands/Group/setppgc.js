const fs = require("fs");
const Jimp = require("jimp");
require("../../Core.js");

module.exports = {
  name: "setppgc",
  alias: ["setgcpp", "setppgroup"],
  desc: "Legen Sie ein Gruppenprofilbild fest.",
  category: "Group",
  usage: `Tag an Image and type -setppgc}`,
  react: "🍁",
  start: async (
    Miku,
    m,
    { text, prefix, isBotAdmin, isAdmin, mentionByTag, pushName, mime, quoted }
  ) => {
    if (!isAdmin && !isBotAdmin)
      return Miku.sendMessage(m.from, { text: `*Bot* und *${pushName}* bot muss Admin sein, um diesen Befehl zu verwenden!` }, { quoted: m });

    if (!/image/.test(mime))
      return Miku.sendMessage(
        m.from,
        {
          text: `Bild mit Bildunterschrift senden/antworten ${
            prefix + "setgcpp"
          } um das Profilbild dieser Gruppe zu ändern.`,
        },
        { quoted: m }
      );
    if (/webp/.test(mime))
      return Miku.sendMessage(
        m.from,
        {
          text: `Bild mit Bildunterschrift senden/antworten ${
            prefix + "setgcpp"
          } um das Profilbild dieser Gruppe zu ändern.`,
        },
        { quoted: m }
      );

      let quotedimage = await Miku.downloadAndSaveMediaMessage(quoted)
      var { preview } = await generatePP(quotedimage)   
      
      await Miku.query({
        tag: 'iq',
        attrs: {
            to: m.from,
            type:'set',
            xmlns: 'w:profile:picture'
        },
        content: [{
            tag: 'picture',
            attrs: { type: 'image' },
            content: preview
        }]
    })
    fs.unlinkSync(quotedimage)

    ppgc = await Miku.profilePictureUrl(m.from, "image");

    Miku.sendMessage(
        m.from,
        { image: {url: ppgc},caption: `\
        Profilbild wurde erfolgreich aktualisiert von *${pushName}* !` },
        { quoted: m }
      )
  },
};

async function generatePP(buffer) {
    const jimp = await Jimp.read(buffer)
    const min = jimp.getWidth()
    const max = jimp.getHeight()
    const cropped = jimp.crop(0, 0, min, max)
    return {
        img: await cropped.scaleToFit(720, 720).getBufferAsync(Jimp.MIME_JPEG),
        preview: await cropped.normalize().getBufferAsync(Jimp.MIME_JPEG)
    }
}
