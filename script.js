const player= document.getElementById("player")
const yeti= document.getElementById("yeti")
const house= document.getElementById("house")


let playerX= 100
let yetiX= 0
let houseX= 1100
let playerSpeed=3
let yetiSpeed= 2.5
let isMoving= false
let gameOver= false
let gameStarted= false

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

    player.style.left= playerX +"px"

    if(gameStarted){
        if(isMoving){

        yetiX += yetiSpeed

        }else{

            yetiX += yetiSpeed * 2
        }
    }


    yeti.style.left= yetiX + "px"


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