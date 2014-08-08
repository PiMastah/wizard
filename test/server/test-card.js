var buster = require("buster");
var expect = buster.expect;

var cardFactory = require('../../src/server/card');

buster.spec.expose();

describe("A card", function () {
	it("has a suit", function () {
		var suit = 'hearts'
		,	card = cardFactory.create(suit)
		;

		expect(card.suit).toBe(suit);
	});

	it("has a rank", function () {
		var rank = 1
		,	suit = 'hearts'
		,	card = cardFactory.create(suit, rank)
		;

		expect(card.rank).toBe(rank);
	});
});