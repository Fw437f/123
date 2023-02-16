require("../../config.js");
require("../../Core.js");

module.exports = {
  name: "announce",
  alias: ["anounce", "announ"],
  desc: "Markiere alle Gruppenmitglieder ohne @ mention",
  category: "Group",
  usage: "announce <your message>",
  react: "🍁",
  start: async (
    Miku,
    m,
    { text, prefix, isAdmin, participants, args,buttonId }
  ) => {

      var message = "*『 Achtung Hier 』*";

    if(m.quoted){
        message = "*『 Achtung Hier 』*";
      }
    else if (!text && m.quoted) {
      message = `${m.quoted ? m.quoted.msg : ''}`;
    }
    if(m.buttonId){
      message = m.buttonId;
    }
    else if(args[0]){
      message = args.join(' ');
    }
    else if(text ===''){
      message = "*『 Achtung Hier 』*";
    }
   
    else{
      message = "*『 Achtung Hier 』*";
    }
    await Miku.sendMessage(
      m.from,
      { text: message, mentions: participants.map((a) => a.id) },
      { quoted: m }
    );
  },
};
