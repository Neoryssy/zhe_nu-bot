module.exports = () => {
  const {client} = require('../bot')
  const {roleLogChannels} = require('../model/index')

  client.on('guildMemberUpdate', async (oldMember, newMember) => {
    const roles = []
    const logChannel = await roleLogChannels.get(oldMember.guild.id)
    const channel = oldMember.guild.channels.cache.find(ch => ch.id === logChannel)

    if (oldMember.roles.cache.size > newMember.roles.cache.size) {
      const iterator = oldMember.roles.cache.keys()

      for (let snowflake of iterator) {
        !newMember.roles.cache.has(snowflake) ? roles.push(oldMember.roles.cache.get(snowflake)) : null
      }
      channel.send(`${oldMember} убраны роли ${roles.join(', ')}`)
    } else if (oldMember.roles.cache.size < newMember.roles.cache.size) {
      const iterator = newMember.roles.cache.keys()

      for (let snowflake of iterator) {
        !oldMember.roles.cache.has(snowflake) ? roles.push(newMember.roles.cache.get(snowflake)) : null
      }
      channel.send(`${oldMember} добавлены роли ${roles.join(', ')}`)
    }

    if (oldMember.nickname !== newMember.nickname) {
      channel.send(`${newMember} изменено имя, старое \`${oldMember.nickname}\``)
    }
  })
}
