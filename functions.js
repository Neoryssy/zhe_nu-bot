const Discord = require('discord.js')
const {client} = require('./bot')

module.exports.sendEmbed = async (sendTo, color, title, description, withAuthor = false) => {
  const embed = new Discord.MessageEmbed()
    .setTitle(title)
    .setColor(color)
    .setDescription(description)

  if (withAuthor) embed.setAuthor(client.user.username, client.user.avatarURL())

  await sendTo.send(embed)
}
