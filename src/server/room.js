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
    return this;
};

require('util').inherits(Room, EventEmitter);

Room.prototype.join = function (player) {
    this.players.push(player);
    if (this.players.length === this.capacity) {
        this.emit('full');
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