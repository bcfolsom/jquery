function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function getCardImageUrl(card) {
  var cardName;
  if (card.point === 1) {
    cardName = 'ace';
  } else if (card.point === 11) {
    cardName = 'jack';
  } else if (card.point === 12) {
    cardName = 'queen';
  } else if (card.point === 13) {
    cardName = 'king';
  } else {
    cardName = card.point;
  }
  return 'images/' + cardName + '_of_' + card.suit + '.png';
}

function calculatePoints(cards) {
  cards = cards.slice(0);
  cards.sort(function(a, b) {
    return b.point - a.point;
  });
  return cards.reduce(function(sum, card) {
    var point = card.point;
    if (point > 10) {
      point = 10;
    }
    if (point === 1 && sum < 11) {
      point = 11;
    }
    return sum + point;
  }, 0);
}

function newDeck() {
  var cards = [];
  for (var i = 1; i <= 13; i++) {
    cards.push({ point: i, suit: 'spades' });
    cards.push({ point: i, suit: 'diamonds' });
    cards.push({ point: i, suit: 'clubs' });
    cards.push({ point: i, suit: 'hearts' });
  }
  return cards;
}