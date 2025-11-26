const player= document.getElementById("player")

let playerX= 100
let playerSpeed=3
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

    requestAnimationFrame(game);
}

game()