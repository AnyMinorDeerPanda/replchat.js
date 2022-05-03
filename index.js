const EventEmitter = require('events').EventEmitter
const io = require("socket.io-client");

module.exports = class Client extends EventEmitter {
  constructor() {
    // Construct Client
    super()

    this.socket = {}

    this.last = ""
  }

  // Client Functions
  send(message) {
    // Send Message to replchat
    this.socket.emit('chat message', { message })
  }

  login(auth) {
    // Authenticate with replchat
    this.socket = io(`https://replchat.vapwastaken.repl.co/`, {
      transports: ["websocket"],
      extraHeaders: {
        "Cookie": `REPL_AUTH=${auth}`
      }
    });

    this.socket.on('connect', () => {
      this.emit('connected')
    });

    this.socket.on('getmessages', () => {
      this.emit('ready')
    })

    this.socket.on('joined', (data) => {
      if (this.last != 'joined.' + data.username) {
        this.emit('join', data.username)
        this.last = 'joined.' + data.username
      }
    })

    this.socket.on('left', (data) => {
      if (this.last != 'left.' + data.username) {
        this.emit('left', data.username)
        this.last = 'left.' + data.username
      }
    })

    this.socket.on('banned', () => {
      this.emit('error', {
        data: 'banned'
      })
    })

    this.socket.on('admin.kick', () => {
      this.emit('error', {
        data: 'kicked'
      })
    })

    this.socket.on('chat message', (data) => {
      var message = new Message(this, data)
      this.emit('message', message)
    })
  }
}

class Message {
  constructor(client, data) {
    // Construct Message
    this.author = {
      username: data.username,
      avatar: data.pfp
    }

    this.content = data.message

    this.client = client
  }

  // Message Functions
  reply(content) {
    var message = `Replying to @${this.author.username} (${this.content}): ${content}`
    this.client.send(message)
  }
}
