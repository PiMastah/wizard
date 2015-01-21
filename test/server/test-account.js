var buster = require("buster");
var expect = buster.expect;

buster.spec.expose();

var accountFactory = require('../../src/server/account');
var roomFactory = require('../../src/server/room');
var playerFactory = require('../../src/server/player');

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

        expect(self.aRoom.accounts.indexOf(self.anAccount)).toBeGreaterThan(-1);
    });

    it("can associate a player with a room", function () {
        var player = playerFactory.create('Foo');
        self.anAccount.joinRoom(self.aRoom);
        self.anAccount.setPlayerForRoom(self.aRoom, player);

        expect(self.anAccount.rooms.some(function (room) {
            return self.aRoom === room;
        })).toBeFalse();
        expect(self.anAccount.games[self.aRoom.id]).toBe(player);
    });
});