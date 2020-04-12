const {sendEmbed} = require('../functions')

module.exports = {
  name: 'invite-link',
  description: 'Создать ссылку-приглашение',
  cooldown: 10,
  guildOnly: true,
  async execute(message) {
    message.guild.fetchInvites()
      .then(invites => {
        const link = invites.find(invite => invite.inviter === message.client.user)

        if (!link) {
          message.channel.createInvite()
            .then(invite => sendEmbed(message.channel, 'AQUA', '', `Ссылка \`${invite.url}\` действительна в течение ${invite.maxAge / 3600} часов`))
            .catch(() => sendEmbed(message.channel, 'RED', '', 'Не удалось создать ссылку'))
        } else {
          const now = new Date()
          const expirationTime = link.expiresAt
          const timeLeft = (expirationTime - now) / 3600000
          sendEmbed(message.channel, 'AQUA', '', `Ссылка \`${link.url}\` действительна в течение ${timeLeft.toFixed(0)} часов`)
        }
      })
  }
}
