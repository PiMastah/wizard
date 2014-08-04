var cardFactory = require('./card');
var suits = ['clubs', 'diamonds', 'hearts', 'spades']
,	ranks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
;

module.exports = {
	create: function () {
		return new Deck();
	},
	suits: suits,
	ranks: ranks
};

var Deck = function () {
	var self = this;
	this.cards = [];
	suits.forEach(function (suit) {
		ranks.forEach(function (rank) {
			self.cards.push(cardFactory.create(suit, rank));
		});
	});

	for (var i = 0; i < 4; i++) {
		this.cards.push(cardFactory.create('wizards'));
	}

	for (i = 0; i < 4; i++) {
		this.cards.push(cardFactory.create('jesters'));
	}
};