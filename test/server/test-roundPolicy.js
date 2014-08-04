var buster = require("buster");
var assert = buster.referee.assert;
var expect = buster.expect;

buster.spec.expose();

var roundPolicyFactory = require('../../src/roundPolicy');
var roundStateFactory = require('../../src/roundState');
var playerFactory = require('../../src/player');

describe("The round policy", function () {
    var self = this;
    buster.spec.before(function () {

    });
    it("initialize a round with round number", function () {
        var foo = playerFactory.create('Foo');
        var bar = playerFactory.create('Bar');
        var baz = playerFactory.create('Baz');
        var players = [foo, bar, baz];
        var roundNumber = 1;
        var roundPolicy = roundPolicyFactory.create(players, roundNumber);
        var roundState = roundPolicy.roundState;
        
        expect(roundState).toBeDefined();
        expect(roundState.roundNumber).toBe(roundNumber);
        expect(roundState.players).toBe(players);
        expect(roundState.hands).toBeDefined();
        expect(roundState.trumpSuit).toBeDefined();
    });
});