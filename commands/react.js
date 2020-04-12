module.exports = {
  name: 'react',
  description: 'Рекция на сообщение',
  async execute(message) {
    message.react('👍').then(() => message.react('👎'))

    const filter = (reaction, user) => {
      return !user.bot
    }
    const collector = message.createReactionCollector(filter, {time: 15000})

    collector.on("collect", reaction => {
      message.reply(reaction.emoji.name)
    })

    collector.on('end', collected => {
      console.log('Collected: ', collected.size)
    })
  }
}
