// const {sendEmbed} = require('../functions')
// const {YoutubeDataAPI} = require('youtube-v3-api')
// const ytdl = require('ytdl-core')
// const {bot, queue} = require('../index')
// const {API_KEY} = require('../config')
//
// const api = new YoutubeDataAPI(API_KEY)
//
// module.exports = {
//   name: 'play',
//   description: 'Play tracks',
//   develops: true,
//   async execute(message, args) {
//     const serverQueue = queue.get(message.guild.id)
//     await execute(message, serverQueue)
//   }
// }
//
// const execute = async (message, serverQueue) => {
//   const args = message.content.split(' ')
//   const voiceChannel = message.member.voice.channel
//   if (!voiceChannel) return sendEmbed(message.channel, 'AQUA', '', 'Для запуска необходимо находиться в голосовом канале', 0)
//   const permissions = voiceChannel.permissionsFor(bot.user)
//   if (!permissions.has('CONNECT') || !permissions.has('SPEAK'))
//     return sendEmbed(message.channel, 'AQUA', '', 'У меня нет необходимых прав для присоединения', 0)
//
//   const result = await api.searchAll(args.slice(1).join(' '), 1)
//
//   const song = {
//     title: result.items[0].snippet.title,
//     url: result.items[0].id.videoId
//   }
//
//   console.log(serverQueue)
//
//   if (!serverQueue) {
//     const queueContruct = {
//       textChannel: message.channel,
//       voiceChannel: voiceChannel,
//       connection: null,
//       songs: [],
//       volume: 5,
//       playing: true
//     }
//
//     queue.set(message.guild.id, queueContruct)
//     queueContruct.songs.push(song)
//
//     try {
//       queueContruct.connection = await voiceChannel.join()
//
//       play(message, queueContruct.songs[0])
//     } catch (e) {
//       console.log(e)
//       queue.delete(message.guild.id)
//       return message.channel.send(e)
//     }
//   } else {
//     serverQueue.songs.push(song)
//     console.log(serverQueue.songs)
//     return sendEmbed(message.channel, 'AQUA', '', '`' + song.title + '` добавлен в очередь', 0)
//   }
// }
//
// const play = (message, song) => {
//   const serverQueue = queue.get(message.guild.id)
//
//   if (!song) {
//     serverQueue.voiceChannel.leave()
//     queue.delete(message.guild.id)
//     return
//   }
//
//   const dispatcher = serverQueue.connection.play(ytdl(song.url))
//     .on('start', () =>
//       sendEmbed(message.channel, 'AQUA', '', 'Сейчас играет ' + '`' + song.title + '`'), 0)
//     .on('speaking', isSpeak => {
//       if (isSpeak) return
//       console.log('Music ended')
//       serverQueue.songs.shift()
//       play(message, serverQueue.songs[0])
//     })
//
//     .on('error', () => {
//       console.error('Ошибка воспроизведения')
//     })
//   dispatcher.setVolume(0.5)
// }
