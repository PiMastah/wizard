var buster = require("buster");
var expect = buster.expect;

buster.spec.expose();

var accountFactory = require('../../src/server/account');
var roomFactory = require('../../src/server/room');

describe("A Room", function () {
    var self = this;
    buster.spec.before(function () {
        self.anAccount = accountFactory.create('Jim');
        self.anotherAccount = accountFactory.create('John');
        self.yetAnotherAcount = accountFactory.create('Jack');
        self.aRoom = roomFactory.create();
    });

    it("allows accounts to join and leave", function () {
        self.aRoom.join(self.anAccount);
        expect(self.aRoom.accounts).toContain(self.anAccount);
        self.aRoom.leave(self.anAccount);
        expect(self.aRoom.accounts).not.toContain(self.anAccount);
    });

    it("send an event when full", function () {
        var spy = this.spy();
        self.aRoom.on('full', spy);

        self.aRoom.join(self.anAccount);
        self.aRoom.join(self.anotherAccount);
        self.aRoom.join(self.yetAnotherAcount);

        expect(spy).toHaveBeenCalled();
    });

    it("creates a game with players when full", function () {
        self.aRoom.join(self.anAccount);
        self.aRoom.join(self.anotherAccount);
        self.aRoom.join(self.yetAnotherAcount);

        var expectedPlayers = [
            self.anAccount.players[0],
            self.anotherAccount.players[0],
            self.yetAnotherAcount.players[0]
        ];
        expect(self.aRoom.game.players).toBeArray();
        expect(self.aRoom.game.players.length).toBe(3);
        self.aRoom.game.players.map(function (player) {
            expect(expectedPlayers).toContain(player);
        });
    });

    it("won't let accounts join when full", function () {
        self.aRoom.join(self.anAccount);
        self.aRoom.join(self.anotherAccount);
        self.aRoom.join(self.yetAnotherAcount);

        var excessAccount = accountFactory.create('Jill');
        self.aRoom.join(excessAccount);
        expect(self.aRoom.isFull()).toBeTrue();
        expect(self.aRoom.accounts).not.toContain(excessAccount);
    });
});
