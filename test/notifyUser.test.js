var RocketChatClient = require("../lib/rocketChat").RocketChatClient;
var should = require("should");

const config = require("./config.json");

describe("notifyUser", function () {
    let userToAdd = {
        "name": "sender" + new Date().getTime(),
        "email": `email${new Date().getTime()}@example.com`,
        "password": "anypassyouwant",
        "username": "uniqueusername" + new Date().getTime()
    };
    let userId;
    let client, secondClient;

    this.timeout(1500);
    before(function (done) {
        //Create first client
        client = new RocketChatClient("http", config.host, config.port, config.user, config.password, (err, body) => {
            should(err).be.null();
            should(body).not.be.null();
            userId = body.userId;
            //Create a new user
            client.users.create(userToAdd, function (secondUserErr, secondUserBody) {
                should(secondUserErr).be.null();
                should(secondUserBody).not.be.null();
                //Create a second client with the new user's credentials
                secondClient = new RocketChatClient("http", config.host, config.port, userToAdd.username, userToAdd.password, (secondClientErr, secondClientBody) => {
                    should(secondClientErr).be.null();
                    should(secondClientBody).not.be.null();
                    done();
                });
            });
        });
    });

    describe("of a subscription change", function () {
        it("should notify user when user with an active private chat logs in", function (done) {
            secondClient.authentication.login(userToAdd.username, userToAdd.password, () => {
                done();
            });
        });
    });

    describe("of a new message", function () {
        let roomId, roomName;

        before(function (done) {
            roomName = "notify-user-" + Date.now();
            secondClient.authentication.login(userToAdd.username, userToAdd.password, () => {
                client.channels.create(roomName, function (err, body) {
                    should(err).be.null();
                    should(body.success).be.true();
                    roomId = body.channel._id;
                    done();
                });
            });
        });

        it("should notify the user when a message for him was sent", function (done) {
            let message = `@${config.user} hello world!`;
            client.notify.user.onNotification(userId, function (err, body) {
                should(err).be.null();
                should(body).not.be.null();
                should(body.fields.args[0].text).be.equal(message);
                done();
            });

            secondClient.chat.postMessage({ roomId, text: message }, function (err, body) {
                should(err).be.null();
                should(body).not.be.null();
            });
        });

        it("should notify the user when a room's status has changed", function (done) {
            let message = "hello world!";

            client.notify.room.onChanged(roomId, function (err, body) {
                should(err).be.null();
                should(body).not.be.null();
                should(body.msg).be.equal("changed");
                should(body.fields.eventName).be.equal(roomId);
                done();
            });

            secondClient.chat.postMessage({ roomId, text: message }, function (err, body) {
                should(err).be.null();
                should(body).not.be.null();
            });
        });
    });
});
