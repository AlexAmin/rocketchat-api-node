/*eslint no-console: ["error", { allow: ["log", "error"] }] */
const net = require("./net");
class RocketChatClient {
    constructor(protocol, host, port, username, password, onConnected, verbose, options) {

        if (arguments.length === 1) {
            host = arguments[0].host || "localhost";
            port = arguments[0].port || 3000;
            username = arguments[0].username || "";
            password = arguments[0].password || "";
            onConnected = arguments[0].onConnected;
            protocol = arguments[0].protocol || "http";
        }
        this.onConnected = onConnected || function () {};
        const restClient = new net.RestClient(protocol, host, port, "/api/v1/", verbose, options);
        //const wsClient = new net.WsClient("ws", host, port, basepath + "/websocket", options);

        this.authentication = new (require("./api/authentication"))(restClient);

        this.miscellaneous = new (require("./api/miscellaneous"))(restClient);
        this.chat = new (require("./api/chat"))(restClient);
        this.channels = new (require("./api/channels"))(restClient);
        this.groups = new (require("./api/groups"))(restClient);
        this.settings = new (require("./api/setting"))(restClient);
        this.users = new (require("./api/users"))(restClient);
        this.integration = new (require("./api/integration"))(restClient);
        this.subscriptions = new (require("./api/subscriptions"))(restClient);
        //this.realtime = new (require("./api/realtime"))(wsClient);
        //this.notify = new (require("./api/notify"))(wsClient);
        this.im = new (require("./api/im"))(restClient);

        this.restClient = restClient;
        //this.wsClient = wsClient;

        this.setAuthToken = (value) => {
            this._authToken = value;
            restClient.setHeader("X-Auth-Token", value);
        };
        this.setUserId = (value) => {
            this._userId = value;
            restClient.setHeader("X-User-Id", value);
        };

        this.logout = (callback) => {
            return new Promise((resolve, reject) => {
                self.authentication.logout((err, body) => {
                    if (err)
                        return callback ? callback(err, null) : reject(err);
                    self.setAuthToken(null);
                    self.setUserId(null);
                    return callback ? callback(null, body.data) : resolve(body.data);
                });
            });
        };
    }

    async login(username, password, callback){
        if (username && password) {
            const body = await this.authentication.login(username, password)
            this.setAuthToken(body.data.authToken);
            this.setUserId(body.data.userId);
            if(callback){
                callback(null, body);
            }
            return body;
        } else {
            throw new Error("No user credentials provided")
        }
    }
}



exports.RocketChatClient = RocketChatClient;
