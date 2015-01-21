var buster = require("buster");
var expect = buster.expect;

buster.spec.expose();

var accountFactory = require('../../src/server/account');
var roomFactory = require('../../src/server/room');

describe("An account", function () {
    var self = this;
    buster.spec.before(function () {
        self.anAccount = accountFactory.create('Foo');
        self.aRoom = roomFactory.create();
    });

    it("can join a room", function () {
        self.anAccount.joinRoom(self.aRoom);
        expect(self.anAccount.rooms.some(function (room) {
            return self.aRoom === room;
        })).toBeTrue();
    });

/*    it("can associate a player with a room", function () {

    });*/
});