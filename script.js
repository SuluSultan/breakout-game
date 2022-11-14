const btnRules = document.getElementById("btn-rules")
const btnClose = document.getElementById("btn-close")
const rules = document.getElementById("rules");
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let score = 0;

const brickRowCount = 9;
const brickColumnCount = 5;

const ball = {
    x:canvas.width / 2,
    y: canvas.height / 2,
    size: 10,
    speed: 4,
    dx:4,
    dy:-4
}

const paddle = {
    x:canvas.width / 2 - 40,
    y: canvas.height - 20,
    w:80,
    h:10,
    speed:8,
    dx:0
}

const bricksData = {
    w:60,
    h:20,
    padding:5,
    offsetX:85,
    offsetY:20,
    visible:true
}

const bricks = [];
for(let i = 0; i < brickRowCount; i++){
    bricks[i] = [];
    for(let j=0; j< brickColumnCount; j++){
        const x = i * (bricksData.w +bricksData.padding) + bricksData.offsetX;
        const y = j * (bricksData.h +bricksData.padding) + bricksData.offsetY;
        bricks[i][j] = {x,y, ...bricksData}
    }
}

function drawBall(){
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
    ctx.fillStyle = '#92A5E6';
    ctx.fill();
    ctx.closePath();
}


function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddle.x,paddle.y,paddle.w,paddle.h);
    ctx.fillStyle = '#92A5E6';
    ctx.fill();
    ctx.closePath();
}


function scores(){
    ctx.font= '20px Arial';
    ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
}

function drawBricks(){
    bricks.forEach(column => {
        column.forEach(brick => {
            ctx.beginPath();
            ctx.rect(brick.x, brick.y, brick.w, brick.h);
            ctx.fillStyle = brick.visible ? '#92A5E6' : 'transparent';
            ctx.fill();
            ctx.closePath();
        })
    })
}

function paddleMove(){
    paddle.x += paddle.dx;

    if(paddle.x + paddle.w > canvas.width){
        paddle.x = canvas.width - paddle.w;
    }

    if(paddle.x < 0) {
        paddle.x = 0;
    }
}


function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
        ball.dx *= -1; // ball.dx = ball.dx * -1
      }

      if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
        ball.dy *= -1;
      }

      if (
        ball.x - ball.size > paddle.x &&
        ball.x + ball.size < paddle.x + paddle.w &&
        ball.y + ball.size > paddle.y
      ) {
        ball.dy = -ball.speed;
      }

      bricks.forEach(column => {
        column.forEach(brick => {
          if (brick.visible) {
            if (
        ball.x - ball.size > brick.x && // left brick side check
        ball.x + ball.size < brick.x + brick.w && // right brick side check
        ball.y + ball.size > brick.y && // top brick side check
        ball.y - ball.size < brick.y + brick.h // bottom brick side check
    ) {
         ball.dy *= -1;
         brick.visible = false;
    increaseScore();
   }
  }
 });
});

 if (ball.y + ball.size > canvas.height) {
        showAllBricks();
        score = 0;
      }
}

function increaseScore() {
    score++;
  
    if (score % (brickRowCount * brickRowCount) === 0) {
      showAllBricks();
    }
  }

  function showAllBricks() {
    bricks.forEach(column => {
      column.forEach(brick => (brick.visible = true));
    });
  }



function draw(){

    ctx.clearRect(0,0, canvas.width, canvas.height)
    drawBall();
    drawPaddle();
    scores();
    drawBricks()
};

function update(){
    paddleMove();
     moveBall();
    draw();

    requestAnimationFrame(update);
}
update();

function keyDown(e){
    if(e === 'Right' || e === 'ArrowRight'){
        paddle.dx = paddle.speed;
    }else if(e === 'Left' || e === 'ArrowLeft'){
        paddle.dx = -paddle.speed;
    }
};
keyDown();


function keyUp(e){
    if(e === 'Right' || e=== 'ArrowRight' || e=== 'Left' || e === 'ArrowRight'){

    }
};
keyUp();

document.addEventListener('keydown',keyDown);
document.addEventListener('keyup',keyUp);

btnRules.addEventListener("click",()=>rules.classList.add('show'));
console.log('hi')
btnClose.addEventListener("click",()=>rules.classList.remove('show'));