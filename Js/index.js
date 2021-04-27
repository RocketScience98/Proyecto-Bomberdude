
window.onload = () => {   
    document.getElementById('start-button').onclick = () => {
     // reset()
     createHardwalls()
      createSoftwalls()  
      startGame();
      
    };
    function startGame() {
        borrar();
        document.addEventListener('keydown', keyDown);
        document.addEventListener('keyup', keyUp);
        //backgroundImage.move();
        //backgroundImage.draw();
        //imagenes();
        //updateObstacles();
        //myGameArea.score()
        updateHardWalls()
        bomberdude.newPos();
        bomberdude.detectWalls(canvas)
        bomberdude.detecthardWalls(hardWalls)
        bomberdude.update()
        drawbomb()
        let frameId= requestAnimationFrame(startGame);
        
        //let frameId=setTimeout(function(){requestAnimationFrame(startGame); }, 100)
        
            //checkGameOver(frameId);
    }
};