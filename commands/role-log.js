module.exports = {
  name: 'role-log',
  description: 'Выбор канала для отображения информации об изменении ролей',
  guildOnly: true,
  permissions: ['ADMINISTRATOR'],
  aliases: ['rl'],
  usage: '[@название_канала]',
  async execute(message, args) {
    const {roleLogChannels} = require('../model/index')

    if (!message.mentions)
      return message.reply('Нет названия канала')

    await roleLogChannels.set(message.guild.id, message.mentions.channels.first().id)
  }
}
