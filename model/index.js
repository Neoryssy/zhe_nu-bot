const Keyv = require('keyv')

module.exports = {
  prefixes: new Keyv('sqlite://database.db', {namespace: 'prefixes'}),
  newMemberRoles: new Keyv('sqlite://database.db', {namespace: 'newMemberRoles'}),
  memberLogChannels: new Keyv('sqlite://database.db', {namespace: 'memberLogChannels'}),
  memberNameLogChannels: new Keyv('sqlite://database.db', {namespace: 'memberNameLogChannels'}),
  roleLogChannels: new Keyv('sqlite://database.db', {namespace: 'roleLogChannels'})
}
