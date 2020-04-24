/**
 * Created by qeesung on 2017/4/29.
 */
const pageQueryMapping = require("./lists/pageQueryMapper");

class Groups {
    constructor(client) {
        this.client = client;
    }

    addAll(roomId, activeUsersOnly, callback) {
        return this.client.request("POST", "groups.addAll", {roomId, activeUsersOnly}, callback);
    }

    addModerator(roomId, userId, callback) {
        return this.client.request("POST", "groups.addModerator", {roomId, userId}, callback);
    }

    removeModerator(roomId, userId, callback) {
        return this.client.request("POST", "groups.removeModerator", {roomId, userId}, callback);
    }

    addOwner(roomId, userId, callback) {
        return this.client.request("POST", "groups.addOwner", {roomId, userId}, callback);
    }

    setCustomFields(roomId, roomName, customFields, callback) {
        return this.client.request("POST", "groups.setCustomFields", {roomId, roomName, customFields}, callback);
    }

    archive(roomId, callback) {
        return this.client.request("POST", "groups.archive", {roomId}, callback);
    }

    delete(roomName, roomId, callback) {
        if(roomName){
            return this.client.request("POST", "groups.delete", {roomName}, callback);
        }else if(roomId){
            return this.client.request("POST", "groups.delete", {roomId}, callback);
        }
    }

    moderators(roomName, roomId, callback) {
        if(roomName){
            return this.client.request("GET", "groups.moderators", {roomName}, callback);
        }else if(roomId){
            return this.client.request("GET", "groups.moderators", {roomId}, callback);
        }
    }

    unarchive(roomId, callback) {
        return this.client.request("POST", "groups.unarchive", {roomId}, callback);
    }

    close(roomId, callback) {
        return this.client.request("POST", "groups.close", {roomId}, callback);
    }

    create (name, members, readOnly, callback) {
        return this.client.request("POST", "groups.create", { name, members, readOnly }, callback);
    }

    getIntegrations(roomId, { offset = 0, count = 0, sort = undefined, fields = undefined, query = undefined} ={}, callback) {
        let options = {roomId};
        Object.assign(options, pageQueryMapping(arguments[1]));
        return this.client.request("GET", "groups.getIntegrations", options, callback);
    }

    history(hisOptions, { offset = 0, count = 0, sort = undefined, fields = undefined, query = undefined} ={}, callback) {
        Object.assign(hisOptions, arguments[1]);
        return this.client.request("GET", "groups.history", hisOptions, callback);
    }

    info (roomId, roomName, callback) {
        return this.client.request("GET", "groups.info", {roomId, roomName}, callback);
    }

    kick (roomId, userId, callback) {
        return this.client.request("POST", "groups.kick", {roomId, userId}, callback);
    }

    invite(roomId, userId, callback) {
        return this.client.request("POST", "groups.invite", {roomId, userId}, callback);
    }

    leave(roomId, callback) {
        return this.client.request("POST", "groups.leave", {roomId}, callback);
    }

    open(roomId, callback) {
        return this.client.request("POST", "groups.open", {roomId}, callback);
    }

    list ({ offset = 0, count = 0, sort = undefined, fields = undefined, query = undefined} ={}, callback) {
        return this.client.request("GET", "groups.list", pageQueryMapping(arguments[0]), callback);
    }

    roles (roomId, roomName, callback) {
        return this.client.request("GET", "groups.roles", {roomId, roomName}, callback);
    }

    listAll (callback) {
        return this.client.request("GET", "groups.listAll", {}, callback);
    }

    removeOwner(roomId, userId, callback) {
        return this.client.request("POST", "groups.removeOwner", {roomId, userId}, callback);
    }

    rename(roomId, name, callback) {
        return this.client.request("POST", "groups.rename", {roomId, name}, callback);
    }

    setDescription(roomId, description, callback) {
        return this.client.request("POST", "groups.setDescription", {roomId, description}, callback);
    }

    setPurpose(roomId, purpose, callback) {
        return this.client.request("POST", "groups.setPurpose", {roomId, purpose}, callback);
    }

    setReadOnly(roomId, readOnly, callback) {
        return this.client.request("POST", "groups.setReadOnly", {roomId, readOnly}, callback);
    }

    setTopic (roomId, topic, callback) {
        return this.client.request("POST", "groups.setTopic", {roomId, topic}, callback);
    }

    setType(roomId, type, callback) {
        return this.client.request("POST", "groups.setType", {roomId, type}, callback);
    }

    membersList(roomName, roomId, callback) {
        if(roomName){
            return this.client.request("GET", "groups.members", {roomName}, callback);
        }else if(roomId){
            return this.client.request("GET", "groups.members", {roomId}, callback);
        }
        throw new Error("Must provide either roomName or roomId");

    }
}

module.exports = Groups;
