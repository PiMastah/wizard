var when = require('when');
var sequence = require('when/sequence');
var uuid = require('node-uuid');
var EventEmitter = require('events').EventEmitter;

module.exports = {
    create: function (players) {
        return new Room(players);
    }
};

var gameFactory = require('./game');

var Room = function () {
    this.players = [];
    this.capacity = 3;
    this.isFull = false;
    return this;
};

require('util').inherits(Room, EventEmitter);

Room.prototype.join = function (player) {
    if (!this.isFull) {
        this.players.push(player);
        if (this.players.length === this.capacity) {
            this.emit('full');
            this.startGame();
            this.isFull = true;
        }
    }
    return this;
};

Room.prototype.leave = function (player) {
    var index = this.players.indexOf(player);
    if (-1 < index) {
        this.players.splice(index, 1);
    }
    return this;
};

Room.prototype.startGame = function () {
    this.game = gameFactory.create(this.players);
};