document.addEventListener('DOMContentLoaded', () =>{

  const squares = document.querySelectorAll('.grid div');
  const scoreDisplay = document.querySelector('.score span');
  const startBtn = document.querySelector('.start');

  const width = 10;
  let currentIndex = 0;
  let appleIndex = 0;
  let currentSnake = [2, 1, 0] //2 is the head, 1 is the body, 0 is tail from now to
  let direction = 1;
  let score = 0;
  let speed = 0.9;
  let intervalTime = 0;
  let interval = 0;


  function startGame() {
    currentSnake.forEach(index => squares[index].classList.remove('snake'))
    squares[appleIndex].classList.remove('apple');
    clearInterval(interval);
    score = 0;

    randomApple();
    direction = 1;
    scoreDisplay.innerHTML = score;
    intervalTime = 1000;
    currentSnake = [2, 1, 0];
    currentIndex = 0;
    currentSnake.forEach(index => squares[index].classList.add('snake'));
    interval = setInterval(moveOutComes, intervalTime);
  }


  function moveOutComes() {

    if(
      (currentSnake[0] + width >= (width * width) && (direction === width)) || //snake hits the bottom
      (currentSnake[0] % width === width -1 && direction === 1) || //snake hits the right wall
      (currentSnake[0] % width === 0 && direction === -1) || //snake hits the left wall
      (currentSnake[0] - width < 0 && direction === -width) || //snake hits the top
      squares[currentSnake[0] + direction].classList.contains('snake')
    ) {
      return clearInterval(interval);
    }

    const tail = currentSnake.pop();
    squares[tail].classList.remove('snake');
    currentSnake.unshift(currentSnake[0] + direction);

    if(squares[currentSnake[0]].classList.contains('apple')) {
      squares[currentSnake[0]].classList.remove('apple');
      squares[tail].classList.add('snake');
      currentSnake.push(tail);
      randomApple()

      score++;
      scoreDisplay.textContent = score;
      clearInterval(interval);
      intervalTime *= speed;
      interval = setInterval(moveOutComes, intervalTime);
    }
    squares[currentSnake[0]].classList.add('snake');
  }

  function randomApple() {
    do {
      appleIndex = Math.floor(Math.random() * squares.length);
    } while(squares[appleIndex].classList.contains('snake'));
    squares[appleIndex].classList.add('apple');
  }






  function control(e) {
    squares[currentIndex].classList.remove('snake');

    //right
    if(e.keyCode === 39) {
      direction = 1;

      //up
    } else if(e.keyCode === 38) {
      direction = -width;

      //left
    } else if(e.keyCode === 37) {
      direction = -1;

      //down
    } else if(e.keyCode === 40) {
      direction = +width;
    }
  }

  document.addEventListener('keyup', control);
  startBtn.addEventListener('click', startGame);




})