var when = require('when');
var sequence = require('when/sequence');
var EventEmitter = require('events').EventEmitter;
var dealer = require('./dealer').create();
var deck = require('./deck');
var roundStateFactory = require('./roundState');

module.exports = {
    create: function (players, roundNumber) {
        return new RoundPolicy(players, roundNumber);
    }
};

var RoundPolicy = function (players, roundNumber) {
    var shuffledDeck = dealer.shuffle(deck.create());
    var hands = dealer.deal(players.length, roundNumber, shuffledDeck);
    var trumpCard = shuffledDeck.cards[0];
    this.roundState = roundStateFactory.create(roundNumber, players, hands, trumpCard.suit);

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
