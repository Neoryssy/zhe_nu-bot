module.exports = () => {
  const {client} = require('../bot')
  const {sendEmbed} = require('../functions')

  client.on('guildMemberRemove', async member => {
    const {memberLogChannels} = require('../model/index')

    const logChannel = await memberLogChannels.get(member.guild.id)
    const channel = member.guild.channels.cache.find(ch => ch.id === logChannel)

    if (!channel) return
    await sendEmbed(channel, 'AQUA', '', `${member} покинул сервер`, 0)
  })
}
