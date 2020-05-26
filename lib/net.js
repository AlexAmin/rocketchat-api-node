"use strict";

const WebSocket = require("ws");
const HttpsProxyAgent = require("https-proxy-agent");

class RequestError extends Error {
    constructor(body, statusCode) {
        super(body);
        this.status = statusCode;
        this.name = "RequestError";
    }
}

class Client {
    constructor(protocol, host, port, basePath, options) {
        if(!options)
            options={};
        options.timeout=options.timeout || 1000;
        this.protocol = protocol;
        this.host = host;
        this.port = port;
        this.basePath = basePath;
        this.options=options;
    }

    makeUri(pathname = "") {
            return `${this.protocol}://${this.host}:${this.port}${this.basePath}${pathname}`
    }
}

/*
class WsClient extends Client {
    constructor(protocol = "ws", host, port, basePath, options) {
        super(protocol, host, port, basePath, options);
        const proxyURL = process.env.https_proxy;
        let wsOpts = proxyURL ? {agent: new HttpsProxyAgent(proxyURL)} : null;
        const ddpOptions = {
            endpoint: this.makeUri(),
            SocketConstructor: function (endpoint) {
                return new WebSocket(endpoint, wsOpts);
            }
        };
        this.ddp = new DDP(ddpOptions);
    }

    request(method, path, params, callback) {
        if (method === "method") {
            const methodId = this.ddp.method(path, params || []);
            this.ddp.on("result", (message) => {
                if (message.id === methodId) {
                    if (message.error)
                        callback(message.error, null);
                    else
                        callback(null, message.result);
                }
            });
        }
        else {
            throw new Error("Reqested method for WebSocket not implemented");
        }
    }

    subscribe({ userId = false, stream, event, secondparam = false }, onEventPublished) {
        if (userId) {
            this.ddp.sub(stream, [`${userId}/${event}`, secondparam]);
        }
        else {
            this.ddp.sub(stream, [`${event}`, secondparam]);
        }

        // publish stream on change event I guess
        this.ddp.on("changed", (message) => {
            if (message.collection === stream) {
                // how will I get an error? Will I ever get an error?
                onEventPublished(null, message);
            }
        });
    }

    disconnect() {
        this.ddp.disconnect();
        return this;
    }
}
exports.WsClient = WsClient;
*/

class RestClient extends Client {

    tryParseJson(body) {
        try {
            return JSON.parse(body);
        }
        catch (err) {
            return false;
        }
    }

    constructor(protocol, host, port, basePath, verbose, options) {
        super(protocol, host, port, basePath, options);
        this.clientRequest = require("node-fetch");
        this.headers = {};
        this.headers["content-type"] = "application/json";
        this.verbose = verbose;
    }

    setHeader(key, value) {
        this.headers[key] = value;
    }

    getHeader(key) {
        return this.headers[key];
    }

    removeHeader(key) {
        delete this.headers[key];
    }

    async request(method, path, params, callback, a, b, c) {
        let options = {
            method: method,
            body: JSON.stringify(params),
            qs: undefined,
            headers: this.headers,
            timeout: this.options.timeout,
        };

        if (method === "GET") {
            options.qs = params;
            options.body = null;
        }

        const url = this.makeUri(path);
        const response = await this.clientRequest(url, options)
        const body = await response.json()

        if(this.verbose){
            console.log("Rocket.Chat - Headers",response.headers);
            console.log("Rocket.Chat - Body",body);
        }
        let errorMessage = {
            401: "Requested method requires an authentication",
            404: "Requested resource was not found",
            405: "Requested method is not allowed",
            else: body.error || "An unknown error has occured"
        };

        if (response.status !== 200) {
            throw new RequestError(
                body,
                response.status,
                errorMessage[response.status]
            )
        }
        if(callback){
            callback(null, body)
        }
        return body;
    }
}
exports.RestClient = RestClient;
