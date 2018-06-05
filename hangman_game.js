//Global variables

var password2 = '';
var password = '';
var alphabet = "AĄBCĆDEĘFGHIJKLŁMNŃOÓPRSŚTUWYZŻŹ";
var letters = alphabet.split('');
var counter = 2;
var proverbs = [
  "Adwokat niech głowę a koń niech ma nogi",
  "Apetyt rośnie w miarę jedzenia",
  "Biednemu zawsze wiatr w oczy",
  "Co cię nie zabije to cię wzmocni",
  "Czego nie można zmienić to trzeba polubić",
  "Dla chcącego nic trudnego",
  "Gorzkie lekarstwo słodko leczy",
  "Jak kamień w wodę",
  "Każdy jest kowalem swego losu",
  "Mądrej głowy włos się nie trzyma"
];

//Functions
function displayingPassword(proverbs) {
  var finder = Math.floor(Math.random(0,1)*10);
  password = proverbs[finder].toUpperCase();

  for (i = 0; i < password.length; i++) {
    if(password.charAt(i) == " ") password2 = password2 + " "
    else password2 = password2 + "-"
  }
  $('<p id="password2">'+password2+'</p>').appendTo('#password');

}

function letterBoard(letters) {
  for (i = 0; i < letters.length; i++) {
    if((i+1)%8) $('<div class="letter">'+letters[i]+'</div>').appendTo('#board');
    else {
      $('<div class="letter">'+letters[i]+'</div>').appendTo('#board');
      $('</br>').appendTo('#board');
    }
  }
}

function restartGame() {

  $('#board').html("");
  $('#password2').remove();
  password2 = '';
  password = '';
  counter = 2;
  $('#picture_of_hangman').attr("src", "gify/g1.gif");

  displayingPassword(proverbs);
  letterBoard(letters);

  var letter = $('.letter');
  letter.click(function() {
    checkingPassword(this);
  })
}

function checkingPassword(clickedLetter) {
  var checker = false;

  for (i = 0; i < password.length; i++) {
    if($(clickedLetter).text() == password.charAt(i)){
      let replacedLetter = $('#password2').text();
      replacedLetter = replacedLetter.replaceAt(i, $(clickedLetter).text());
      $('#password2').text(replacedLetter).off();
      checker = true;
      if(password == replacedLetter) {
        document.getElementById('board').innerHTML = "<span class='end_game'>Congratulations, you won, the secret password was: </br>"+'"'+password+'"'+"</span></br></br><span class='reset end_game'>Do you want to <button class='reset_button'>play again?</button></span>";
        var resetButton = $('.reset_button');
        resetButton.click(restartGame);
      }
    }
  }

  if(checker) $(clickedLetter).addClass('unactive').removeClass('letter');
  else {
    $(clickedLetter).addClass('unactive_wrong').removeClass('letter').off();
    $('#picture_of_hangman').attr("src", "gify/g"+counter+".gif");
    counter++;
  }

  if(counter >= 9){
    $('#picture_of_hangman').attr("src", "gify/g"+counter+".gif");
    document.getElementById('board').innerHTML = "<span class='end_game'>You lose :( the secret password was: </br>"+'"'+password+'"'+"</span></br></br><span class='reset end_game'>Do you want to <button class='reset_button'>play again?</button></span>"
    var resetButton = $('.reset_button');
    resetButton.click(restartGame);
  }

}

//Methods
String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

//Events
window.onload = function(){
  displayingPassword(proverbs);
  letterBoard(letters)

  var letter = $('.letter');
  letter.click(function() {
    checkingPassword(this);
  })

}
