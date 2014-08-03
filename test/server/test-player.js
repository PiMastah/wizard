var buster = require("buster");
var assert = buster.referee.assert;
var expect = buster.expect;

buster.spec.expose();

var playerFactory = require('../../src/player');
var cardFactory = require('../../src/card');

describe("Player", function () {
    var self = this;
    buster.spec.before(function () {
        this.timeout = 1000;
        self.name = 'Foo';
        self.player = playerFactory.create(self.name);
    });

    it("has a name", function () {
        expect(self.player.name).toBe(self.name);
    });

    it("has a unique id", function () {
        newPlayer = playerFactory.create();
        expect(newPlayer.id).not.toEqual(self.player.id);
    });

    it("can bid", function (done) {
        var hand = [cardFactory.create('wizards')];

        self.player.bid(hand).then(function (bid) {
            expect(bid).toBeLessThan(hand.length+1);
            done()
        });
        setTimeout(function () {
            self.player.emit('bid', 1);
        }, 100);
    });

    it("can choose a card to play", function (done) {
        var hand = [cardFactory.create('wizards')];

        self.player.playCard(hand).then(function (index) {
            expect(hand[index]).toBeDefined();
            done();
        });
        setTimeout(function () {
            self.player.emit('pick', 0);
        }, 100);
    });
});