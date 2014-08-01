var buster = require("buster");
var assert = buster.referee.assert;
var expect = buster.expect;

buster.spec.expose();

var dealer = require('../../src/dealer').create();
var deckFactory = require('../../src/deck');

describe("Dealer", function () {
	var self = this;
	buster.spec.before(function () {
		self.deck = deckFactory.create();
	});

	it("returns the shuffled deck", function () {
		var oldDeck = this.deck
		var newDeck = dealer.shuffle(this.deck);

		expect(newDeck.length).toBe(oldDeck.length);

		oldDeck.cards.forEach(function (card) {
			expect(newDeck.cards.some(function (newCard) {
				return (card.suit === newCard.suit && card.rank === newCard.rank);
			})).toBe(true);
		});
	});
});