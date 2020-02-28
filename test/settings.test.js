/**
 * Created by qeesung on 2017/4/26.
 */

const RocketChatClient = require("../lib/rocketChat").RocketChatClient;
const co = require("co");
const chai = require("chai");
const expect = chai.expect;

const config = require("./config.json");

describe("setttings", () => {
    let rocketChatClient = null;
    const id = "Livechat_enabled";
    before(function (done) {
        rocketChatClient = new RocketChatClient("http",
            config.host,
            config.port,
            config.user,
            config.password,
            done);
    });

    it(`get ${id} configurations values should be false or true`, () => {
        return co(function *() {
            let livechatEnabledValue = yield rocketChatClient.settings.get(id);
            expect(livechatEnabledValue.value).to.be.oneOf([true, false]);
        });
    });

    it(`update ${id} the configurations to be true`, () => {
        return co(function *() {
            let updatedResult = yield rocketChatClient.settings.update(id, true);
            expect(updatedResult.success).to.be.equal(true);
        });
    });
});
