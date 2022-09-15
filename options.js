
const options     = document.querySelector(".options");
const gameOverElement = document.querySelector(".gameover");

//select buttons
const computerBtn = options.querySelector(".computer")
const friendBtn   = options.querySelector(".friend");
const oBtn        = options.querySelector(".o");
const xBtn        = options.querySelector(".x");
const playBtn     = options.querySelector(".play");


const player = new Object;
let OPPONENT;


computerBtn.addEventListener("click",function(){

    OPPONENT = "computer";
    switchActive(friendBtn,computerBtn);
});

friendBtn.addEventListener("click",function(){

    OPPONENT = "friend";
    switchActive(computerBtn,friendBtn);

});
oBtn.addEventListener("click",function(){

    player.man ="O";
    player.computer ="X";
    player.friend ="X";

  switchActive(xBtn,oBtn);
});
xBtn.addEventListener("click",function(){

player.man ="X";
player.computer ="O";
player.friend ="O";

switchActive(oBtn,xBtn);
});
playBtn.addEventListener("click",function(){


    if(!OPPONENT){
        computerBtn.style.backgroundColor="#f00";
        friendBtn.style.backgroundColor="#f00";
        return;
    }

    if(!player.man){
        xBtn.style.backgroundColor="#f00";
        oBtn.style.backgroundColor="#f00";
        return;
    }

    init(player,OPPONENT);
    options.classList.add("hide");

});
gameOverElement.addEventListener("click",function(){


});


//Switch active class between two elements 

function switchActive(off,on){
    off.classList.remove("active");
    on.classList.add("active");
}


for(let i = 0; i < 100; i++){
    
console.log("fuck me");
}