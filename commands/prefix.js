const {sendEmbed} = require('../functions')
const {globalPrefix} = require('../config')

module.exports = {
  name: 'prefix',
  description: 'Узнать или изменить префикс команд',
  async execute(message, args) {
    const {prefixes} = require('../model/index')
    const guildPrefix = await prefixes.get(message.guild.id) || null

    if (message.channel.type !== 'dm') {
      if (args.length && args[0] !== guildPrefix) {
        await prefixes.set(message.guild.id, args[0])
        return sendEmbed(message.channel, 'AQUA', '', `Префикс изменен на \`${args[0]}\``)
      }
      return sendEmbed(message.channel, 'AQUA', '', `Префикс команд: \`${guildPrefix || globalPrefix}\``)
    }
    return sendEmbed(message.channel, 'AQUA', '', `Префикс команд: \`${globalPrefix}\``)
  }
}
