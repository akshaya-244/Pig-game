/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores,roundScore, activePlayer, dice, gamePlaying;

init();
//First decide DICE
//dice=Math.ceil(Math.random() * 6);
//console.log(dice);//will give answer in console
//to get answer in DOM we use document. and to select an object in the DOM there are many methods querySelector is one of them 
// This command is selecting the text in the current score 43 using its id score-0 and to write any id we use the # symbol in quotes
//now to change the content in the score that is to change 43 we use textContent method
//document.querySelector('#current-'+ activePlayer).textContent= dice;// called a setter coz it sets a value
//if we want to write the current score text in italics look dowm
//document.querySelector('#current-'+activePlayer).innerHTML= '<em>' + dice + '</em>';
//document.querySelector('#current-'+activePlayer).textContent= '<em>' + dice + '</em>'; // this will print <em>5</em>
//querySelector can also be used to read or store a text. EG:
//var x =document.querySelector('#score-0').textContent;// called a getter coz it gets a value
//console.log(x);


//now i want to remove the default dice image for that too we use querySelector
//when u go to the style.css file there is display and since  <img src="dice-5.png" alt="Dice" class="dice"> here class is dice we use the . operator
/*
document.querySelector('.dice').style.display='none';


// Now if i want to set the current and the round scores to 0 we can use querySelector but there is another method which is getElementById which works only for ids and is faster than qyerySelector
//here we wont use the # symbol bcox this func only takes IDS
document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';

*/


//to selct a button and to give a function to that button
/*this is the way to do it if you want to use the func more than once
function btn()
{
    //Do something here
}
btn();
document.querySelector('btn-roll').addEventListener('click', btn);// here we write the func without () so it is called a call back func. a func which is not called by us but by some other func
*/ 
//if yu want to use the func only once u can declare it there itself
//.btn-roll bcoz its a class

    
    document.querySelector('.btn-roll').addEventListener('click', function(){
        if(gamePlaying)
    {
        //1. Random no
        dice=Math.ceil(Math.random() * 6);
        
        //2. Display the result
        var diceDOM=document.querySelector('.dice');
        diceDOM.style.display= 'block';
        // <img src="dice-5.png" alt="Dice" class="dice"> from index file
        diceDOM.src = 'dice-'+dice+ '.png';
        //3. update the round score if the rolled no is not 1

        if(dice!== 1)
        {
            roundScore+=dice;
            document.querySelector('#current-'+activePlayer).textContent= roundScore;
            
        }
    
        else
        {
          nextPlayer();
        }
       
    }
    });
    
    
     




//FOR BUTTON HOLD which is called btn-hold

document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying)
    {
    //1. add the current score to the global score
    scores[activePlayer]+= roundScore;
    //2. update the UI 
    document.querySelector('#score-'+activePlayer).textContent=scores[activePlayer];
    
    //2. to check if player won the game
    if(scores[activePlayer]>=20)
    {
       document.querySelector('#name-'+activePlayer).innerHTML='<em>' + 'WINNER!' + '</em>';
       document.querySelector('.dice').style.display='none';
       document.querySelector('.player-'+activePlayer+ '-panel').classList.add('winner');
       document.querySelector('.player-'+activePlayer+ '-panel').classList.remove('active');
       gamePlaying=false;
       

    }
    else
    {
    //Next Player
    nextPlayer();
    }
   }
});

function nextPlayer() //DRY principle - do not repeat yourself principle make a function wherever you have to copy paste
{
    activePlayer===0 ? activePlayer=1 :activePlayer= 0;
       //now the problem is when the counter shifts to player 2 what happens is it continues the value of the first player and keeps adding the dice nos to it
       roundScore=0;
       // now to also make the current 0 ewhen it is 1
       document.getElementById('current-0').textContent='0';
       document.getElementById('current-1').textContent='0';
       //now to know which is the active player that is the red dot
       //now what happened is the red dot shifts to player 2 but doesnt come back to player 1 so we use another tool called togle which adds a func if it doesnt have and removes it if it has 
      /* document.querySelector('.player-0-panel').classList.remove('active');
       document.querySelector('.player-1-panel').classList.add('active');
       */
      document.querySelector('.player-0-panel').classList.toggle('active');
      document.querySelector('.player-1-panel').classList.toggle('active');

      //now when the player rolled one i dont want to see any images of dice so for that
      document.querySelector('.dice').style.display='none';
}

function init()
{
    scores=[0,0];
    roundScore=0;
    activePlayer=0;
    gamePlaying=true;


    document.querySelector('.dice').style.display='none';


// Now if i want to set the current and the round scores to 0 we can use querySelector but there is another method which is getElementById which works only for ids and is faster than qyerySelector
//here we wont use the # symbol bcox this func only takes IDS
document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';
document.querySelector('#name-0').textContent='Player 1';
document.querySelector('#name-1').textContent='Player 2';
document.querySelector('.player-0-panel').classList.remove('winner');
document.querySelector('.player-1-panel').classList.remove('winner');
document.querySelector('.player-0-panel').classList.remove('active');
document.querySelector('.player-1-panel').classList.remove('active');
document.querySelector('.player-0-panel').classList.add('active');

}
init();
//for button new game
document.querySelector('.btn-new').addEventListener('click', init);


