const player= document.getElementById("player")
const yeti= document.getElementById("yeti")
const house= document.getElementById("house")
const obstaclesDiv= document.getElementById("obstacles")

let playerX= 100
let yetiX= 0
let houseX= 1100
let playerSpeed=3
let yetiSpeed= 2.5
let isMoving= false
let gameOver= false
let gameStarted= false


let obstacles= []

function createObstacles(){

    let totalObstacle = 2

    for(let i= 0; i < totalObstacle; i++){

        let obstacleType= Math.random() < 0.5 ? "rock" : "wood"


        let obstacleimg= document.createElement("img")
        obstacleimg.src= obstacleType === "rock" ? "images/rockObs.png" : "images/woodObs.png"
        obstacleimg.classList.add("obstacle")


        let obstacleX= 400 + i * 350 + Math.random() *150


        
        obstacleimg.style.left= obstacleX + "px"

        obstaclesDiv.appendChild(obstacleimg)

        obstacles.push({type: obstacleType, x: obstacleX, element: obstacleimg})


    }
}


createObstacles()


houseX= 400 + obstacles.length * 250 + 300
house.style.left= houseX + "px"


document.addEventListener("keydown", (e)=>{

        if(e.key === "ArrowRight"){

            isMoving=true
            gameStarted= true
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

    if(isMoving){

        playerX +=playerSpeed
    }

    player.style.left= playerX + "px";

    if(gameStarted){
        if(isMoving){

        yetiX += yetiSpeed

        }else{

            yetiX += yetiSpeed * 2
        }
    }


    
    yeti.style.left= yetiX + "px"

    for(let obs of obstacles){

        if(playerX + 100 >= obs.x){

            gameOver= true

            alert("Obstacle hit! Game Over!")

            return
        }

    }


    if(yetiX + 50 >= playerX){

        gameOver= true

        alert("Yeti Catch You Game Over!")

    }


    if(playerX + 100 >= houseX){

        gameOver = true

        alert("You reached home safely You Win!")
    }


    requestAnimationFrame(game);
}

game()