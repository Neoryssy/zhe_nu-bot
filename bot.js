const fs = require('fs')
const Discord = require('discord.js')
const {token, PERMISSIONS_INTEGER} = require('./config')

const client = new Discord.Client()
client.commands = new Discord.Collection()

// Main callback, calls after connect to server
client.on('ready', () => {
  module.exports.client = client

  client.generateInvite(PERMISSIONS_INTEGER)
    .then(link => console.log(`Bot ${client.user.username} has started\nGenerated bot invite link: ${link}`))
    .catch(console.error)

  const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
  for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command)
  }

  const listenerFiles = fs.readdirSync('./listeners').filter(file => file.endsWith('.js'))
  for (const file of listenerFiles) {
    const listener = require(`./listeners/${file}`)
    listener()
  }
})

// Join to server by token
client.login(token).catch(() => console.error('Bot could not connect to server'))


