/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, dice, gamePlaying, count, winningScore, secondDice

// State Variable


function init(){
    scores = [0,0]
    roundScore = 0
    activePlayer = 0
    count = 0
    gamePlaying = true

    document.querySelector('.dice').style.display = 'none'
    document.querySelector('.second-dice').style.display = 'none'
    document.getElementById('score-0').textContent = '0'
    document.getElementById('score-1').textContent = '0'
    document.getElementById('current-0').textContent = '0'
    document.getElementById('current-1').textContent = '0'
    document.querySelector('#name-0').textContent = "Player 1"
    document.querySelector('#name-1').textContent = "Player 2"
    document.querySelector('.player-0-panel').classList.remove('winner')
    document.querySelector('.player-1-panel').classList.remove('winner')
    document.querySelector('.player-0-panel').classList.remove('active')
    document.querySelector('.player-1-panel').classList.remove('active')
    document.querySelector('.player-0-panel').classList.add('active')
}

init()

// console.log(dice)

// document.querySelector('#current-' + activePlayer).textContent = dice 
// document.querySelector('#current-' + activePlayer).innerHTML = '<span>' + dice + '</span>'

// var scoreZero = document.querySelector('#score-' + activePlayer).textContent


document.querySelector('.btn-roll').addEventListener('click', function(){

    if (gamePlaying){

        // Generate random number
        dice = Math.floor(Math.random() * 6) + 1
        secondDice = Math.floor(Math.random() * 6) + 1
        // Display number
        var diceDOM = document.querySelector('.dice')
        diceDOM.style.display = 'inline-block'
        diceDOM.src = 'dice-' + dice + '.png'
        var secondDiceDOM = document.querySelector('.second-dice')
        secondDiceDOM.style.display = 'inline-block'
        secondDiceDOM.src = 'dice-' + secondDice + '.png' 
        
        // Update the current score IF roll is not 1
        var score = document.querySelector('#current-' + activePlayer)

        // Player loses all points if the score 6 twice
        
        
        if (dice !== 1 && secondDice !== 1){
            roundScore += dice + secondDice
            score.textContent = roundScore
            } 
        else{

            activePlayer === 0 ? activePlayer = 1 : activePlayer = 0
            roundScore = 0
            score.textContent = '0'
            document.querySelector('.player-0-panel').classList.toggle('active')
            document.querySelector('.player-1-panel').classList.toggle('active')
        }

        if (dice === 6 || secondDice === 6){
            count++
        
        } else {
            count = 0
        }

        if (count === 2){
            activePlayer === 0 ? activePlayer = 1 : activePlayer = 0
            roundScore = 0
            score.textContent = '0'
            document.querySelector('.player-0-panel').classList.toggle('active')
            document.querySelector('.player-1-panel').classList.toggle('active')
            count = 0
            
        }

    }
    
})

document.querySelector('.enter').addEventListener('click', function(){
    winningScore = document.getElementById('score').value

    if (winningScore){
        var input = winningScore
    } else {
        winningScore = 100
    }

})

document.querySelector('.btn-hold').addEventListener('click', function(){

    console.log(winningScore)
    console.log(scores[activePlayer])

    if (gamePlaying){
        document.querySelector('.dice').style.display = 'none'
        document.querySelector('.second-dice').style.display = 'none'
        scores[activePlayer] += roundScore
        roundScore = 0
        document.querySelector('#current-' + activePlayer).textContent = '0'
        document.querySelector('.player-0-panel').classList.toggle('active')
        document.querySelector('.player-1-panel').classList.toggle('active')
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer]
}

    if (scores[activePlayer] >= winningScore){
        endGame()
    } else{activePlayer === 0 ? activePlayer = 1 : activePlayer = 0}

    

    
    
})

document.querySelector('.btn-new').addEventListener('click', init)

function reset(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0
    roundScore = 0
    score.textContent = '0'
    document.querySelector('.player-0-panel').classList.toggle('active')
    document.querySelector('.player-1-panel').classList.toggle('active')
}


function endGame(){
    gamePlaying = false
    document.querySelector('#name-' + activePlayer).textContent = "Winner!!!"
    document.querySelector('.dice').style.display = 'none'
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner')
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active')
}

