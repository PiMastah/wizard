var buster = require("buster");
var assert = buster.referee.assert;
var expect = buster.expect;

buster.spec.expose();

var playerFactory = require('../../src/player');
var gameFactory = require('../../src/game');

describe("Game", function () {
    var self = this;
    buster.spec.before(function () {
        self.players = [playerFactory.create('Foo')];
        self.game = gameFactory.create(self.players);

    });

    it("has a unique id", function () {
        var otherGame = gameFactory.create();

        expect(self.game.id === otherGame.id).toBe(false);

    });

    it("has players", function () {
        expect(self.game.players && self.game.players.length).toBeGreaterThan(-1);
    });
});