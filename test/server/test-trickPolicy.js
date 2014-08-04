var buster = require("buster");
var assert = buster.referee.assert;
var expect = buster.expect;

buster.spec.expose();

var trickPolicy = require('../../src/trickPolicy');
var roundState = require('../../src/roundState');
var playerFactory = require('../../src/player');
var cardFactory = require('../../src/card');

describe("The trick policy", function () {
    var self = this;
    buster.spec.before(function () {
        self.someCard = cardFactory.create("hearts", 7);
        self.someHigherCard = cardFactory.create("hearts", 12);
        self.someLowerCard = cardFactory.create("hearts", 2);
        self.someOtherCard = cardFactory.create("clubs", 7);
        self.aWizard = cardFactory.create("wizards");
        self.aJester = cardFactory.create("jesters");

        self.players = [
            playerFactory.create('Alice'),
            playerFactory.create('Bob'),
            playerFactory.create('Carol')
        ];

        self.hands = [
            [self.someCard],
            [self.someHigherCard],
            [self.someOtherCard]
        ];

        self.bids = [
            1,
            0,
            0
        ];

        self.roundState = roundState.create(1, self.players, self.hands, self.bids, '');
        self.trick = trickPolicy.create(self.roundState);
    });

    it("can do the trick", function (done) {
        var expectedWinner = 1;

        self.trick.run().then(function (actualWinner) {
            expect(expectedWinner).toBe(actualWinner);
            done();
        });

        self.players.forEach(function (player, index) {
            setTimeout(function () {
                player.emit('pick', 0);
            }, index * 20);
        });
    });
});