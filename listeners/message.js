const Discord = require('discord.js')

module.exports = () => {
  const {client} = require('../bot')
  const {prefixes} = require('../model/index')
  const {sendEmbed} = require('../functions')
  const {globalPrefix} = require('../config')

  const cooldowns = new Discord.Collection()

  client.on('message', async message => {
    if (message.author.bot) return
    console.log('Message:', message.content)
    let prefix
    let args

    if (message.guild) {

      if (message.content.startsWith(globalPrefix)) {
        prefix = globalPrefix
      } else {
        const guildPrefix = await prefixes.get(message.guild.id)
        if (message.content.startsWith(guildPrefix)) prefix = guildPrefix
      }

      if (!prefix) return
      args = message.content.slice(prefix.length).split(/\s+/)
    } else {
      prefix = message.content.startsWith(globalPrefix) ? globalPrefix : ''
      args = message.content.slice(prefix.length).split(/\s+/)
    }

    const commandName = args.shift().toLowerCase()

    const command = client.commands.get(commandName)
      || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))

    if (!command)
      return await sendEmbed(message.channel, 'RED', '', 'Команды не существует')

    if (command.develops) return sendEmbed(message.channel, 'AQUA', '', 'Команда в разработке')

    if (command.permissions && !message.member.hasPermission(command.permissions)) {
      return sendEmbed(message.channel, 'RED', '', 'У вас нет доступа к этой команде')
    }

    if (command.guildOnly && message.channel.type !== 'text') {
      return sendEmbed(message.channel, 'RED', '', 'Я могу использовать это только в текстовом чате сервера')
    }

    if (command.args && !args.length) {
      let reply = `Отсутвуют необходимые аргументы`

      if (command.usage) {
        reply += `\n\`${prefix}${command.name} ${command.usage}\``

        return sendEmbed(message.channel, 'AQUA', '', reply)
      }

      return sendEmbed(message.channel, 'AQUA', '', reply)
    }

    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Discord.Collection())
    }

    const now = Date.now()
    const timestamps = cooldowns.get(command.name)
    const cooldownAmount = (command.cooldown || 3) * 1000

    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000
        return sendEmbed(message.channel, 'AQUA', '', `Подождите ${timeLeft.toFixed(1)} секунд перед повторным ипользованием`)
      }
    } else {
      timestamps.set(message.author.id, now)
      setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)
    }

    try{
      await command.execute(message, args)
    } catch (e) {
      console.error(e)
      await sendEmbed(message.channel, 'RED', '', 'Произошла ошибка во время выполнения команды')
    }
  })
}

