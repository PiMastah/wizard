module.exports = {
	create: function () {
		return new Dealer();
	}
};

var Dealer = function () {
    return this;
};

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

Dealer.prototype.deal = function (numberOfPlayers, sizeOfHands, deck) {
    var hands = [];
    for (var x = 0; x < sizeOfHands; x++) {
        for (var i = 0; i < numberOfPlayers; i++) {
            var hand = hands[i] || [];
            var card = deck.cards[0];
            deck.cards.splice(0, 1);
            hand.push(card);
            hands[i] = hand;
        }
    }
    return hands;
};