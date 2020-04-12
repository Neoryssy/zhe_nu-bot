module.exports = {
  name: 'ping',
  description: 'pong',
  cooldown: 5,
  async execute(message) {
    await message.channel.send('pong')
  }
}
