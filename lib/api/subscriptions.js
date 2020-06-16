class Subscriptions {
    constructor(client) {
        this.client = client;
    }

    get({}, callback) {
        return this.client.request("GET", "subscriptions.get", {}, callback);
    }
}

module.exports = Subscriptions;
