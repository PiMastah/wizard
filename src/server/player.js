var when = require('when');
var uuid = require('node-uuid');
var EventEmitter = require('events').EventEmitter;

module.exports = {
    create: function (name) {
        return new Player(name);
    }
};

var Player = function (name) {
    this.name = name;
    this.id = uuid.v4();

    return this;
};

require('util').inherits(Player, EventEmitter);

Player.prototype.playCard = function (hand) {
    var deferred = when.defer();
    this.once('pick', function (index) {
        deferred.resolve(hand[index]);
    });
    return deferred.promise;
};

Player.prototype.bid = function () {
    var deferred = when.defer();
    this.once('bid', function (bid) {
        deferred.resolve(bid);
    });
    return deferred.promise;
};
