module.exports = {
  name: 'member-log',
  description: 'Выбор канала для отображения информации о вступивших и покинувших сервер пользователях',
  guildOnly: true,
  permissions: ['ADMINISTRATOR'],
  aliases: ['ml'],
  usage: '[@название_канала]',
  async execute(message, args) {
    const {memberLogChannels} = require('../model/index')

    if (!message.mentions)
      return message.reply('Нет названия канала')

    await memberLogChannels.set(message.guild.id, message.mentions.channels.first().id)
  }
}
