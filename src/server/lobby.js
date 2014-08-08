var roomFactory = require('./room');

module.exports = {
    create: function () {
        return new Lobby();
    }
};

var Lobby = function () {
    this.accounts = [];
    this.rooms = [];
    this.rooms.push(roomFactory.create());
    return this;
};

Lobby.prototype.join = function (account) {
    this.accounts.push(account);


    return this;
};

Lobby.prototype.leave = function (account) {
    var i = this.accounts.indexOf(account);
    if (-1 < i) {
        this.accounts.splice(i, 1);
    }
    return this;
};

Lobby.prototype.hasOpenRooms = function () {
    return this.rooms.some(function (room) {
        return (room.isFull() === false);
    });
};