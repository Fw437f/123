require("../../config.js");
require("../../Core.js");

module.exports = {
  name: "demote",
  alias: ["dem"],
  desc: "Entfernen Sie ein Mitglied Admin status",
  category: "Group",
  usage: "demote @user",
  react: "🍁",
  start: async (
    Miku,
    m,
    { text, prefix, isBotAdmin, isAdmin, mentionByTag,pushName,groupAdmin}
  ) =>{
    if (!isAdmin) {
      return Miku.sendMessage(
        m.from,
        { text: `${mess.useradmin}` },
        { quoted: m }
      );
    }
  //
    if (!text && !m.quoted) {
      return Miku.sendMessage(
        m.from,
        { text: `Bitte markieren Sie einen Benutzer mit *Demote*!` },
        { quoted: m }
      );
    } else if (m.quoted) {
      var mentionedUser = m.quoted.sender;
    } else {
      var mentionedUser = mentionByTag[0];
    }

    let userId = (await mentionedUser) || m.msg.contextInfo.participant;
    if(!groupAdmin.includes(userId)){
      return Miku.sendMessage(
        m.from,
        { text: `@${
          mentionedUser.split("@")[0]
        }  Senpai ist kein *Admin*!`,mentions: [mentionedUser], },
        { quoted: m }
      );
    }

    try {
      await Miku.groupParticipantsUpdate(m.from, [userId], "demote").then(
        (res) =>
          Miku.sendMessage(
            m.from,
            {
              text: `Verzeihung @${
                mentionedUser.split("@")[0]
              } Senpai, du wurdest von einem *Admin* *Zu Mitglied* !`,
              mentions: [mentionedUser],
            },
            { quoted: m }
          )
      );
    } catch (error) {
       Miku.sendMessage(
        m.from,
        { text: `${mess.botadmin}` },
        { quoted: m }
      ); 
    }
    
  },
};
