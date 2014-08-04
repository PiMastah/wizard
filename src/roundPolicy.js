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
