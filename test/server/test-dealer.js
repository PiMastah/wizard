var buster = require("buster");
var assert = buster.referee.assert;
var expect = buster.expect;

buster.spec.expose();

var dealer = require('../../src/server/dealer').create();
var deckFactory = require('../../src/server/deck');

describe("A Dealer", function () {
	var self = this;
	buster.spec.before(function () {
		self.deck = deckFactory.create();
	});

	it("returns the shuffled deck", function () {
		var oldDeck = this.deck;
		var newDeck = dealer.shuffle(this.deck);

		expect(newDeck.length).toBe(oldDeck.length);

		oldDeck.cards.forEach(function (card) {
			expect(newDeck.cards.some(function (newCard) {
				return (card.suit === newCard.suit && card.rank === newCard.rank);
			})).toBeTrue();
		});
	});

    it("deals Hands to players", function () {
        var deck = deckFactory.create();
        var numberOfPlayers = 5;
        var sizeOfHands = 2;
        var hands = dealer.deal(numberOfPlayers, sizeOfHands, deck);

        expect(hands).toBeArray();
        expect(hands.length).toBe(numberOfPlayers);
        var dealtCards = [];
        hands.map(function (hand) {
            hand.map(function (card) {
                expect(dealtCards.indexOf(card)).toBe(-1);
                dealtCards.push(card);
            });
        });

    });
});