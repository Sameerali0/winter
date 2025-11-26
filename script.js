const player= document.getElementById("player")
const yeti= document.getElementById("yeti")


let playerX= 100
let yetiX= 0
let playerSpeed=3
let yetiSpeed= 2.5
let isMoving= false

document.addEventListener("keydown", (e)=>{

        if(e.key === "ArrowRight"){

            isMoving=true
        }
})

document.addEventListener("keyup", (e)=>{

        if(e.key === "ArrowRight"){

            isMoving=false
        }
})



function game(){
    

    if(isMoving){

        playerX +=playerSpeed
    }

    player.style.left = playerX +"px"

    if(isMoving){

        yetiX += yetiSpeed

    }

    yeti.style.left= yetiX + "px"


    requestAnimationFrame(game);
}

game()