module.exports = {
    create: function (name) {
        return new Account(name);
    }
};

var Account = function (name) {
    this.name = name;
    this.rooms = [];
    this.games = {};
    this.lobby = {};
};

Account.prototype.joinRoom = function (room) {
    this.rooms.push(room);
    room.join(this);
};

Account.prototype.setPlayerForRoom = function (room, player) {
    var index = this.rooms.indexOf(room);
    if (-1 === index) {
        return false;
    }

    this.games[room.id] = player;
    this.rooms.splice(index, 1);

    return this;
};