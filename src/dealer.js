module.exports = {
	create: function () {
		return new Dealer();
	}
};

var Dealer = function () {};

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

Dealer.prototype.shuffle = function(deck) {
	if (deck.cards && deck.cards.length) {
		deck.cards.forEach(function (card, index, cards) {
			var remaining = cards.length - index
			,	moveFromIndex = getRandomInt(index, index + remaining - 1)
			,	temp = cards[index]
			;

			cards[index] = cards[moveFromIndex];
			cards[moveFromIndex] = temp;
		});
	}

	return deck;
};