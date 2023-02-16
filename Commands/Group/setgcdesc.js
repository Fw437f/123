module.exports = {
  name: "setgcdesc",
  alias: ["setdescgc", "setdesc","setgroupdesc","setgroupdescription"],
  desc: "Ändern Sie die Gruppenbeschreibung",
  category: "Group",
  usage: `setdesc <New group description>`,
  react: "🍁",
  start: async (
    Miku,
    m,
    { text, prefix, isBotAdmin, isAdmin, pushName, metadata, args,mime}
  ) => {
    if (!isAdmin && !isBotAdmin)
        return Miku.sendMessage(m.from, { text: `*Bot* und *${pushName}* bot muss *Admin* sein, um diesen Befehl zu verwenden!` }, { quoted: m });
    if (!args[0])
        return Miku.sendMessage(m.from, { text: `Bitte geben Sie eine neue Gruppenbeschreibung ein !` }, { quoted: m });
    
    var newGCdesc = args.join(" ");

    try {
        ppgc = await Miku.profilePictureUrl(m.from, "image");
      } catch {
        ppgc = botImage1;
      }

    await Miku.groupUpdateDescription(m.from, newGCdesc).then((res) => Miku.sendMessage(
        m.from,
        {
          image: { url: ppgc, mimetype: "image/jpeg" },
          caption: `*『 Gruppenbeschreibung geändert 』*\n\n_🧩 Neue Beschreibung:_\n*${args.join(" ")}*`,
        },
        { quoted: m }
      )).catch((err) => replay(jsonformat(err)))
    
  },
};

