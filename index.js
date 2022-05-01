const EventEmitter = require('events').EventEmitter
const io = require("socket.io-client");

module.exports = class Client extends EventEmitter {
  constructor() {
    super()

    this.socket = {}

    this.last = ""
  }

  send(message) {
    this.socket.emit('chat message', { message })
  }

  login(auth) {
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

    this.socket.on('admin.refreshall', (data) => {
      this.emit('refreshed', data)
    })

    this.socket.on('admin.announcement', (data) => {
      this.emit('announcenent', data)
    })

    this.socket.on('admin.announceAll', (data) => {
      this.emit('announcenent', data)
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
      this.emit('message', {
        author: {
          username: data.username,
          avatar: data.pfp
        },
        content: data.message,
        reply: (content) => {
          var message = `Replying to @${data.username} (${data.message}): ${content}`
          this.send(message)
        }
      })
    })
  }
}
