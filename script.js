
score = 0;
cross = true;
audio=new Audio ('music.mp3')
audiogo=new Audio ("gameover.mp3")
setTimeout(()=>{
    audio.play()
},1000);



document.onkeydown = function (e) {
    console.log("Key is:", e.key); // Displays the key pressed
    console.log("Code is:", e.code);

    const boy = document.querySelector(".boy"); // Define the boy element once, outside the if blocks

    if (e.code === "ArrowUp") {
        // Trigger the jump animation
        boy.classList.add("animateboy");
        setTimeout(() => {
            boy.classList.remove("animateboy");
        }, 700);
    }

    if (e.code === "ArrowRight") {
        // Move the boy to the right
        let boyX = parseInt(window.getComputedStyle(boy, null).getPropertyValue('left'));
        boy.style.left = boyX + 112 + "px";
    }

    if (e.code === "ArrowLeft") {
        // Move the boy to the left
        let boyX = parseInt(window.getComputedStyle(boy, null).getPropertyValue('left'));
        boy.style.left = (boyX - 112) + "px"; // Corrected the calculation
    }
};


setInterval(() => {
    // Selecting elements
    const boy = document.querySelector(".boy");
    const gameover = document.querySelector(".gameover");
    const obstacle = document.querySelector(".obstacle");

    // Getting the position of the boy
    const bx = parseInt(window.getComputedStyle(boy, null).getPropertyValue('left'));
    const by = parseInt(window.getComputedStyle(boy, null).getPropertyValue('top'));

    // Getting the position of the obstacle
    const ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    const oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    // Calculating offsets
    const offsetX = Math.abs(bx - ox); // Corrected to calculate horizontal distance
    const offsetY = Math.abs(by - oy); // Corrected to calculate vertical distance
    console.log(offsetX, offsetY);

    // Collision detection
    if (offsetX < 73 && offsetY < 54) {
        gameover.innerHTML="GAME OVER  - Reload to play again " // Show the game over message
        obstacle.classList.remove("obstacleani"); // Stop the obstacle animation
        audiogo.play();;
        setTimeout(()=>{
      audiogo.pause();
      audio.pause();
        },1000)
    }
    else if (offsetX < 145 && cross) {
        score += 1;
        updatescore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            anidur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = anidur - 0.3 ;
            obstacle.style.animationDuration = newDur + 'S';
        },500);
    }
}, 10);

function updatescore(score) {
    scorecont.innerHTML = "Your score :" + score
}
