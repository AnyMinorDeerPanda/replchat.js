# replchat.js
## About
replchat.js is a blazingly fast library for interacting with the replchat API
 - Object-oriented
 - Lightweight
 - Fast

## Installation
`npm install replchat.js`

replchat no longer requires an auth token! Instead, you now put your bots
username in as a parameter when constructiong the class. (More details in examples)

## Examples

Basic Bot:
```js
const ReplBot = require('replbot.js')

const bot = new ReplBot("TestBot") // Replace "TestBot" with the name of your bot

bot.on('ready', () => {
  console.log('Bot is logged in!')
})

bot.login()
```

After this we can add a simple command system:
```js
const ReplBot = require('replbot.js')

const bot = new ReplBot("TestBot") // Replace "TestBot" with the name of your bot

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
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  var fullCommand = message.content.substr(config.prefix.length).split(" ")
  var command = fullCommand[0]
  var args = fullCommand.splice(0, 1)

  if (commands.includes(command)) {
    if (command === 'ping')
      message.reply('pong!')
  } else
    message.reply(`Invalid Command! Use \`${config.prefix}help\` for a list of valid commands!`)
})

bot.login()
```

## Events
Currently there are 6 events, they are as follows:
- 'connected': called when the bot has connected
- 'ready': called when the bot is connected and ready
- 'message': called when a message is sent
- 'left': called when a user leaves
- 'joined': called when a user joins
- 'error': used when an error occurs (such as the bot was banned or kicked)

## Docs
Documentation is coming soon! Until then, hold on while I work on it!
