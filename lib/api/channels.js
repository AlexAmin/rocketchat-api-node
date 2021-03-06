const pageQueryMapping = require("./lists/pageQueryMapper");

class Channels {
    constructor(client) {
        this.client = client;
    }

    addAll(roomId, callback) {
        return this.client.request("POST", "channels.addAll", {roomId}, callback);
    }

    addModerator(roomId, userId, callback) {
        return this.client.request("POST", "channels.addModerator", {roomId, userId}, callback);
    }

    removeModerator(roomId, userId, callback) {
        return this.client.request("POST", "channels.removeModerator", {roomId, userId}, callback);
    }

    addOwner(roomId, userId, callback) {
        return this.client.request("POST", "channels.addOwner", {roomId, userId}, callback);
    }

    archive(roomId, callback) {
        return this.client.request("POST", "channels.archive", {roomId}, callback);
    }

    unarchive(roomId, callback) {
        return this.client.request("POST", "channels.unarchive", {roomId}, callback);
    }

    delete(roomName, roomId, callback) {
        if(roomName){
            return this.client.request("POST", "channels.delete", {roomName}, callback);
        }else if(roomId){
            return this.client.request("POST", "channels.delete", {roomId}, callback);
        }
    }

    /*
    Endpoint does not exist (Not the same as room.cleanhistory https://rocket.chat/docs/developer-guides/rest-api/rooms/cleanhistory/#rooms-clean-history)
    28.02.2020
    cleanHistory(roomId, latest, oldest, inclusive=false, callback) {
        return this.client.request("POST", "channels.cleanHistory", {
            roomId,
            latest,
            oldest,
            inclusive
        }, callback);
    }
     */

    close(roomId, callback) {
        return this.client.request("POST", "channels.close", {roomId}, callback);
    }

    create (name, members, readOnly, callback) {
        return this.client.request("POST", "channels.create", { name, members, readOnly }, callback);
    }

    setDefault (roomId, isDefault, callback) {
        return this.client.request("POST", "channels.setDefault", { roomId, "default": isDefault }, callback);
    }

    moderators(roomName, roomId, callback) {
        if(roomName){
            return this.client.request("GET", "channels.moderators", {roomName}, callback);
        }else if(roomId){
            return this.client.request("GET", "channels.moderators", {roomId}, callback);
        }
    }



    getIntegrations(roomId, { offset = 0, count = 0, sort = undefined, fields = undefined, query = undefined} ={}, callback) {
        let options = {roomId};
        Object.assign(options, pageQueryMapping(arguments[1]));
        return this.client.request("GET", "channels.getIntegrations", options, callback);
    }

    history(hisOptions, { offset = 0, count = 0, sort = undefined, fields = undefined, query = undefined} ={}, callback) {
        Object.assign(hisOptions, arguments[1]);
        return this.client.request("GET", "channels.history", hisOptions, callback);
    }

    info (roomId, roomName, callback) {
        return this.client.request("GET", "channels.info", {roomId, roomName}, callback);
    }

    kick (roomId, userId, callback) {
        return this.client.request("POST", "channels.kick", {roomId, userId}, callback);
    }

    invite(roomId, userId, callback) {
        return this.client.request("POST", "channels.invite", {roomId, userId}, callback);
    }

    membersList(roomName, roomId, callback) {
        if(roomName){
            return this.client.request("GET", "channels.members", {roomName}, callback);
        }else if(roomId){
            return this.client.request("GET", "channels.members", {roomId}, callback);
        }
        throw new Error("Must provide either roomName or roomId");
    }

    leave(roomId, callback) {
        return this.client.request("POST", "channels.leave", {roomId}, callback);
    }

    open(roomId, callback) {
        return this.client.request("POST", "channels.open", {roomId}, callback);
    }

    listJoined ({ offset = 0, count = 0, sort = undefined, fields = undefined, query = undefined}, callback) {
        return this.client.request("GET", "channels.list.joined", pageQueryMapping(arguments[0]), callback);
    }

    list ({ offset = 0, count = 0, sort = undefined, fields = undefined, query = undefined}, callback) {
        return this.client.request("GET", "channels.list", pageQueryMapping(arguments[0]), callback);
    }

    roles (roomId, roomName, callback) {
        return this.client.request("GET", "channels.roles", {roomId, roomName}, callback);
    }

    removeOwner(roomId, userId, callback) {
        return this.client.request("POST", "channels.removeOwner", {roomId, userId}, callback);
    }

    rename(roomId, name, callback) {
        return this.client.request("POST", "channels.rename", {roomId, name}, callback);
    }

    setCustomFields(roomId, roomName, customFields, callback) {
        return this.client.request("POST", "channels.setCustomFields", {roomId, roomName, customFields}, callback);
    }

    setDescription(roomId, description, callback) {
        return this.client.request("POST", "channels.setDescription", {roomId, description}, callback);
    }

    setJoinCode(roomId, joinCode, callback) {
        return this.client.request("POST", "channels.setJoinCode", {roomId, joinCode}, callback);
    }

    setPurpose(roomId, purpose, callback) {
        return this.client.request("POST", "channels.setPurpose", {roomId, purpose}, callback);
    }

    setReadOnly(roomId, readOnly, callback) {
        return this.client.request("POST", "channels.setReadOnly", {roomId, readOnly}, callback);
    }

    setTopic (roomId, topic, callback) {
        return this.client.request("POST", "channels.setTopic", {roomId, topic}, callback);
    }

    setType(roomId, type, callback) {
        return this.client.request("POST", "channels.setType", {roomId, type}, callback);
    }
}

module.exports = Channels;
