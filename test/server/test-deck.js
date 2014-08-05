var buster = require("buster");
var assert = buster.referee.assert;
var expect = buster.expect;

buster.spec.expose();

var deckFactory = require('../../src/server/deck');

var suits = ['clubs', 'diamonds', 'hearts', 'spades']
,	ranks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
;

describe("A deck", function () {
	var self = this;
	buster.spec.before(function () {
		self.deck = deckFactory.create();
	});

	it("contains 60 cards", function () {
		expect(self.deck.cards.length).toBe(60);
	});

	it("contains 13 cards of each suit", function () {
		deckFactory.suits.forEach(function (suit) {
			var cardCount = 0;
			self.deck.cards.forEach(function (card) {
				if (card.suit === suit) {
					cardCount++;
				}
			});

			expect(cardCount).toBe(13);
		});
	});

	it("contains 4 cards of each rank 1 through 13", function () {
		deckFactory.ranks.forEach(function (rank) {
			var cardCount = 0;
			self.deck.cards.forEach(function (card) {
				if (card.rank === rank) {
					cardCount++;
				}
			});

			expect(cardCount).toBe(4);
		});
	});

	it("contains 4 wizards", function () {
		var cardCount = 0;

		self.deck.cards.forEach(function (card) {
			if (card.suit === 'wizards') {
				cardCount++;
			}
		});

		expect(cardCount).toBe(4);
	});

	it("contains 4 jesters", function () {
		var cardCount = 0;

		self.deck.cards.forEach(function (card) {
			if (card.suit === 'jesters') {
				cardCount++;
			}
		});

		expect(cardCount).toBe(4);
	});
});