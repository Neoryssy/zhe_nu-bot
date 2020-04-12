// const {sendEmbed} = require('../functions')
// const {YoutubeDataAPI} = require('youtube-v3-api')
// const ytdl = require('ytdl-core')
// const {bot, queue} = require('../index')
// const {API_KEY} = require('../config')
//
// module.exports = {
//   name: 'stop',
//   description: 'Stop tracks',
//   develops: true,
//   async execute(message, args) {
//     stop(message, serverQueue)
//     await sendEmbed(message.channel, 'AQUA', '', 'Проигрывание остановлено', 0)
//   }
// }
//
// const stop = (message, serverQueue) => {
//   if (!message.member.voice.channel) return sendEmbed(message.channel, 'AQUA', '', 'Необходимо находиться в голосовом канале', 0)
//   serverQueue.songs = []
//   serverQueue.connection.dispatcher.end()
// }
