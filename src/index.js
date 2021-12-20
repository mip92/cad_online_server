const express = require('express')
const MethodService= require('./services/methodService')
const {isWindows} = require("nodemon/lib/utils");

const PORT = process.env.PORT || 5000
const app = express()
const WSServer = require('express-ws')(app)
const aWss = WSServer.getWss()
const method = new MethodService (aWss)

app.ws('/', (ws, req) => {
    console.log('Подключение установленно')
    ws.on('message', (msg) => {
        msg = JSON.parse(msg)
        switch (msg.method) {
            case'connection': {
                method.connectionHandler(ws, msg)
                break
            }
            case 'message': {
                //messageHandler(ws, msg)
                break
            }
            case 'draw': {
                method.broadcastDraw(ws, msg)
                break
            }
        }
    })
})
app.listen(PORT, () => console.log(`server started on PORT ${PORT}`))

