const ttt = require('google-tts-api');

module.exports = {
    name: "sayjapanese",
    alias: ["speakjapanese","sayjapanese" ,"sayinjapnese","sayja"],
    desc: "Sagen Sie etwas mit Bot in japanischem Akzent.",
    usage: "sayjapanese <text>",
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
            message = `Bitte geben Sie mir einen Text zu sagen ${pushName} senpai !`;
          }

        const texttospeechurl = ttt.getAudioUrl(message, {lang: "ja", slow: false, host: "https://translate.google.com",});
        
            Miku.sendMessage(m.from, { audio: {url: texttospeechurl} ,mimetype: 'audio/mpeg' }, { quoted: m }).catch(e => {
                m.reply(`Ein Fehler ist aufgetreten !`);
            });
    }
}
