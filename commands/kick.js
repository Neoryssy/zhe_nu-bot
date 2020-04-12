const {sendEmbed} = require('../functions')

module.exports = {
  name: 'kick',
  description: 'Kick a user from the server',
  guildOnly: true,
  permissions: ['KICK_MEMBERS'],
  args: true,
  usage: '[пользователь]',
  async execute(message) {
    const users = message.mentions.users

    users.forEach(user => {
      const member = message.guild.member(user)

      if (!member) return sendEmbed(
        message.channel, 'AQUA', '', `${user.username} не находится на сервере`, 0
      )

      member.kick('Плохое поведение')
        .catch(err => {
          sendEmbed(message.channel, 'AQUA', '', `Не удалось кикнуть ${member}`, 0)
          console.error(err)
        })
    })
  }
}
