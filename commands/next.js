// const {sendEmbed} = require('../functions')
// const {YoutubeDataAPI} = require('youtube-v3-api')
// const ytdl = require('ytdl-core')
// const {bot, queue} = require('../index')
// const {API_KEY} = require('../config')
//
// module.exports = {
//   name: 'next',
//   description: 'Next track',
//   async execute(message, args) {
//     next(message, serverQueue)
//   }
// }
//
// const next = (message, serverQueue) => {
//   if (!message.member.voice.channel) return sendEmbed(message.channel, 'AQUA', '', 'Необходимо находиться в голосовом канале', 0)
//   if (!serverQueue) return sendEmbed(message.channel, 'AQUA', '', 'Нет песен в очереди', 0)
//   serverQueue.connection.dispatcher.end()
// }
