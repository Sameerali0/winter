const player= document.getElementById("player")
const yeti= document.getElementById("yeti")
const house= document.getElementById("house")
const obstaclesDiv= document.getElementById("obstacles")
const endScreen= document.getElementById("end")
const endResult= document.getElementById("result")
const endMessage= document.getElementById("message")
const playAgainBtn= document.getElementById("playAgain")
const startScreen= document.getElementById("start")
const startBtn= document.getElementById("startBtn")
const nextLevelBtn= document.getElementById("nextLvlBtn")
const showLevel= document.getElementById("showLevel")


const gameOverSound= new Audio("sounds/gameover.mp3")
gameOverSound.volume=0.5
const backgroundMusic= new Audio("sounds/background.mp3")
backgroundMusic.loop= true
backgroundMusic.volume= 0.2
const jumpSound= new Audio("sounds/jump.mp3")
jumpSound.volume= 0.5
const yetiSound= new Audio("sounds/yeti.mp3")
const winSound= new Audio("sounds/win.mp3")


let playerX= 150
let playerY= 0       
let yetiX= 0
let bgOffset = 0
let houseX
let playerSpeed=3
let yetiSpeed= 2.5
let isMoving= false
let gameOver= false
let gameStarted= false
let isJumping= false
let yetiSoundPlayed= false


let jumpSpeed= 12
let gravity= 0.3

let level= 1

let obstacles= []

function createObstacles(){

    let totalObstacle = level * 5

    obstacles= []
    obstaclesDiv.innerHTML= ""

    for(let i= 0; i < totalObstacle; i++){

        let obstacleType= Math.random() < 0.5 ? "rock" : "wood"


        let obstacleimg= document.createElement("img")
        obstacleimg.src= obstacleType === "rock" ? "images/rockObs.png" : "images/woodObs.png"
        obstacleimg.classList.add("obstacle")


        let obstacleX= 400 + i * 450 + Math.random() *150


        
        obstacleimg.style.left= obstacleX + "px"

        obstaclesDiv.appendChild(obstacleimg)

        obstacles.push({type: obstacleType, x: obstacleX, element: obstacleimg})


    }
}


createObstacles()


houseX= 500 + obstacles.length * 300 + 300


function showEndScreen(result, message, isWin= false){

    gameOver= true

    endResult.textContent= result
    endMessage.textContent= message
    endScreen.style.display= "flex"
    nextLevelBtn.style.display= isWin ? "flex" : "none"

}


document.addEventListener("keydown", (e)=>{

        if(e.key === "ArrowRight"){

            isMoving=true
            gameStarted= true
        }

        if(e.key === " " && !isJumping){

            isJumping= true
            jumpSpeed= 12

            jumpSound.currentTime= 0
            jumpSound.play()

        }
})

document.addEventListener("keyup", (e)=>{

        if(e.key === "ArrowRight"){

            isMoving=false
        }
})



function game(){

    if(gameOver){

        return
    }

    if(gameStarted && !yetiSoundPlayed){

        yetiSound.play()
        yetiSoundPlayed= true
    }


    if(isMoving){

    
        bgOffset -= playerSpeed

    }else if(gameStarted){

        yetiX += yetiSpeed * 2.5
    }


    if(isJumping){

        playerY += jumpSpeed;
        jumpSpeed -= gravity;

        if(playerY <= 0){

            playerY= 0
            isJumping= false

        }

    }



    player.style.left= playerX + "px"

    player.style.bottom= playerY + "px"

    yeti.style.left= (yetiX + bgOffset) + "px"
    house.style.left= (houseX + bgOffset) + "px"

    for(let obs of obstacles){

        obs.element.style.left= (obs.x + bgOffset) + "px"

        let hitX= playerX + 100 >= obs.x + bgOffset && playerX <= obs.x + bgOffset + 50

        let hitY= playerY < 40 

        if(hitX && hitY){

            gameOverSound.currentTime= 0
            gameOverSound.play()


            showEndScreen("GAME OVER","You hit an obstacle!")

            return
        }

    }
        
    if(yetiX + 50 >= -bgOffset + playerX){

        yetiSound.currentTime= 0
        yetiSound.play()

        gameOverSound.currentTime= 0
        gameOverSound.play()


        showEndScreen("GAME OVER","Yeti Caught You!")

    }


    if(-bgOffset + playerX + 100 >= houseX){

        winSound.currentTime= 0
        winSound.play()

        level++

        showEndScreen("YOU WIN", "You reached home safely!", true)
    }


    requestAnimationFrame(game);
}

function createSnow() {
    const snow= document.getElementById("snow")

    setInterval(() =>{

        const snowFlake= document.createElement("div")
        snowFlake.classList.add("snowflake")

        const snowImg= document.createElement("img")
        snowImg.src= "images/snow.png"

        snowFlake.appendChild(snowImg)


        snowFlake.style.left= Math.random() * 100 +"vw"
        snowFlake.style.animationDuration= 3 + Math.random() * 5 + "s"

        let snowSize= 5 + Math.random() * 10
        snowImg.style.width= snowSize +"px"
        snowImg.style.height= snowSize + "px"


        snowFlake.style.opacity= Math.random()

        snow.appendChild(snowFlake)

        setTimeout(()=> snowFlake.remove(), 8000)

    }, 120)
   
}


createSnow()


function resetGame() {

    playerY= 0
    yetiX= 0
    bgOffset=0
    gameOver= false
    isMoving= false
    isJumping= false
    gameStarted= false
    yetiSoundPlayed= false

    jumpSpeed=12


    player.style.left= playerX + "px"
    player.style.bottom= playerY + "px"
    yeti.style.left= yetiX + "px"


    createObstacles()

    showLevel.textContent= "Level: " + level

    houseX= 500 + obstacles.length * 300 + 300

    endScreen.style.display="none"

    requestAnimationFrame(game)

    
}


playAgainBtn.addEventListener("click", ()=>{

    winSound.currentTime=0
    winSound.pause()

    resetGame()
})

nextLevelBtn.addEventListener("click", ()=>{

    winSound.currentTime=0
    winSound.pause()

    resetGame()
})

startBtn.addEventListener("click", ()=>{

    startScreen.style.display="none"

    backgroundMusic.currentTime= 0
    backgroundMusic.play()

    game()
})

