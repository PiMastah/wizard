var when = require('when');
var sequence = require('when/sequence');
var EventEmitter = require('events').EventEmitter;
var dealer = require('./dealer').create();
var deck = require('./deck');
var roundStateFactory = require('./roundState');
var trickPolicyFactory = require('./trickPolicy');

module.exports = {
    create: function (players) {
        return new RoundPolicy(players);
    }
};

var RoundPolicy = function (players) {
    this.roundState = roundStateFactory.create(1, players);
    return this;
};

RoundPolicy.prototype.runBidding = function () {
    var self = this;
    var currentPlayerIndex = 0;
    var deferred = when.defer();
    var bids = [];

    var nextPlayer = function () {
        var hand = self.roundState.hands[currentPlayerIndex];

        var promise = self.roundState.players[currentPlayerIndex].bid(hand);

        promise.then(function (bid) {
            currentPlayerIndex++;
            bids.push(bid);
        });
        return promise;
    };

    var tasks = this.roundState.players.map(function () {
        return nextPlayer;
    });
    sequence(tasks).then(function () {
        self.roundState.bids = bids;
        deferred.resolve(bids);
    });

    return deferred.promise;
};

RoundPolicy.prototype.calculatePoints = function () {
    var self = this;
    var points = this.roundState.bids.map(function (bid, index) {
        var tricksTaken = self.roundState.playerTrickCounts[index];
        if (bid === tricksTaken) {
            return ((bid*10) + 20);
        } else {
            return (-(Math.abs(bid-tricksTaken) * 10));
        }
    });
    return points;
};

RoundPolicy.prototype.initHands = function () {
    var shuffledDeck = dealer.shuffle(deck.create());
    this.roundState.hands = dealer.deal(this.roundState.players.length, this.roundState.roundNumber, shuffledDeck);
    this.roundState.trumpSuit = shuffledDeck.cards[0].suit;
};

RoundPolicy.prototype.run = function () {
    var self = this;
    var deferred = when.defer();
    var trickPolicy = trickPolicyFactory.create(this.roundState);

    var runTrick = function () {
        var promise = trickPolicy.run();
        promise.then(function (winnerIndex) {
            self.roundState.playerTrickCounts[winnerIndex]++;
        });
        return promise
    };

    var tasks = [];
    for (var i = 0; i < this.roundState.roundNumber; i++) {
        tasks.push(runTrick);
    }

    sequence(tasks).then(function () {
        var points = self.calculatePoints();
        self.roundState.roundNumber++;
        deferred.resolve(points);
    });

    return deferred.promise;
};