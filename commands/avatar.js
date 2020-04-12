const Discord = require('discord.js')

module.exports = {
  name: 'avatar',
  description: 'Send avatar icon in chat',
  cooldown: 5,
  usage: '[пользователь]',
  aliases: ['icon', 'pfp'],
  async execute(message) {
    const users = message.mentions.users
    const embed = []

    if (!users.size) {
      embed.push(new Discord.MessageEmbed()
        .setColor('AQUA')
        .setImage(message.author.avatarURL({size: 2048}))
      )
    } else {
      users.forEach(user => {
        embed.push(new Discord.MessageEmbed()
          .setColor('AQUA')
          .setImage(user.avatarURL({size: 2048}))
        )
      })
    }

    await message.channel.send(embed[0])
  }
}
