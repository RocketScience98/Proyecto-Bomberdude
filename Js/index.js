
window.onload = () => {
    titlescreen()
    document.getElementById('music-button').onclick = () => {
        if(GAMEMUSIC.sound.loop===true){
            GAMEMUSIC.stop()
            GAMEMUSIC.sound.loop = false
        }
        else if(INTROMUSIC.sound.loop===true){
            INTROMUSIC.stop()
            INTROMUSIC.sound.loop = false
        }
        else {INTROMUSIC.playLoop()
            
        }
    }
    document.getElementById('start-button').onclick = () => {
   GAMEMUSIC.playLoop()
      reset()
     createHardwalls()
     createSoftwalls()
     GenerateEnemies()  
      startGame();
      document.getElementById("start-button").disabled = true
     //Se pica start con space
    };
    function startGame() {
        INTROMUSIC.stop()
        let frameId= requestAnimationFrame(startGame);
        borrar();
        document.addEventListener('keydown', keyDown);
        document.addEventListener('keyup', keyUp);
        backgrounddraw()
        //imagenes();
        //myGameArea.score()
        updateWalls()
        Bombermanplayer()
        enemyplayers()
        checkGameOver(frameId);
        checkwin(frameId)
       
    }
};