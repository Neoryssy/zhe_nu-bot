const {sendEmbed} = require('../functions')

module.exports = {
  name: 'reload',
  description: 'Перезагрузка команды',
  args: true,
  usage: '[команда]',
  permissions: ['ADMINISTRATOR'],
  develops: true,
  async execute(message, args) {
    const commandName = args[0].toLowerCase()
    const command = message.client.commands.get(commandName)
      || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))

    if (!command) return sendEmbed(message.channel, 'AQUA', '', `Нет команды с таким названием ${command.name}`)

    delete require.cache[require.resolve(`./${command.name}.js`)]

    try {
      const newCommand = require(`./${command.name}.js`)
      message.client.commands.set(newCommand.name, newCommand)
      await message.channel.send(`Command \`${command.name}\` was reloaded!`)
    } catch (error) {
      console.log(error)
      await message.channel.send(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``)
    }
  }
}
