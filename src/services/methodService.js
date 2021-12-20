class MethodService {
    constructor(aWss) {
        this.aWss=aWss
    }
    connectionHandler(ws, msg){
        ws.id = msg.id
        this.aWss.clients.forEach(client => {
            if (client.id === msg.id) {
                client.send(JSON.stringify(msg))
            }
        })
    }
   /* messageHandler(){
        if (this.ws.id === this.msg.id) broadcastConnection()
    }*/

    broadcastConnection(ws, msg){
        this.aWss.clients.forEach(client => {
            if (client.id === msg.id) {
                client.send(`Пользователь ${msg.userName} подключился`)
            }
        })
    }
    broadcastDraw(ws, msg){
        this.aWss.clients.forEach(client => {

           // if (client.id === msg.id) {
                client.send(JSON.stringify(msg))
           // }
        })
    }
}

module.exports = MethodService

