const borrar = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    }
function Bombermanplayer(){        
    bomberdude.newPos();
    bomberdude.detectWalls(canvas)
    bomberdude.detecthardWalls(hardWalls)
    bomberdude.detecthardWalls(softWalls)
    bomberdude.detecthardWalls(bomberdude.setbombs)
    bomberdude.draw()//envez de updatte
    bomberdude.checkBombs()
    bomberdude.drawbomb()
    hurt(bomberdude,bomberdude.flamas)
    for(let x=0; x<enemies.length;x++){
        hurt(bomberdude,enemies[x].flamas)}
    //die(bomberdude,enemies.flamas)
}
function enemyplayers(){
    moveEnemies(enemies)
    enemyplayerslogic(enemies)
    //enemies[0].update()
    //enemies[0].detectWalls(canvas);
}
function enemyplayerslogic(array){
for(let x=0; x<array.length;x++){
array[x].detectWalls(canvas);
array[x].detecthardWalls(hardWalls);
array[x].detecthardWalls(softWalls);
array[x].detecthardWalls(array[x].setbombs);
array[x].draw();//Envez de update
array[x].drawbomb();
array[x].checkBombs();
flameslogic(bomberdude.flamas,bomberdude.setbombs,array[x].setbombs)
flameslogic(array[x].flamas,bomberdude.setbombs,array[x].setbombs);
bomberdude.drawflames()
array[x].drawflames();
for(let x=0; x<enemies.length;x++){
    hurt(enemies[x],bomberdude.flamas)
    hurt(enemies[x],enemies[x].flamas)}
}     
deadenemy()
}
function reset(){
    bomberdude = new Player(50,50,"Red",0,0)
    enemies = [];
    softWalls=[];
    hardWalls=[];
    INTROMUSIC.stop()
    WONMUSIC.stop()
    LOSTMUSIC.stop() 
    }
function checkGameOver(id){
        if (bomberdude.health===0){
            cancelAnimationFrame(id)
            GAMEMUSIC.stop()
            LOSTMUSIC.playLoop()
            borrar()
            const youloseimg=new Image()
            const sadbomber=new Image()
            youloseimg.src='./images/gameover1/You-Losebanner.jpg'
            sadbomber.src='./images/gameover1/sad-bomberman.png'
            sadbomber.addEventListener('load',()=>{
            context.drawImage(sadbomber,100,50,sadbomber.width*2.5,sadbomber.height*2.5)
            })
            youloseimg.addEventListener('load',()=>{
                context.drawImage(youloseimg,0,0,950,775,0,150,youloseimg.width*.50,youloseimg.height*.50)
                })
            document.getElementById("start-button").disabled = false
            setTimeout(function(){titlescreen();LOSTMUSIC.stop()},5000)
            
        }
    }

function checkwin(id){
        if (enemies.length===0){
            cancelAnimationFrame(id)
            GAMEMUSIC.stop()
            WONMUSIC.playLoop()
            borrar()
            const youwinimg=new Image()
            const happybomber=new Image()
            youwinimg.src='./images/won/youwin.jpg'
            happybomber.src='./images/won/happybomberman.png'
            happybomber.addEventListener('load',()=>{
            context.drawImage(happybomber,375,0,happybomber.width*1.4,happybomber.height*1.4)
            })
            youwinimg.addEventListener('load',()=>{
                context.drawImage(youwinimg,-25,300,youwinimg.width*1.25,youwinimg.height*1.25)
                })
            document.getElementById("start-button").disabled = false
            setTimeout(function(){titlescreen();WONMUSIC.stop()},5000)
            
        }
    }
function GenerateEnemies(){
        numenemies= Math.floor(Math.random()*10)+7
        console.log(numenemies)
        for (let i=0; i<numenemies;i++){
            enemies.push(new enemy(50,50,"pink",canvas.width*Math.random(),canvas.height*Math.random()))
        }
        }
function moveEnemies(array){
           
            for (let i=0; i<array.length;i++){
                if(Math.random()<0.05){
                    array[i].x+=Math.random()*50;
                    array[i].img=rightenemyimg
                }
                else if(Math.random()>0.95){
                    array[i].x-=Math.random()*50
                    array[i].img=leftenemyimg
                }
            }
            for (let i=0; i<array.length;i++){
                if(Math.random()<0.05){
                        array[i].y+=Math.random()*50
                        array[i].img=downenemyimg
                    }
                        
                else if(Math.random()>0.95){
                        array[i].y-=Math.random()*50
                        array[i].img=upenemyimg
                    }
                }
            for (let i=0; i<array.length;i++){
                    if(Math.random()<0.005){
                        array[i].dropBomb()}
                    }
            }
        
function hurt(unit,obj){
            for(j=0;j<obj.length;j++){
                if(obj[j].crashWith(unit)){
                    unit.health=0
                    //console.log("hurt")     
                              }
                        } 
                 }   
function deadenemy(){
            for(let j=0;j<enemies.length;j++){
                if(enemies[j].health===0){
                    enemies.splice(j,1)
                    //console.log("dead") 
                }
            }
        }
        function createHardwalls() {
   
            rectsize=50
            let gap = bomberdude.width*2;
          
            for (let i=0;i<canvas.width/((rectsize+gap));i++) {
                for(let j= 0; j<Math.floor(canvas.height/(rectsize+gap));j++){
                     //                              w    h  c x   y   dx  speed
                   hardWalls.push(new Hardwall(rectsize,rectsize,'green',rectsize*i+gap*i+gap,rectsize*j+gap*j+gap));
                }
                }
        }
        function createSoftwalls() {
            rectsize=50
            let gap = bomberdude.width*2;
            let extra = 25;
            let rnd1 = [];
            let rnd2 = [];
          
            for (let i=0;i<canvas.width/((rectsize+gap)/2.5);i+=1) {
                for(let j= 0; j<canvas.height/((rectsize+gap)/2.4);j+=1){
                    rnd1.push(Math.random)
                    //console.log(Math.random)
                    if(Math.random()>=.5){softWalls.push(new Softwall(rectsize,rectsize,'yellow',rectsize*i+gap*i+extra,rectsize*j+gap*j+extra))}
                    else if(Math.random()>=.75){softWalls.push(new Softwall(rectsize,rectsize,'orange',rectsize*i+gap*i+gap,extra+rectsize*j+gap*j))}
                    else if(Math.random()>=0){softWalls.push(new Softwall(rectsize,rectsize,'purple',rectsize*i+gap*i+extra,rectsize*j+gap*j+gap))}
                    //                              w    h  c x   y   dx  speed
        
                }
                }
        }
function updateWalls() {
            for (let i = 0; i < hardWalls.length; i++) {
              hardWalls[i].draw();//enves de update
          }
             for (let i = 0; i < softWalls.length; i++){
             softWalls[i].draw();  // enves de update
             }
        }
        
        
function flameslogic(obj,array1,array2){
            //esto debe quitar flamas si colisionan con hardwalls
        for (i=0;i<hardWalls.length;i++){
                for(j=0;j<obj.length;j++){
                     if(obj[j].crashWith(hardWalls[i])){
                         obj.splice(j,1)     
                          }
                    } 
             }
        //Esto quita las paredes suaves si la flama colisiona
        for (i=0;i<softWalls.length;i++){
               for(j=0;j<obj.length;j++){
                    if(obj[j].crashWith(softWalls[i])){
                        softWalls.splice(i,1)     
                         }
                   } 
            }
        //Esto explota otras bombas del mismo
        for (i=0;i<array1.length;i++){
                for(j=0;j<obj.length;j++){
                     if(obj[j].crashWith(array1[i])){
                         array1[i].counter=0     
                          }
                    } 
             }
        //esto explota otras bombas del otro
        for (i=0;i<array2.length;i++){
            for(j=0;j<obj.length;j++){
                if(obj[j].crashWith(array2[i])){
                         array2[i].counter=0     
                          }
                    } 
             }
}
function backgrounddraw(){
    let backtilepattern= context.createPattern(backtileimg,"repeat")
    context.rect(0,0,canvas.width,canvas.height)
    context.fillStyle=backtilepattern;
    context.fill();
}

function titlescreen(){
    context.drawImage(startmenuimg,0,0,canvas.width,canvas.height)
   context.drawImage(oneplayerimg,canvas.width/2-oneplayerimg.width*1.5, canvas.height/4-oneplayerimg.height,oneplayerimg.width*3,oneplayerimg.height*3)
    setTimeout(function(){INTROMUSIC.play()},5000)
}