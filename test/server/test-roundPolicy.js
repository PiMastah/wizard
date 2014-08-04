var buster = require("buster");
var assert = buster.referee.assert;
var expect = buster.expect;

buster.spec.expose();

var roundPolicyFactory = require('../../src/roundPolicy');
var playerFactory = require('../../src/player');

describe("The round policy", function () {
    var self = this;
    buster.spec.before(function () {
        self.foo = playerFactory.create('Foo');
        self.bar = playerFactory.create('Bar');
        self.baz = playerFactory.create('Baz');
        self.players = [self.foo, self.bar, self.baz];
        self.roundNumber = 1;
        self.roundPolicy = roundPolicyFactory.create(self.players, self.roundNumber);
        self.roundState = self.roundPolicy.roundState;
    });
    it("initialize a round with round number", function () {
        expect(self.roundState).toBeDefined();
        expect(self.roundState.roundNumber).toBe(self.roundNumber);
        expect(self.roundState.players).toBe(self.players);
        expect(self.roundState.hands).toBeDefined();
        expect(self.roundState.trumpSuit).toBeDefined();
    });

    it("starts a bidding round", function (done) {
        var expectedBids = [1, 1, 1];
        self.roundPolicy.runBidding().then(function (bids) {
            expect(bids).toBeArrayLike(expectedBids);
            done();
        });

        self.players.forEach(function (player, index) {
            setTimeout(function () {
                player.emit('bid', 1);
            }, index * 20);
        });
    });
});