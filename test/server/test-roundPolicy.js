var buster = require("buster");
var expect = buster.expect;

buster.spec.expose();

var roundPolicyFactory = require('../../src/server/roundPolicy');
var playerFactory = require('../../src/server/player');
var cardFactory = require('../../src/server/card');

describe("The round policy", function () {
    var self = this;
    buster.spec.before(function () {
        self.foo = playerFactory.create('Foo');
        self.bar = playerFactory.create('Bar');
        self.baz = playerFactory.create('Baz');
        self.players = [self.foo, self.bar, self.baz];
        self.roundPolicy = roundPolicyFactory.create(self.players);
        self.roundState = self.roundPolicy.roundState;
    });

    it("initializes a round", function () {
        expect(self.roundState).toBeDefined();
        expect(self.roundState.roundNumber).toBe(1);
        expect(self.roundState.players).toBe(self.players);
    });

    it("deals hands and defines a trump suit", function () {
        self.roundPolicy.initHands();
        expect(self.roundState.hands).toBeArray();
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

    it("calculates points for players", function () {
        self.roundState.playerTrickCounts = [1, 0, 0];
        self.roundState.bids = [1, 1, 0];
        var expectedPoints = [30, -10, 20];

        var points = self.roundPolicy.calculatePoints();
        expect(points).toBeArrayLike(expectedPoints);
    });

    it("runs a round", function (done) {
        self.roundState.hands = [
            [cardFactory.create('wizards')],
            [cardFactory.create('jesters')],
            [cardFactory.create('hearts', 13)]
        ];
        var expectedPoints = [30, -10, 20];
        self.roundState.bids = [1, 1, 0];

        self.roundPolicy.run().then(function (points) {
            expect(points).toBeArray();
            expect(points).toBeArrayLike(expectedPoints);
            expect(self.roundState.roundNumber).toBe(2);
            done();
        });

        for (var i = 0; i < this.roundState.roundNumber; i++) {
            self.roundState.players.map(function (player, index) {
                setTimeout(function() {
                    player.emit('pick', 0);
                }, index * 10);
            });
        }
    });
});