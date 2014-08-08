var buster = require("buster");
var expect = buster.expect;

buster.spec.expose();

var accountFactory = require('../../src/server/account');
var lobbyFactory = require('../../src/server/lobby');

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

});