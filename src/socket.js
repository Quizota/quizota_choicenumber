let $ = require('jquery')
let io = require('socket.io-client')
let socket = io('http://127.0.0.1:8000')

// ESNext in the browser!!!
socket.on('connect', () => {
    console.log('connected')

    let displayName = 'phuong_' + Date.now()
    let data = JSON.stringify({cmd: 'autoRegister', data: {displayName: displayName}})
    socket.emit('data', data)
})

module.exports = socket