var buster = require("buster");
var assert = buster.referee.assert;
var expect = buster.expect;

buster.spec.expose();

var playerFactory = require('../../src/server/player');
var gameFactory = require('../../src/server/game');

describe("A Game", function () {
    var self = this;
    buster.spec.before(function () {
        self.players = [playerFactory.create('Foo')];
        self.game = gameFactory.create(self.players);

    });

    it("has a unique id", function () {
        var otherGame = gameFactory.create([playerFactory.create('Bar')]);
        expect(otherGame.id).not.toEqual(self.game.id);

    });

    it("has players", function () {
        expect(self.game.players).toBeArray();
    });

    it("starts", function () {
        expect(self.game.start()).toBeDefined();
    });
});