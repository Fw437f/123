const { exec, spawn, execSync } = require("child_process")
const fs = require("fs");
const {getRandom}=require('../../lib/myfunc')

module.exports = {
    name: "slow",
    alias: ["sloweffect"],
    desc: "Um einem Song einen langsamen Effekt hinzuzufügen",
    category: "Audio Edit",
    usage: "slow <reply to audio>",
    react: "🍁",
    start: async (Miku, m, { text, prefix,quoted,pushName,mime,body }) => {

     let media = await Miku.downloadAndSaveMediaMessage(quoted)
     let set = '-filter:a "atempo=0.8,asetrate=44100"'
     let ran = getRandom('.mp3')
     try{
        exec(`ffmpeg -i ${media} ${set} ${ran}`, (err, stderr, stdout) => {
            fs.unlinkSync(media)
            if (err) return m.reply('Ein Fehler ist aufgetreten !')
            let buff = fs.readFileSync(ran)
            Miku.sendMessage(m.from, { audio: buff, mimetype: 'audio/mpeg' }, { quoted : m })
            fs.unlinkSync(ran)
            })

     }catch(e){
         m.reply('Es ist ein Fehler aufgetreten! Bitte erwähnen Sie ein Audio!')
        }
        
    }
}
