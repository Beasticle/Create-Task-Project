(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// Module to display gameboard
const Gameboard = (function () {

    // Positions on the board that equal a win if taken up by one player
    const _winningPatterns = [
      [0, 1, 2],
      [0, 3, 6],
      [0, 4, 8],
      [1, 4, 7],
      [2, 4, 6],
      [2, 5, 8],
      [3, 4, 5],
      [6, 7, 8]
    ];
  
    // A tally of X's and O's played that are a part of _winningPatterns
    var _tallyX = [
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      []
    ];
    var _tallyO = [
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      []
    ];
  
    // Starts the game with Player 1 as "X"
    var playerTurn = 'one';
    var _marker = 'X';
  
    // Empty gameboard to start
    var gameboardArray = [' ', ' ', ' ',
      ' ', ' ', ' ',
      ' ', ' ', ' '
    ];
  
    // Result to be a win by Player 1, Player 2, or a tie
    var result = null;
  
    // Refresh page
    const refreshBtn = document.getElementById('reset-btn');
    refreshBtn.addEventListener('click', function () {
      location.reload()
    });
  
    // Variable for each square and click event
    const _squares = document.querySelectorAll('.square');
    _squares.forEach(square => square.addEventListener('click', addPiece));
  
    // Variable to check if game is 1 or 2 players
    const playerTwoLabel = document.getElementById('player-two');
  
    const aiChoice = function () {
      function aiFunc() {
        while (playerTurn === 'two') {
          var randomPosition = Math.floor(Math.random() * Math.floor(_squares.length));
          if (_squares[randomPosition].innerHTML === '') {
            _squares[randomPosition].innerHTML = 'O';
            gameboardArray.splice(randomPosition, 1, 'O');
            playerTurn = 'one';
            break;
          }
        }
      };
  
      if (result === null) {
        setTimeout(aiFunc, 800);
        setTimeout(checkGame, 900);
        setTimeout(checkTie, 900);
      }
  
    };
  
    // Check if the square clicked is not taken then add "X" or "O" to that square
    function addPiece(e) {
      var _position = Number(e.target.id.slice(-1));
  
      if (playerTurn === 'one' && e.target.innerHTML === '') {
        e.target.innerHTML = 'X';
        _marker = 'X';
        gameboardArray.splice(_position, 1, _marker);
        playerTurn = 'two';
      } else if (e.target.innerHTML === '') {
        e.target.innerHTML = 'O';
        _marker = 'O';
        gameboardArray.splice(_position, 1, _marker);
        playerTurn = 'one';
      }
  
      // Play AI's turn first
      if (playerTwoLabel.innerHTML.includes('COMPUTER (O)') &&
        playerTurn === 'two' &&
        result === null) {
        setTimeout(aiChoice, 350);
      }
  
      checkGame();
      checkTie();
    };
  
    // Check for a winner or tie
    function checkGame() {
      var positionsOfX = [];
      var positionsOfO = [];
  
      // Keeps track of positions taken by "X" and "O"
      for (var i = 0; i < gameboardArray.length; i++) {
        if (gameboardArray[i] === 'X') {
          positionsOfX.push(i);
        } else if (gameboardArray[i] === 'O') {
          positionsOfO.push(i);
        }
      }
  
      // Determine if "X" wins
      for (var i = 0; i < _winningPatterns.length; i++) {
        for (var y = 0; y < positionsOfX.length; y++) {
          if (_winningPatterns[i].includes(positionsOfX[y]) && _tallyX[i].includes(positionsOfX[y]) === false) {
            _tallyX[i].push(positionsOfX[y]);
          }
          if (_tallyX[i].length === 3 && result === null) {
            result = 'Player One';
            endGame();
            setTimeout(trackScore, 350);
            break;
          }
        }
      }
  
      // Determine if "O" wins
      for (var i = 0; i < _winningPatterns.length; i++) {
        for (var y = 0; y < positionsOfO.length; y++) {
          if (_winningPatterns[i].includes(positionsOfO[y]) && _tallyO[i].includes(positionsOfO[y]) === false) {
            _tallyO[i].push(positionsOfO[y]);
          }
          if (_tallyO[i].length === 3 && result === null) {
            result = 'Player Two';
            endGame();
            setTimeout(trackScore, 350);
            break;
          }
        }
      }
    };
  
  
    // Check for a tie
    const checkTie = function () {
      if (gameboardArray.includes(' ') === false && result === null) {
        result = 'Tie';
        endGame();
        setTimeout(trackScore, 350);
      }
    }
  
    // Alert the end of the game
    const endGame = function () {
      const popup = document.getElementById('popup-container');
      const popupText = document.getElementById('popup-text');
      const closePopup = document.getElementById('popup-close');
      const boardMarkers = document.getElementsByClassName('square');
  
      setTimeout(function () {
        result === 'Tie' ? popupText.innerHTML = 'It\s a Tie!' : popupText.innerHTML = `${result} Wins!`;
        popup.style.display = 'block';
      }, 300);
  
      closePopup.addEventListener('click', function () {
        popup.style.display = 'none';
        _tallyX = [
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ];
        _tallyO = [
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ];
        playerTurn = 'one';
        _marker = 'X';
        gameboardArray = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
        result = null;
  
        for (var i = 0; i < boardMarkers.length; i++) {
          boardMarkers[i].innerHTML = '';
        }
      });
    }
  
    const trackScore = function () {
      const playerOneTally = document.getElementById('player-one');
      const playerTwoTally = document.getElementById('player-two');
      const tieTally = document.getElementById('tie');
  
      if (result === 'Player One') {
        playerOneTally.innerHTML = playerOneTally.firstChild.textContent + '<br>' + (Number(playerOneTally.firstElementChild.nextSibling.textContent) + 1);
      } else if (result === 'Player Two') {
        playerTwoTally.innerHTML = playerTwoTally.firstChild.textContent + '<br>' + (Number(playerTwoTally.firstElementChild.nextSibling.textContent) + 1);
      } else {
        tieTally.innerHTML = tieTally.firstChild.textContent + '<br>' + (Number(tieTally.firstElementChild.nextSibling.textContent) + 1);
      }
    }
  
    return {
      gameboardArray
    }
  
  })();
  
  
  const PlayerDisplay = (function () {
    // Player selection and current gameboard variables
    const onePlayerIcon = document.getElementById('one-player');
    const twoPlayersIcon = document.getElementById('two-player');
    const playerIconLabel = document.getElementById('player-label');
    const playerOneLabel = document.getElementById('player-one');
    const playerTwoLabel = document.getElementById('player-two');
    var currentBoard;
  
    const selectOnePlayer = function () {
      currentBoard = Gameboard.gameboardArray.filter((index) => index === ' ');
  
      if (currentBoard.length === 9) {
        onePlayerIcon.classList.toggle('show');
        onePlayerIcon.classList.toggle('hidden');
        twoPlayersIcon.classList.toggle('show');
        twoPlayersIcon.classList.toggle('hidden');
        playerIconLabel.innerHTML = '1P';
        playerOneLabel.innerHTML = 'PLAYER (X)<br>0';
        playerTwoLabel.innerHTML = 'COMPUTER (O)<br>0';
      }
    }
  
    const selectTwoPlayers = function () {
      currentBoard = Gameboard.gameboardArray.filter((index) => index === ' ');
  
      if (currentBoard.length === 9) {
        twoPlayersIcon.classList.toggle('show');
        twoPlayersIcon.classList.toggle('hidden');
        onePlayerIcon.classList.toggle('show');
        onePlayerIcon.classList.toggle('hidden');
        playerIconLabel.innerHTML = '2P';
        playerOneLabel.innerHTML = 'PLAYER 1 (X)<br>0';
        playerTwoLabel.innerHTML = 'PLAYER 2 (O)<br>0';
      }
    }
  
    onePlayerIcon.addEventListener('click', selectTwoPlayers);
    twoPlayersIcon.addEventListener('click', selectOnePlayer);
  
  })();
  
  
  const Audio = (function () {
    // Audio file variables
    const refreshSound = document.getElementById('refresh-audio');
  
    const setPieceSound = document.getElementById('set-piece-sound');
    setPieceSound.playbackRate = 4;
  
    const playerChangeSound = document.getElementById('player-select-audio');
    playerChangeSound.playbackRate = 4;
  
    const setPiece = () => setPieceSound.play();
  
    // Play refresh sound
    window.onload = function () {
      refreshSound.play();
    }
  
    // Mute and unmute sounds
    const muteBtn = document.getElementById('sound');
    const unmuteBtn = document.getElementById('mute');
    var sound = 'on';
  
    const toggleSound = () => {
      if (sound === 'on') {
        muteBtn.classList.toggle('hide-sound');
        unmuteBtn.classList.toggle('hide-sound');
        refreshSound.muted = true;
        playerChangeSound.muted = true;
        setPieceSound.muted = true;
        sound = 'off';
      } else {
        muteBtn.classList.toggle('hide-sound');
        unmuteBtn.classList.toggle('hide-sound');
        refreshSound.muted = false;
        playerChangeSound.muted = false;
        setPieceSound.muted = false;
        sound = 'on';
      }
    }
  
    muteBtn.addEventListener('click', toggleSound);
    unmuteBtn.addEventListener('click', toggleSound);
  
    // Play audio when number of players button is clicked
    const playerChange = () => playerChangeSound.play();
  
    const playerIcons = document.getElementById('num-of-players');
    playerIcons.addEventListener('click', playerChange);
  
    const _squares = document.querySelectorAll('.square');
    _squares.forEach(square => square.addEventListener('click', setPiece));
  
  })();
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L1VzZXJzL2p1bGlhL0FwcERhdGEvUm9hbWluZy9ucG0vbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vIE1vZHVsZSB0byBkaXNwbGF5IGdhbWVib2FyZFxyXG5jb25zdCBHYW1lYm9hcmQgPSAoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIC8vIFBvc2l0aW9ucyBvbiB0aGUgYm9hcmQgdGhhdCBlcXVhbCBhIHdpbiBpZiB0YWtlbiB1cCBieSBvbmUgcGxheWVyXHJcbiAgICBjb25zdCBfd2lubmluZ1BhdHRlcm5zID0gW1xyXG4gICAgICBbMCwgMSwgMl0sXHJcbiAgICAgIFswLCAzLCA2XSxcclxuICAgICAgWzAsIDQsIDhdLFxyXG4gICAgICBbMSwgNCwgN10sXHJcbiAgICAgIFsyLCA0LCA2XSxcclxuICAgICAgWzIsIDUsIDhdLFxyXG4gICAgICBbMywgNCwgNV0sXHJcbiAgICAgIFs2LCA3LCA4XVxyXG4gICAgXTtcclxuICBcclxuICAgIC8vIEEgdGFsbHkgb2YgWCdzIGFuZCBPJ3MgcGxheWVkIHRoYXQgYXJlIGEgcGFydCBvZiBfd2lubmluZ1BhdHRlcm5zXHJcbiAgICB2YXIgX3RhbGx5WCA9IFtcclxuICAgICAgW10sXHJcbiAgICAgIFtdLFxyXG4gICAgICBbXSxcclxuICAgICAgW10sXHJcbiAgICAgIFtdLFxyXG4gICAgICBbXSxcclxuICAgICAgW10sXHJcbiAgICAgIFtdXHJcbiAgICBdO1xyXG4gICAgdmFyIF90YWxseU8gPSBbXHJcbiAgICAgIFtdLFxyXG4gICAgICBbXSxcclxuICAgICAgW10sXHJcbiAgICAgIFtdLFxyXG4gICAgICBbXSxcclxuICAgICAgW10sXHJcbiAgICAgIFtdLFxyXG4gICAgICBbXVxyXG4gICAgXTtcclxuICBcclxuICAgIC8vIFN0YXJ0cyB0aGUgZ2FtZSB3aXRoIFBsYXllciAxIGFzIFwiWFwiXHJcbiAgICB2YXIgcGxheWVyVHVybiA9ICdvbmUnO1xyXG4gICAgdmFyIF9tYXJrZXIgPSAnWCc7XHJcbiAgXHJcbiAgICAvLyBFbXB0eSBnYW1lYm9hcmQgdG8gc3RhcnRcclxuICAgIHZhciBnYW1lYm9hcmRBcnJheSA9IFsnICcsICcgJywgJyAnLFxyXG4gICAgICAnICcsICcgJywgJyAnLFxyXG4gICAgICAnICcsICcgJywgJyAnXHJcbiAgICBdO1xyXG4gIFxyXG4gICAgLy8gUmVzdWx0IHRvIGJlIGEgd2luIGJ5IFBsYXllciAxLCBQbGF5ZXIgMiwgb3IgYSB0aWVcclxuICAgIHZhciByZXN1bHQgPSBudWxsO1xyXG4gIFxyXG4gICAgLy8gUmVmcmVzaCBwYWdlXHJcbiAgICBjb25zdCByZWZyZXNoQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc2V0LWJ0bicpO1xyXG4gICAgcmVmcmVzaEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgbG9jYXRpb24ucmVsb2FkKClcclxuICAgIH0pO1xyXG4gIFxyXG4gICAgLy8gVmFyaWFibGUgZm9yIGVhY2ggc3F1YXJlIGFuZCBjbGljayBldmVudFxyXG4gICAgY29uc3QgX3NxdWFyZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc3F1YXJlJyk7XHJcbiAgICBfc3F1YXJlcy5mb3JFYWNoKHNxdWFyZSA9PiBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhZGRQaWVjZSkpO1xyXG4gIFxyXG4gICAgLy8gVmFyaWFibGUgdG8gY2hlY2sgaWYgZ2FtZSBpcyAxIG9yIDIgcGxheWVyc1xyXG4gICAgY29uc3QgcGxheWVyVHdvTGFiZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWVyLXR3bycpO1xyXG4gIFxyXG4gICAgY29uc3QgYWlDaG9pY2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGZ1bmN0aW9uIGFpRnVuYygpIHtcclxuICAgICAgICB3aGlsZSAocGxheWVyVHVybiA9PT0gJ3R3bycpIHtcclxuICAgICAgICAgIHZhciByYW5kb21Qb3NpdGlvbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIE1hdGguZmxvb3IoX3NxdWFyZXMubGVuZ3RoKSk7XHJcbiAgICAgICAgICBpZiAoX3NxdWFyZXNbcmFuZG9tUG9zaXRpb25dLmlubmVySFRNTCA9PT0gJycpIHtcclxuICAgICAgICAgICAgX3NxdWFyZXNbcmFuZG9tUG9zaXRpb25dLmlubmVySFRNTCA9ICdPJztcclxuICAgICAgICAgICAgZ2FtZWJvYXJkQXJyYXkuc3BsaWNlKHJhbmRvbVBvc2l0aW9uLCAxLCAnTycpO1xyXG4gICAgICAgICAgICBwbGF5ZXJUdXJuID0gJ29uZSc7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuICBcclxuICAgICAgaWYgKHJlc3VsdCA9PT0gbnVsbCkge1xyXG4gICAgICAgIHNldFRpbWVvdXQoYWlGdW5jLCA4MDApO1xyXG4gICAgICAgIHNldFRpbWVvdXQoY2hlY2tHYW1lLCA5MDApO1xyXG4gICAgICAgIHNldFRpbWVvdXQoY2hlY2tUaWUsIDkwMCk7XHJcbiAgICAgIH1cclxuICBcclxuICAgIH07XHJcbiAgXHJcbiAgICAvLyBDaGVjayBpZiB0aGUgc3F1YXJlIGNsaWNrZWQgaXMgbm90IHRha2VuIHRoZW4gYWRkIFwiWFwiIG9yIFwiT1wiIHRvIHRoYXQgc3F1YXJlXHJcbiAgICBmdW5jdGlvbiBhZGRQaWVjZShlKSB7XHJcbiAgICAgIHZhciBfcG9zaXRpb24gPSBOdW1iZXIoZS50YXJnZXQuaWQuc2xpY2UoLTEpKTtcclxuICBcclxuICAgICAgaWYgKHBsYXllclR1cm4gPT09ICdvbmUnICYmIGUudGFyZ2V0LmlubmVySFRNTCA9PT0gJycpIHtcclxuICAgICAgICBlLnRhcmdldC5pbm5lckhUTUwgPSAnWCc7XHJcbiAgICAgICAgX21hcmtlciA9ICdYJztcclxuICAgICAgICBnYW1lYm9hcmRBcnJheS5zcGxpY2UoX3Bvc2l0aW9uLCAxLCBfbWFya2VyKTtcclxuICAgICAgICBwbGF5ZXJUdXJuID0gJ3R3byc7XHJcbiAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuaW5uZXJIVE1MID09PSAnJykge1xyXG4gICAgICAgIGUudGFyZ2V0LmlubmVySFRNTCA9ICdPJztcclxuICAgICAgICBfbWFya2VyID0gJ08nO1xyXG4gICAgICAgIGdhbWVib2FyZEFycmF5LnNwbGljZShfcG9zaXRpb24sIDEsIF9tYXJrZXIpO1xyXG4gICAgICAgIHBsYXllclR1cm4gPSAnb25lJztcclxuICAgICAgfVxyXG4gIFxyXG4gICAgICAvLyBQbGF5IEFJJ3MgdHVybiBmaXJzdFxyXG4gICAgICBpZiAocGxheWVyVHdvTGFiZWwuaW5uZXJIVE1MLmluY2x1ZGVzKCdDT01QVVRFUiAoTyknKSAmJlxyXG4gICAgICAgIHBsYXllclR1cm4gPT09ICd0d28nICYmXHJcbiAgICAgICAgcmVzdWx0ID09PSBudWxsKSB7XHJcbiAgICAgICAgc2V0VGltZW91dChhaUNob2ljZSwgMzUwKTtcclxuICAgICAgfVxyXG4gIFxyXG4gICAgICBjaGVja0dhbWUoKTtcclxuICAgICAgY2hlY2tUaWUoKTtcclxuICAgIH07XHJcbiAgXHJcbiAgICAvLyBDaGVjayBmb3IgYSB3aW5uZXIgb3IgdGllXHJcbiAgICBmdW5jdGlvbiBjaGVja0dhbWUoKSB7XHJcbiAgICAgIHZhciBwb3NpdGlvbnNPZlggPSBbXTtcclxuICAgICAgdmFyIHBvc2l0aW9uc09mTyA9IFtdO1xyXG4gIFxyXG4gICAgICAvLyBLZWVwcyB0cmFjayBvZiBwb3NpdGlvbnMgdGFrZW4gYnkgXCJYXCIgYW5kIFwiT1wiXHJcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZ2FtZWJvYXJkQXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoZ2FtZWJvYXJkQXJyYXlbaV0gPT09ICdYJykge1xyXG4gICAgICAgICAgcG9zaXRpb25zT2ZYLnB1c2goaSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChnYW1lYm9hcmRBcnJheVtpXSA9PT0gJ08nKSB7XHJcbiAgICAgICAgICBwb3NpdGlvbnNPZk8ucHVzaChpKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICBcclxuICAgICAgLy8gRGV0ZXJtaW5lIGlmIFwiWFwiIHdpbnNcclxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBfd2lubmluZ1BhdHRlcm5zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgZm9yICh2YXIgeSA9IDA7IHkgPCBwb3NpdGlvbnNPZlgubGVuZ3RoOyB5KyspIHtcclxuICAgICAgICAgIGlmIChfd2lubmluZ1BhdHRlcm5zW2ldLmluY2x1ZGVzKHBvc2l0aW9uc09mWFt5XSkgJiYgX3RhbGx5WFtpXS5pbmNsdWRlcyhwb3NpdGlvbnNPZlhbeV0pID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICBfdGFsbHlYW2ldLnB1c2gocG9zaXRpb25zT2ZYW3ldKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChfdGFsbHlYW2ldLmxlbmd0aCA9PT0gMyAmJiByZXN1bHQgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gJ1BsYXllciBPbmUnO1xyXG4gICAgICAgICAgICBlbmRHYW1lKCk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQodHJhY2tTY29yZSwgMzUwKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgXHJcbiAgICAgIC8vIERldGVybWluZSBpZiBcIk9cIiB3aW5zXHJcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgX3dpbm5pbmdQYXR0ZXJucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGZvciAodmFyIHkgPSAwOyB5IDwgcG9zaXRpb25zT2ZPLmxlbmd0aDsgeSsrKSB7XHJcbiAgICAgICAgICBpZiAoX3dpbm5pbmdQYXR0ZXJuc1tpXS5pbmNsdWRlcyhwb3NpdGlvbnNPZk9beV0pICYmIF90YWxseU9baV0uaW5jbHVkZXMocG9zaXRpb25zT2ZPW3ldKSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgX3RhbGx5T1tpXS5wdXNoKHBvc2l0aW9uc09mT1t5XSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoX3RhbGx5T1tpXS5sZW5ndGggPT09IDMgJiYgcmVzdWx0ID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9ICdQbGF5ZXIgVHdvJztcclxuICAgICAgICAgICAgZW5kR2FtZSgpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KHRyYWNrU2NvcmUsIDM1MCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfTtcclxuICBcclxuICBcclxuICAgIC8vIENoZWNrIGZvciBhIHRpZVxyXG4gICAgY29uc3QgY2hlY2tUaWUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGlmIChnYW1lYm9hcmRBcnJheS5pbmNsdWRlcygnICcpID09PSBmYWxzZSAmJiByZXN1bHQgPT09IG51bGwpIHtcclxuICAgICAgICByZXN1bHQgPSAnVGllJztcclxuICAgICAgICBlbmRHYW1lKCk7XHJcbiAgICAgICAgc2V0VGltZW91dCh0cmFja1Njb3JlLCAzNTApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgXHJcbiAgICAvLyBBbGVydCB0aGUgZW5kIG9mIHRoZSBnYW1lXHJcbiAgICBjb25zdCBlbmRHYW1lID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICBjb25zdCBwb3B1cCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3B1cC1jb250YWluZXInKTtcclxuICAgICAgY29uc3QgcG9wdXBUZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BvcHVwLXRleHQnKTtcclxuICAgICAgY29uc3QgY2xvc2VQb3B1cCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3B1cC1jbG9zZScpO1xyXG4gICAgICBjb25zdCBib2FyZE1hcmtlcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzcXVhcmUnKTtcclxuICBcclxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmVzdWx0ID09PSAnVGllJyA/IHBvcHVwVGV4dC5pbm5lckhUTUwgPSAnSXRcXHMgYSBUaWUhJyA6IHBvcHVwVGV4dC5pbm5lckhUTUwgPSBgJHtyZXN1bHR9IFdpbnMhYDtcclxuICAgICAgICBwb3B1cC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgfSwgMzAwKTtcclxuICBcclxuICAgICAgY2xvc2VQb3B1cC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBwb3B1cC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIF90YWxseVggPSBbXHJcbiAgICAgICAgICBbXSxcclxuICAgICAgICAgIFtdLFxyXG4gICAgICAgICAgW10sXHJcbiAgICAgICAgICBbXSxcclxuICAgICAgICAgIFtdLFxyXG4gICAgICAgICAgW10sXHJcbiAgICAgICAgICBbXSxcclxuICAgICAgICAgIFtdXHJcbiAgICAgICAgXTtcclxuICAgICAgICBfdGFsbHlPID0gW1xyXG4gICAgICAgICAgW10sXHJcbiAgICAgICAgICBbXSxcclxuICAgICAgICAgIFtdLFxyXG4gICAgICAgICAgW10sXHJcbiAgICAgICAgICBbXSxcclxuICAgICAgICAgIFtdLFxyXG4gICAgICAgICAgW10sXHJcbiAgICAgICAgICBbXVxyXG4gICAgICAgIF07XHJcbiAgICAgICAgcGxheWVyVHVybiA9ICdvbmUnO1xyXG4gICAgICAgIF9tYXJrZXIgPSAnWCc7XHJcbiAgICAgICAgZ2FtZWJvYXJkQXJyYXkgPSBbJyAnLCAnICcsICcgJywgJyAnLCAnICcsICcgJywgJyAnLCAnICcsICcgJ107XHJcbiAgICAgICAgcmVzdWx0ID0gbnVsbDtcclxuICBcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJvYXJkTWFya2Vycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgYm9hcmRNYXJrZXJzW2ldLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgXHJcbiAgICBjb25zdCB0cmFja1Njb3JlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICBjb25zdCBwbGF5ZXJPbmVUYWxseSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXItb25lJyk7XHJcbiAgICAgIGNvbnN0IHBsYXllclR3b1RhbGx5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXllci10d28nKTtcclxuICAgICAgY29uc3QgdGllVGFsbHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGllJyk7XHJcbiAgXHJcbiAgICAgIGlmIChyZXN1bHQgPT09ICdQbGF5ZXIgT25lJykge1xyXG4gICAgICAgIHBsYXllck9uZVRhbGx5LmlubmVySFRNTCA9IHBsYXllck9uZVRhbGx5LmZpcnN0Q2hpbGQudGV4dENvbnRlbnQgKyAnPGJyPicgKyAoTnVtYmVyKHBsYXllck9uZVRhbGx5LmZpcnN0RWxlbWVudENoaWxkLm5leHRTaWJsaW5nLnRleHRDb250ZW50KSArIDEpO1xyXG4gICAgICB9IGVsc2UgaWYgKHJlc3VsdCA9PT0gJ1BsYXllciBUd28nKSB7XHJcbiAgICAgICAgcGxheWVyVHdvVGFsbHkuaW5uZXJIVE1MID0gcGxheWVyVHdvVGFsbHkuZmlyc3RDaGlsZC50ZXh0Q29udGVudCArICc8YnI+JyArIChOdW1iZXIocGxheWVyVHdvVGFsbHkuZmlyc3RFbGVtZW50Q2hpbGQubmV4dFNpYmxpbmcudGV4dENvbnRlbnQpICsgMSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGllVGFsbHkuaW5uZXJIVE1MID0gdGllVGFsbHkuZmlyc3RDaGlsZC50ZXh0Q29udGVudCArICc8YnI+JyArIChOdW1iZXIodGllVGFsbHkuZmlyc3RFbGVtZW50Q2hpbGQubmV4dFNpYmxpbmcudGV4dENvbnRlbnQpICsgMSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICBcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGdhbWVib2FyZEFycmF5XHJcbiAgICB9XHJcbiAgXHJcbiAgfSkoKTtcclxuICBcclxuICBcclxuICBjb25zdCBQbGF5ZXJEaXNwbGF5ID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIC8vIFBsYXllciBzZWxlY3Rpb24gYW5kIGN1cnJlbnQgZ2FtZWJvYXJkIHZhcmlhYmxlc1xyXG4gICAgY29uc3Qgb25lUGxheWVySWNvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvbmUtcGxheWVyJyk7XHJcbiAgICBjb25zdCB0d29QbGF5ZXJzSWNvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0d28tcGxheWVyJyk7XHJcbiAgICBjb25zdCBwbGF5ZXJJY29uTGFiZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWVyLWxhYmVsJyk7XHJcbiAgICBjb25zdCBwbGF5ZXJPbmVMYWJlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXItb25lJyk7XHJcbiAgICBjb25zdCBwbGF5ZXJUd29MYWJlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXItdHdvJyk7XHJcbiAgICB2YXIgY3VycmVudEJvYXJkO1xyXG4gIFxyXG4gICAgY29uc3Qgc2VsZWN0T25lUGxheWVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICBjdXJyZW50Qm9hcmQgPSBHYW1lYm9hcmQuZ2FtZWJvYXJkQXJyYXkuZmlsdGVyKChpbmRleCkgPT4gaW5kZXggPT09ICcgJyk7XHJcbiAgXHJcbiAgICAgIGlmIChjdXJyZW50Qm9hcmQubGVuZ3RoID09PSA5KSB7XHJcbiAgICAgICAgb25lUGxheWVySWNvbi5jbGFzc0xpc3QudG9nZ2xlKCdzaG93Jyk7XHJcbiAgICAgICAgb25lUGxheWVySWNvbi5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKTtcclxuICAgICAgICB0d29QbGF5ZXJzSWNvbi5jbGFzc0xpc3QudG9nZ2xlKCdzaG93Jyk7XHJcbiAgICAgICAgdHdvUGxheWVyc0ljb24uY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJyk7XHJcbiAgICAgICAgcGxheWVySWNvbkxhYmVsLmlubmVySFRNTCA9ICcxUCc7XHJcbiAgICAgICAgcGxheWVyT25lTGFiZWwuaW5uZXJIVE1MID0gJ1BMQVlFUiAoWCk8YnI+MCc7XHJcbiAgICAgICAgcGxheWVyVHdvTGFiZWwuaW5uZXJIVE1MID0gJ0NPTVBVVEVSIChPKTxicj4wJztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIFxyXG4gICAgY29uc3Qgc2VsZWN0VHdvUGxheWVycyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgY3VycmVudEJvYXJkID0gR2FtZWJvYXJkLmdhbWVib2FyZEFycmF5LmZpbHRlcigoaW5kZXgpID0+IGluZGV4ID09PSAnICcpO1xyXG4gIFxyXG4gICAgICBpZiAoY3VycmVudEJvYXJkLmxlbmd0aCA9PT0gOSkge1xyXG4gICAgICAgIHR3b1BsYXllcnNJY29uLmNsYXNzTGlzdC50b2dnbGUoJ3Nob3cnKTtcclxuICAgICAgICB0d29QbGF5ZXJzSWNvbi5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKTtcclxuICAgICAgICBvbmVQbGF5ZXJJY29uLmNsYXNzTGlzdC50b2dnbGUoJ3Nob3cnKTtcclxuICAgICAgICBvbmVQbGF5ZXJJY29uLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpO1xyXG4gICAgICAgIHBsYXllckljb25MYWJlbC5pbm5lckhUTUwgPSAnMlAnO1xyXG4gICAgICAgIHBsYXllck9uZUxhYmVsLmlubmVySFRNTCA9ICdQTEFZRVIgMSAoWCk8YnI+MCc7XHJcbiAgICAgICAgcGxheWVyVHdvTGFiZWwuaW5uZXJIVE1MID0gJ1BMQVlFUiAyIChPKTxicj4wJztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIFxyXG4gICAgb25lUGxheWVySWNvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNlbGVjdFR3b1BsYXllcnMpO1xyXG4gICAgdHdvUGxheWVyc0ljb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzZWxlY3RPbmVQbGF5ZXIpO1xyXG4gIFxyXG4gIH0pKCk7XHJcbiAgXHJcbiAgXHJcbiAgY29uc3QgQXVkaW8gPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgLy8gQXVkaW8gZmlsZSB2YXJpYWJsZXNcclxuICAgIGNvbnN0IHJlZnJlc2hTb3VuZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZWZyZXNoLWF1ZGlvJyk7XHJcbiAgXHJcbiAgICBjb25zdCBzZXRQaWVjZVNvdW5kID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NldC1waWVjZS1zb3VuZCcpO1xyXG4gICAgc2V0UGllY2VTb3VuZC5wbGF5YmFja1JhdGUgPSA0O1xyXG4gIFxyXG4gICAgY29uc3QgcGxheWVyQ2hhbmdlU291bmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWVyLXNlbGVjdC1hdWRpbycpO1xyXG4gICAgcGxheWVyQ2hhbmdlU291bmQucGxheWJhY2tSYXRlID0gNDtcclxuICBcclxuICAgIGNvbnN0IHNldFBpZWNlID0gKCkgPT4gc2V0UGllY2VTb3VuZC5wbGF5KCk7XHJcbiAgXHJcbiAgICAvLyBQbGF5IHJlZnJlc2ggc291bmRcclxuICAgIHdpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJlZnJlc2hTb3VuZC5wbGF5KCk7XHJcbiAgICB9XHJcbiAgXHJcbiAgICAvLyBNdXRlIGFuZCB1bm11dGUgc291bmRzXHJcbiAgICBjb25zdCBtdXRlQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NvdW5kJyk7XHJcbiAgICBjb25zdCB1bm11dGVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbXV0ZScpO1xyXG4gICAgdmFyIHNvdW5kID0gJ29uJztcclxuICBcclxuICAgIGNvbnN0IHRvZ2dsZVNvdW5kID0gKCkgPT4ge1xyXG4gICAgICBpZiAoc291bmQgPT09ICdvbicpIHtcclxuICAgICAgICBtdXRlQnRuLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGUtc291bmQnKTtcclxuICAgICAgICB1bm11dGVCdG4uY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZS1zb3VuZCcpO1xyXG4gICAgICAgIHJlZnJlc2hTb3VuZC5tdXRlZCA9IHRydWU7XHJcbiAgICAgICAgcGxheWVyQ2hhbmdlU291bmQubXV0ZWQgPSB0cnVlO1xyXG4gICAgICAgIHNldFBpZWNlU291bmQubXV0ZWQgPSB0cnVlO1xyXG4gICAgICAgIHNvdW5kID0gJ29mZic7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbXV0ZUJ0bi5jbGFzc0xpc3QudG9nZ2xlKCdoaWRlLXNvdW5kJyk7XHJcbiAgICAgICAgdW5tdXRlQnRuLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGUtc291bmQnKTtcclxuICAgICAgICByZWZyZXNoU291bmQubXV0ZWQgPSBmYWxzZTtcclxuICAgICAgICBwbGF5ZXJDaGFuZ2VTb3VuZC5tdXRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHNldFBpZWNlU291bmQubXV0ZWQgPSBmYWxzZTtcclxuICAgICAgICBzb3VuZCA9ICdvbic7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICBcclxuICAgIG11dGVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0b2dnbGVTb3VuZCk7XHJcbiAgICB1bm11dGVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0b2dnbGVTb3VuZCk7XHJcbiAgXHJcbiAgICAvLyBQbGF5IGF1ZGlvIHdoZW4gbnVtYmVyIG9mIHBsYXllcnMgYnV0dG9uIGlzIGNsaWNrZWRcclxuICAgIGNvbnN0IHBsYXllckNoYW5nZSA9ICgpID0+IHBsYXllckNoYW5nZVNvdW5kLnBsYXkoKTtcclxuICBcclxuICAgIGNvbnN0IHBsYXllckljb25zID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ251bS1vZi1wbGF5ZXJzJyk7XHJcbiAgICBwbGF5ZXJJY29ucy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHBsYXllckNoYW5nZSk7XHJcbiAgXHJcbiAgICBjb25zdCBfc3F1YXJlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zcXVhcmUnKTtcclxuICAgIF9zcXVhcmVzLmZvckVhY2goc3F1YXJlID0+IHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNldFBpZWNlKSk7XHJcbiAgXHJcbiAgfSkoKTsiXX0=
