const {sendEmbed} = require('../functions')

module.exports = {
  name: 'prune',
  description: 'Удалить от 1 до 99 сообщений',
  guildOnly: true,
  permissions: ['MANAGE_MESSAGES'],
  args: true,
  usage: '[количество]',
  async execute(message, args) {
    const amount = parseInt(args[0]) + 1

    if (isNaN(amount)) return sendEmbed(message.channel, 'RED', '', 'Укажите число сообщений', 0)
    if (amount < 2 || amount > 100) return sendEmbed(message.channel, 'RED', '', 'Удалить можно от 1 до 99 сообщений за раз', 0)

    message.channel.bulkDelete(amount, true)
      .catch(err => {
        console.log(err)
        sendEmbed(message.channel, 'RED', '', `Произошла ошибка при удалении, возможно вы попытались удалить сообщения старше 2-х недель`, 0)
      })
  }
}
