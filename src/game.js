var when = require('when');
var uuid = require('node-uuid');
var EventEmitter = require('events').EventEmitter;

module.exports = {
    create: function (players) {
        return new Game(players);
    }
};

var Game = function (players) {
    this.id = uuid.v4();
    this.players = players;

    return this;
};