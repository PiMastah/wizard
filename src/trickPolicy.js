var when = require('when');
var sequence = require('when/sequence');
var EventEmitter = require('events').EventEmitter;

module.exports = {
    create: function (roundState) {
        return new TrickPolicy(roundState);
    }
};

var comparisonPolicy = require('./comparisonPolicy').create();

var TrickPolicy = function (roundState) {
    this.roundState = roundState;
};

TrickPolicy.prototype.run = function () {
    var self = this;
    var deferred = when.defer();
    var currentPlayerIndex = this.roundState.startingPlayerIndex;

    var nextPlayer = function () {
        var hand = self.roundState.hands[currentPlayerIndex];
        var promise = self.roundState.players[currentPlayerIndex].playCard(hand);

        promise.then(
            function () {
                currentPlayerIndex = (currentPlayerIndex + 1) % self.roundState.players.length;
            }
        );

        return promise;
    };

    var tasks = this.roundState.players.map(function () {
        return nextPlayer;
    });

    sequence(tasks).then(function (playedCards) {
        var winnerIndex = comparisonPolicy.compare(playedCards);
        console.log(winnerIndex);
        self.roundState.playerTrickCounts[winnerIndex]++;
        deferred.resolve(winnerIndex);
    });

    return deferred.promise;
};