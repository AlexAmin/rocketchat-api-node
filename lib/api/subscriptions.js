class Subscriptions {
    constructor(client) {
        this.client = client;
    }

    get({}, callback) {
        return this.client.request("GET", "subscriptions.get", null, callback);
    }
}

module.exports = Integration;
