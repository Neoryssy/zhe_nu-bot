module.exports = () => {
  const {client} = require('../bot')
  const {sendEmbed} = require('../functions')

  client.on('guildMemberAdd', async member => {
    const {memberLogChannels} = require('../model/index')
    const {newMemberRoles} = require('../model/index')

    const memberChannel = await memberLogChannels.get(member.guild.id)
    const roles = await newMemberRoles.get(member.guild.id)

    roles.forEach(role => member.roles.add(role))

    member.guild.channels.cache.find(ch => ch.id === memberChannel).send(`Новое лицо на сервере, ${member}`)
  })
}
