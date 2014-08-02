var when = require('when');
var EventEmitter = require('events').EventEmitter;

module.exports = {
    create: function (name) {
        return new Player(name);
    }
};

var Player = function (name) {
    this.name = name;
};

require('util').inherits(Player, EventEmitter);

Player.prototype.playCard = function (hand) {
    var deferred = when.defer();
    this.on('pick', function (index) {
            deferred.resolve(index);
    });
    return deferred.promise;
};