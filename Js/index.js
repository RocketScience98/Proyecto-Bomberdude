
window.onload = () => {   
    document.getElementById('start-button').onclick = () => {
     // reset()
     createHardwalls()
     createSoftwalls()  
      startGame();
      document.getElementById("start-button").disabled = true
     //Se pica start con space
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
        updateWalls()
        bomberdude.newPos();
        bomberdude.detectWalls(canvas)
        bomberdude.detecthardWalls(hardWalls)
        bomberdude.detecthardWalls(softWalls)
        bomberdude.detecthardWalls(bomberdude.setbombs)
        bomberdude.update()
        bomberdude.drawbomb()
        bomberdude.checkBombs()
        // bomber dude flames check
        flamas(bomberdude.flamas)
        bomberdude.drawflames()
        //bomberdude.flamas.explodesoftWalls(softWalls)
        let frameId= requestAnimationFrame(startGame);
        
        //let frameId=setTimeout(function(){requestAnimationFrame(startGame); }, 100)
        
            //checkGameOver(frameId);
    }
};