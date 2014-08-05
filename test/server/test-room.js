var buster = require("buster");
var assert = buster.referee.assert;
var expect = buster.expect;
var when = require('when');

buster.spec.expose();

var gameFactory = require('../../src/server/game');
var playerFactory = require('../../src/server/player');
var roomFactory = require('../../src/server/room');

describe("A Room", function () {
    var self = this;
    buster.spec.before(function () {
        self.aPlayer = playerFactory.create('Jim');
        self.anotherPlayer = playerFactory.create('John');
        self.yetAnotherPlayer = playerFactory.create('Jack');
        self.aRoom = roomFactory.create();
    });

    it("allows accounts to join and leave", function () {
        self.aRoom.join(self.aPlayer);
        expect(self.aRoom.players).toContain(self.aPlayer);
        self.aRoom.leave(self.aPlayer);
        expect(self.aRoom.players).not.toContain(self.aPlayer);
    });

    it("send an event when full", function () {
        var spy = this.spy();
        self.aRoom.on('full', spy);

        self.aRoom.join(self.aPlayer);
        self.aRoom.join(self.anotherPlayer);
        self.aRoom.join(self.yetAnotherPlayer);

        expect(spy).toHaveBeenCalled();
    });
});
