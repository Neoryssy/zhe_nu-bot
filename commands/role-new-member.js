module.exports = {
  name: 'role-new-member',
  description: 'Роли для новых участников',
  guildOnly: true,
  permissions: ['ADMINISTRATOR'],
  aliases: ['rnm'],
  usage: '[@роль(и)]',
  async execute(message, args) {
    const {newMemberRoles} = require('../model/index')

    if (!message.mentions)
      return message.reply('Не указаны роли')

    await newMemberRoles.set(message.guild.id, message.mentions.roles.map(role => role.id))
  }
}
