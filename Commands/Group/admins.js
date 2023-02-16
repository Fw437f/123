module.exports = {
    name: "admins",
    alias: ["tagadmins" ,"admin"],
    desc: "Markieren Sie alle Gruppenadministratoren.",
    category: "Group",
    usage: "admins <your message>",
    react: "🍁",
    start: async (
      Miku,
      m,
      { text, prefix, isAdmin, participants, args ,groupAdmin}
    ) => {

    let message = "       『 *Achtung Admins* 』";

    if(m.quoted){
        message = "       『 *Achtung Admins* 』";
      }
    else if (!text && m.quoted) {
      message = `${m.quoted ? m.quoted.msg : ''}`;
    }
    else if(args[0]){
      message = `       『 *Achtung Admins* 』\n\n_🎀 Message:_ *${args.join(' ')}*`;
    }
    else if(text ===''){
      message = "       『 *Achtung Admins* 』";
    }
   
    else{
      message = "       『 *Achtung Admins* 』";
    }
    
        Miku.sendMessage(m.from, { text: message, mentions: groupAdmin}, { quoted: m });
    }
}
