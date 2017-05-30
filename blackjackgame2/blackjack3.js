var suits = ['spades', 'diamonds', 'clubs', 'hearts'];
// var cardvals = ['Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King']
var deck = [];

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
};

for (var i=0; i < suits.length; i++) {
  for (var j=1; j < 14; j++) {
    deck.push({ point: j, suit: suits[i] });
  }
}
// for loop over suits
  // for loop over card numbers
    // deck.push({ point: 1, suit: 'spades' });

deck = shuffleArray(deck);

$(document).ready(function () {
  $('#deal-button').click(function () {
    $('#dealer-hand').append('<img src="images/king_of_diamonds.png">' + '<img src="images/3_of_diamonds.png">')
    $('#player-hand').append('<img src="images/ace_of_spades.png">' + '<img src="images/5_of_clubs.png">')
  })
});
$(document).ready(function () {
  $('#hit-button').click(function () {
    $('#player-hand').append('<img src="images/queen_of_hearts.png">')
  })
});