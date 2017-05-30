$(function domReady() {
  var cards1 = [
    { point: 1, suit: 'hearts' },
    { point: 1, suit: 'spades' },
    { point: 1, suit: 'diamonds' },
    { point: 1, suit: 'clubs' },
    { point: 2, suit: 'hearts' },
    { point: 2, suit: 'spades' },
    { point: 2, suit: 'diamonds' },
    { point: 2, suit: 'clubs' },
    { point: 3, suit: 'hearts' },
    { point: 3, suit: 'spades' },
    { point: 3, suit: 'diamonds' },
    { point: 3, suit: 'clubs' },
    { point: 4, suit: 'hearts' },
    { point: 4, suit: 'spades' },
    { point: 4, suit: 'diamonds' },
    { point: 4, suit: 'clubs' },
    { point: 5, suit: 'hearts' },
    { point: 5, suit: 'spades' },
    { point: 5, suit: 'diamonds' },
    { point: 5, suit: 'clubs' },
    { point: 6, suit: 'hearts' },
    { point: 6, suit: 'spades' },
    { point: 6, suit: 'diamonds' },
    { point: 6, suit: 'clubs' },
    { point: 7, suit: 'hearts' },
    { point: 7, suit: 'spades' },
    { point: 7, suit: 'diamonds' },
    { point: 7, suit: 'clubs' },
    { point: 8, suit: 'hearts' },
    { point: 8, suit: 'spades' },
    { point: 8, suit: 'diamonds' },
    { point: 8, suit: 'clubs' },
    { point: 9, suit: 'hearts' },
    { point: 9, suit: 'spades' },
    { point: 9, suit: 'diamonds' },
    { point: 9, suit: 'clubs' },
    { point: 10, suit: 'hearts' },
    { point: 10, suit: 'spades' },
    { point: 10, suit: 'diamonds' },
    { point: 10, suit: 'clubs' },
    { point: 11, suit: 'hearts' },
    { point: 11, suit: 'spades' },
    { point: 11, suit: 'diamonds' },
    { point: 11, suit: 'clubs' },
    { point: 12, suit: 'hearts' },
    { point: 12, suit: 'spades' },
    { point: 12, suit: 'diamonds' },
    { point: 12, suit: 'clubs' },
    { point: 13, suit: 'hearts' },
    { point: 13, suit: 'spades' },
    { point: 13, suit: 'diamonds' },
    { point: 13, suit: 'clubs' },
  ];
  var cards2 = cards1.slice();
  var deck = [];
  var dealerHand = [];
  var playerHand = [];
  var hitCount = 2;
  var standCount = 2;
  function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  function shuffle(array){
    for(x=0; x<52; x++){
      deck.push(array.splice(random(0,array.length),1));
    }
  }
  function getImage(object){
    var pointConversion = {
      1:'ace',
      11:'jack',
      12:'queen',
      13:'king'
    };
    var point;
    if(object.point in pointConversion){
      point = pointConversion[object.point];
    }
    else{
      point = object.point;
    }
    return("/images/" + point + "_of_" + object.suit + ".png");
  }
  function calculatePoints(array){
    var points = 0;
    for(x=0; x<array.length; x++){
      if(array[x][0].point == 1){
        if((21-points)<11){
          points += 1;
        } else {
          points += 11;
        }
      }else if(array[x][0].point > 10){
        points += 10;
      }else{
        points += array[x][0].point;
      }
    }
    return points;
  }
  function determineWinner(){
    if(calculatePoints(dealerHand) > calculatePoints(playerHand)){
      $('#messages').text('You lose!');
    }else if(calculatePoints(playerHand) > calculatePoints(dealerHand)){
      $('#messages').text('You win!');
    }else{
      $('#messages').text("It's a draw!");
    }
  }
  function restart(){
    cards2 = cards1.slice();
    deck = [];
    shuffle(cards2);
    hitCount = 2;
    standCount = 2;
    dealerHand = [];
    playerHand = [];
    $('#dealer-hand').html('');
    $('#player-hand').html('');
    $('#dealer-points').text('');
    $('#player-points').text('');
    $('#messages').text('');
    $('#restart-button').hide();
    $('#deal-button').show();
    $('#hit-button').show();
    $('#stand-button').show();
  }
  $('#restart-button').hide();
  shuffle(cards2);
  $('#deal-button').click(function(){
    dealerHand = [deck.pop(), deck.pop()];
    playerHand = [deck.pop(), deck.pop()];
    $('#dealer-hand').append('<img src="' + getImage(dealerHand[0][0]) + '"/><img src="' + getImage(dealerHand[1][0]) + '"/>');
    $('#player-hand').append('<img src="' + getImage(playerHand[0][0]) + '"/><img src="' + getImage(playerHand[1][0]) + '"/>');
    $('#dealer-points').text(calculatePoints(dealerHand));
    $('#player-points').text(calculatePoints(playerHand));
    $('#deal-button').hide();
  });
  $('#hit-button').click(function(){
    playerHand.push(deck.pop());
    $('#player-hand').append('<img src="' + getImage(playerHand[hitCount][0]) + '"/>');
    $('#player-points').text(calculatePoints(playerHand));
    if(calculatePoints(playerHand)>21){
      $('#messages').text("You've busted! Dealer wins.");
      $('#hit-button').hide();
      $('#stand-button').hide();
      $('#restart-button').show();
    }
    hitCount += 1;
  });
  $('#stand-button').click(function(){
    $('#hit-button').hide();
    while(calculatePoints(dealerHand)<17){
      dealerHand.push(deck.pop());
      $('#dealer-hand').append('<img src="' + getImage(dealerHand[standCount][0]) + '"/>');
      $('#dealer-points').text(calculatePoints(dealerHand));
      standCount += 1;
    }
    if(calculatePoints(dealerHand)>21){
        $('#messages').text("Dealer has busted! You win!");
    } else {
      determineWinner();
    }
    $('#stand-button').hide();
    $('#restart-button').show();
  });
  $('#restart-button').click(function(){
    restart();
  });
});