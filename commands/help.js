const {sendEmbed} = require('../functions')
const Discord = require('discord.js')

module.exports = {
  name: 'help',
  description: 'Список всех команд',
  aliases: ['commands', 'h'],
  usage: '[command name]',
  cooldown: 1,
  async execute(message, args) {
    const {prefixes} = require('../model/index')
    const {globalPrefix} = require('../config')
    const data = []
    const {commands} = message.client

    if (!args.length) {
      data.push('Список всех моих команд:')
      data.push(commands.map(command => `\`${command.name}\` -- ${command.description}`).join('\n'))
      // TODO: доделать префикс для DM и гильдий
      data.push(`\nДля просмотра сведений о команде \`${globalPrefix}help [command name]\``)

      const embed = new Discord.MessageEmbed()
        .setAuthor(message.client.user.username, message.client.user.avatarURL())
        .setColor('AQUA')
        .setDescription(data)

      return message.author.send(embed)
        .then(() => {
          if (message.channel.type === 'dm') return
          message.reply('я отправил список команд в личные сообщения')
        })
        .catch(err => {
          console.error(`Could not send help DM to ${message.author.tag}.\n`, err)
          message.reply('не удалось отправить список команд, проверьте открыты ли у вас личные сообщения')
        })
    }

    const name = args[0].toLowerCase()
    const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name))

    if (!command) {
      return sendEmbed(message.channel, 'AQUA', '', 'Неизвестная команда')
    }

    data.push(`\`Название:\` ${command.name}`)

    if (command.aliases) data.push(`\`Другие названия:\` ${command.aliases.join((', '))}`)
    if (command.description) data.push(`\`Описание:\` ${command.description}`)
    if (command.usage) {
      if (message.channel.type === 'dm') {
        data.push(`\`Аргументы:\` ${globalPrefix}${command.name} ${command.usage}`)
      }
    else {

        data.push(`\`Аргументы:\` ${await prefixes.get(message.guild.id)}${command.name} ${command.usage}`)
      }
    }

    data.push(`\`Статус:\` ${command.develops ? 'В разработке' : 'Готова к использованию'}`)
    data.push(`\`Время до следующего использования:\` ${command.cooldown || 3} секунд`)

    const embed = new Discord.MessageEmbed()
      .setAuthor(message.client.user.username, message.client.user.avatarURL())
      .setColor('AQUA')
      .setDescription(data)

    await message.channel.send(embed)
  }
}
