var buster = require("buster");
var expect = buster.expect;

buster.spec.expose();

var accountFactory = require('../../src/server/account');
var lobbyFactory = require('../../src/server/lobby');
var roomFactory = require('../../src/server/room');

describe("A lobby", function () {
    var self = this;
    buster.spec.before(function () {
        self.anAccount = accountFactory.create('Jim');
        self.aLobby = lobbyFactory.create();
    });

    it("allows accounts to join and leave", function () {
        self.aLobby.join(self.anAccount);
        expect(self.aLobby.accounts).toContain(self.anAccount);
        self.aLobby.leave(self.anAccount);
        expect(self.aLobby.accounts).not.toContain(self.anAccount);
    });

    it("has at least one room that is not full", function () {
        expect(self.aLobby.rooms).toBeArray();
        expect(self.aLobby.rooms.length).toBeGreaterThan(0);
        expect(self.aLobby.hasOpenRooms()).toBeTrue();
    });

    it("can open a new room", function () {
        var roomsBefore = self.aLobby.rooms.length;
        self.aLobby.openRoom();
        expect(roomsBefore).toEqual(self.aLobby.rooms.length - 1);
    });

    it("can associate a room with its id", function () {
        var expectedRoom = self.aLobby.rooms[0];
        var room = self.aLobby.getRoomById(expectedRoom.id);

        expect(room).toBe(expectedRoom);
    })
});
