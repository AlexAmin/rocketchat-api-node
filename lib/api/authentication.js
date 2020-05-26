module.exports = Authentication;

function Authentication(client) {
    this.client = client;
}

Authentication.prototype.login = async function (user, password, callback) {
    return this.client.request("POST", "login", { "user": user, "password": password })
};

Authentication.prototype.logout = function (callback) {
    const restClient = this.client;
    restClient.request("GET", "logout", null, function(err, body){
        if(err == null){
            restClient.removeHeader("X-Auth-Token");
            restClient.removeHeader("X-User-Id");
        }
        return callback(err, body);
    });
};

Authentication.prototype.me = function (callback) {
    this.client.request("GET", "me", null, callback);
};
