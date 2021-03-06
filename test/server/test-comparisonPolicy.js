var buster = require("buster");
var expect = buster.expect;

buster.spec.expose();

var deckFactory = require('../../src/server/deck');
var cardFactory = require('../../src/server/card');
var comparisonPolicy  = require('../../src/server/comparisonPolicy').create();

describe("Card Comparison:", function () {
	var self = this;
	buster.spec.before(function () {
		self.deck = deckFactory.create();
        self.wizard = cardFactory.create("wizards");
        self.otherSuit = cardFactory.create("hearts", 5);
        self.jester = cardFactory.create("jesters");
    });

    it("wizards beat other suits", function () {
        var wizard = cardFactory.create('wizards')
        ,	otherCard = cardFactory.create('hearts', 9)
        ;

        expect(comparisonPolicy.rank(wizard, otherCard)).toBe(wizard);
        expect(comparisonPolicy.rank(otherCard, wizard)).toBe(wizard);
    });

    it("first wizard wins", function () {
        var wizard = cardFactory.create('wizards')
        ,	otherWizard = cardFactory.create('wizards')
        ;

        expect(comparisonPolicy.rank(wizard, otherWizard)).toBe(wizard);
        expect(comparisonPolicy.rank(otherWizard, wizard)).toBe(otherWizard);
    });

    it("jesters lose to other suits", function () {
        var jester = cardFactory.create('jesters')
        ,	otherCard = cardFactory.create('hearts', 9)
        ;

        expect(comparisonPolicy.rank(jester, otherCard)).toBe(otherCard);
        expect(comparisonPolicy.rank(otherCard, jester)).toBe(otherCard);
    });

    it("first jester beats other jester", function () {
        var jester = cardFactory.create('jesters')
        ,	otherjester = cardFactory.create('jesters')
        ;

        expect(comparisonPolicy.rank(jester, otherjester)).toBe(jester);
        expect(comparisonPolicy.rank(otherjester, jester)).toBe(otherjester);
    });

    it("Trump beats other suits except wizards", function () {
        var trump = cardFactory.create('hearts', 2);
        var otherSuit = cardFactory.create('clubs', 10);

        comparisonPolicy.setTrumpSuit("hearts");
        expect(comparisonPolicy.rank(trump, otherSuit)).toBe(trump);
        expect(comparisonPolicy.rank(otherSuit, trump)).toBe(trump);
    });

    it("followed suit beats other non trump suits", function () {
        var followedSuit = cardFactory.create('hearts', 5);
        var	otherSuit = cardFactory.create('clubs', 8);

        expect(comparisonPolicy.rank(followedSuit, otherSuit)).toBe(followedSuit);
    });

    it("higher card of same suit wins", function () {
        var highCard = cardFactory.create("hearts", 13);
        var lowCard = cardFactory.create("hearts", 5);

        expect(comparisonPolicy.rank(highCard, lowCard)).toBe(highCard);
        expect(comparisonPolicy.rank(lowCard, highCard)).toBe(highCard);
    });

    it("compares at least 3 cards", function () {
        var trick = [self.otherSuit, self.jester, self.wizard];

        expect(comparisonPolicy.compare(trick)).toBe(2);
    });
});