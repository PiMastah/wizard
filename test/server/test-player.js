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
        expect(this.player.name).toBe(this.name);
    });

    it("can choose a card to play", function (done) {
        var hand = [cardFactory.create('wizards')];
        var self = this;

        this.player.playCard(hand).then(function (index) {
            expect(hand[index]).toBeDefined();
            done();
        });
        setTimeout(function () {
            self.player.emit('pick', 0);
        }, 100);
    });
});