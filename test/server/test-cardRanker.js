var buster = require("buster");
var assert = buster.referee.assert;
var expect = buster.expect;

buster.spec.expose();

var deckFactory = require('../../src/deck');
var cardFactory = require('../../src/card');
var cardRanker  = require('../../src/cardRanker').create();

describe("Card comparison:", function () {
	var self = this;
	buster.spec.before(function () {
		self.deck = deckFactory.create();
	});

	describe("-Suits-", function () {
		it("wizards beat other suits", function () {
			var wizard = cardFactory.create('wizards')
			,	otherCard = cardFactory.create('hearts', 9)
			;

			expect(cardRanker.compare(wizard, otherCard)).toBe(wizard);
			expect(cardRanker.compare(otherCard, wizard)).toBe(wizard);
		});

		it("first wizard wins", function () {
			var wizard = cardFactory.create('wizards')
			,	otherWizard = cardFactory.create('wizards')
			;

			expect(cardRanker.compare(wizard, otherWizard)).toBe(wizard);
			expect(cardRanker.compare(otherWizard, wizard)).toBe(otherWizard);
		});

		it("jesters lose to other suits", function () {
			var jester = cardFactory.create('jesters')
			,	otherCard = cardFactory.create('hearts', 9)
			;

			expect(cardRanker.compare(jester, otherCard)).toBe(otherCard);
			expect(cardRanker.compare(otherCard, jester)).toBe(otherCard);
		});

		it("first jester beats other jester", function () {
			var jester = cardFactory.create('jesters')
			,	otherjester = cardFactory.create('jesters')
			;

			expect(cardRanker.compare(jester, otherjester)).toBe(jester);
			expect(cardRanker.compare(otherjester, jester)).toBe(otherjester);
		});
	});
});