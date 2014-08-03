module.exports = {
    create: function (players, hands, bids, trumpSuit) {
        return new RoundState(players, hands, bids, trumpSuit);
    }
};

var RoundState = function (players, hands, bids, trumpSuit) {
    this.players = players;
    this.hands = hands;
    this.bids = bids;
    this.trumpSuit = trumpSuit || '';
    this.playerTrickCounts = players.map(function () {
        return 0;
    });
    this.startingPlayerIndex = 0;

    return this;
};

RoundState.prototype.getPlayer = function (index) {
    return this.players[index];
};

