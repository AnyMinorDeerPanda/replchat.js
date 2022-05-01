# About
replchat.js is a blazingly fast library for interacting with the replchat API
 - Object-oriented
 - Lightweight
 - Fast

# Installation
`npm install replchat.js`

You will need to get an auth token for your bot, a tutorial will be provided soon

## ! WARNING ! Do NOT share your auth token with ANYONE

# Examples

Basic Bot:
```js
const ReplBot = require('replbot.js')

const bot = new ReplBot()

bot.on('ready', () => {
  console.log('Bot is logged in!')
})

bot.login('your-auth-token')
```

After this we can add a simple command system:
```js
const ReplBot = require('replbot.js')

const bot = new ReplBot()

const config = {
  prefix: '!'
}

const commands = [
  'ping'
]

bot.on('ready', () => {
  console.log('Bot is logged in!')
})

bot.on('message', (message) => {
  if (!message.content.startsWith(config.prefix)) return;

  var fullCommand = message.content.substr(config.prefix.length).split(" ")
  var command = fullCommand[0]
  var args = fullCommand.splice(0, 1)

  if (commands.includes(command)) {
    if (command === 'ping')
      message.reply('pong!')
  } else
    message.reply(`Invalid Command! Use \`${config.prefix}help\` for a list of valid commands!`)
})

bot.login('your-auth-token')
```

## Events
Currently there are 10 events, they are as follows:
- 'connected': called when the bot has connected
- 'ready': called when the bot is connected and ready
- 'message': called when a message is sent
- 'left': called when a user leaves
- 'joined': called when a user joins
- 'refreshed': called when `admin.refreshall` is called
- 'announcement': called when an announcement is made
- 'error': used when an error occurs (such as the bot was banned or kicked)
- 'debug': not currently used by replchat