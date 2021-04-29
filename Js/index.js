
window.onload = () => {   
    document.getElementById('start-button').onclick = () => {
     reset()
     createHardwalls()
     createSoftwalls()
     GenerateEnemies()  
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
        Bombermanplayer()
        enemyplayers()
        // bomber dude flames check
        let frameId= requestAnimationFrame(startGame);
        
        //let frameId=setTimeout(function(){requestAnimationFrame(startGame); }, 100)
        
        checkGameOver(frameId);
        checkwin(frameId)
    }
};