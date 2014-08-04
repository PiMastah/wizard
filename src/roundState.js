module.exports = {
    create: function (roundNumber, players, hands, bids, trumpSuit) {
        return new RoundState(roundNumber, players, hands, bids, trumpSuit);
    }
};

var RoundState = function (roundNumber, players, hands, trumpSuit) {
    this.roundNumber = roundNumber;
    this.players = players;
    this.hands = hands;
    this.trumpSuit = trumpSuit || '';
    this.playerTrickCounts = players.map(function () {
        return 0;
    });
    this.startingPlayerIndex = 0;
    this.bids = [];

    return this;
};

