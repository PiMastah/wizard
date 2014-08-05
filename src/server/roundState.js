module.exports = {
    create: function (roundNumber, players) {
        return new RoundState(roundNumber, players);
    }
};

var RoundState = function (roundNumber, players) {
    this.roundNumber = roundNumber;
    this.players = players;
    this.hands = [];
    this.trumpSuit = '';
    this.playerTrickCounts = players.map(function () {
        return 0;
    });
    this.startingPlayerIndex = 0;
    this.bids = [];

    return this;
};

