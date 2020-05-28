class Chat {
    constructor(client) {
        this.client = client;
    }

    getMessage(msgId, callback){
        return this.client.request("GET", "chat.getMessage", {msgId}, callback)
    }

    postMessage(data, callback) {
        return this.client.request("POST", "chat.postMessage", data, callback);
    }

    sendMessage(data, callback) {
        return this.client.request("POST", "chat.sendMessage", data, callback);
    }

    delete({ roomId, msgId, asUser = false }, callback) {
        return this.client.request("POST", "chat.delete", { roomId, msgId, asUser }, callback);
    }

    update({ roomId, msgId, text }, callback) {
        return this.client.request("POST", "chat.update", { roomId, msgId, text }, callback);
    }
}

module.exports = Chat;
