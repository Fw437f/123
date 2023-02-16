const ttt = require('google-tts-api');

module.exports = {
    name: "saybengali",
    alias: ["speakbengali","saybengali" ,"sayinbengali","saybangla","speakbangla","sayinbangla"],
    desc: "Sagen Sie etwas mit Bot in bengalischem Akzent.",
    usage: "saybengali <text>",
    react: "🍁",
    category: "Essentials",
    start: async(Miku, m,{pushName,prefix,args,text,mime}) => {
        //if(!args[0] && !m.quoted) return m.reply(`Please provide me a text to say!`);
        
        if (!text && m.quoted) {
            message = `${m.quoted ? m.quoted.msg : ''}`;
          }
          else if(args[0]){
            message = args.join(' ');
          }
          else{
            message = `Gib mir einen Text zu erzählen ${pushName} senpai !`;
          }

        const texttospeechurl = ttt.getAudioUrl(message, {lang: "bn", slow: false, host: "https://translate.google.com",});
        
            Miku.sendMessage(m.from, { audio: {url: texttospeechurl} ,mimetype: 'audio/mpeg' }, { quoted: m }).catch(e => {
                m.reply(`Ein Fehler ist aufgetreten !`);
            });
    }
}
