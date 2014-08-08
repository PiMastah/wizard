var when = require('when');
var sequence = require('when/sequence');
var uuid = require('node-uuid');
var EventEmitter = require('events').EventEmitter;

module.exports = {
    create: function () {
        return new Room();
    }
};

var gameFactory = require('./game');
var playerFactory = require('./player');

var Room = function () {
    this.accounts = [];
    this.capacity = 3;
    this.isFull = false;
    return this;
};

require('util').inherits(Room, EventEmitter);

Room.prototype.join = function (account) {
    if (!this.isFull) {
        this.accounts.push(account);
        if (this.accounts.length === this.capacity) {
            this.emit('full');
            this.startGame();
            this.isFull = true;
        }
    }
    return this;
};

Room.prototype.leave = function (account) {
    var index = this.accounts.indexOf(account);
    if (-1 < index) {
        this.accounts.splice(index, 1);
    }
    return this;
};

Room.prototype.startGame = function () {
    var players = [];
    this.accounts.map(function (account) {
        var player = playerFactory.create(account.name);
        account.players.push(player);
        players.push(player);
    });

    this.game = gameFactory.create(players);
};