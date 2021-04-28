const canvas = document.getElementById('my-canvas');
const context = canvas.getContext('2d');

class Component {
    constructor(width, height, color, x, y) {
        this.width = width;
        this.height = height;
        this.color = color;
        this.x = x;
        this.y = y;
        this.dx = 0;
        this.dy = 0;
        this.speed = 10;
      }
      setbombs=[];
      availablebombs=2;
      poder=1;
      flamas=[];
      left() {
        return this.x;
      }
      right() {
        return this.x + this.width;
      }
      top() {
        return this.y;
      }
      bottom() {
        return this.y + this.height;
      }
      crashWith(obstacle) {    
        return !(
            this.bottom() < obstacle.top() ||
            this.top() > obstacle.bottom() || 
            this.right() < obstacle.left() || 
            this.left() > obstacle.right());
      }
    update() {  // GENERA UNA FIGURA COLOR ROJO
      context.fillStyle = this.color;
      context.fillRect(this.x, this.y, this.width, this.height);
    }
 
    newPos() { // new Position del jugador o del obstáculo
        this.x += this.dx;
        this.y += this.dy;
    }
    moveRight = () => {
        this.dx = this.speed;
    }
    moveLeft = () => {
  
        this.dx -= this.speed;
    }
    moveUp = () => {
        
        this.dy -= this.speed;
    }
    moveDown = () => {
     
        this.dy = this.speed;
    }
 
  dropBomb =()=>{if(this.setbombs.length<this.availablebombs){
this.setbombs.push(new bombclass(Math.floor(((this.x+1)/75))*75+25,Math.floor(((this.y+1)/75))*75+25))
console.log(this.x)
console.log(Math.floor(((this.x+1)/75))*75+25)
}
  }
  drawbomb(){
    for(let i=0; i<this.setbombs.length;i++){
        this.setbombs[i].update()
    /*context.beginPath();
    context.arc(this.setbombs[i].x, this.setbombs[i].y, this.setbombs[i].radius, 0, 2 * Math.PI, false);
    context.fillStyle = 'green';
    context.fill();
    context.lineWidth = 5;
    context.strokeStyle = '#003300';
    context.stroke();*/
}
}
checkBombs(){
    //Debe llamar las bombas
    let bombsize=50;
    let extra = 7.5;
    for(let i=0; i<this.setbombs.length; i++){
        if(this.setbombs[i].clock>0){
       this.setbombs[i].clock -= 1;
//Aqui se debe sustituir el draw
       }
    else if(this.setbombs[i].clock===0){
        for(let j=-this.poder; j<=this.poder;j++){
        this.flamas.push(new Flamas(this.setbombs[i].x+bombsize*j+25*j,this.setbombs[i].y,'purple'))
        this.flamas.push(new Flamas(this.setbombs[i].x,this.setbombs[i].y+bombsize*j+25*j,'purple'))
        }
        this.setbombs.splice(i,1)
    }
    }}
drawflames(){
for(let i=0; i<this.flamas.length; i++){  
    if(this.flamas[i].clock>0){
        this.flamas[i].update()
        this.flamas[i].clock-=1}

    else if (this.flamas[i].clock>=0){
        this.flamas.splice(i,1)
                }
    }}

    detectWalls = (obj) => {
        if (this.x <= 0) {
            this.x = 0;
        }
        else if ((this.x + this.width) > obj.width) {
            this.x = (obj.width - this.width-5);
        }
        else if (this.y <= 0) {
            this.y = 0;
        }
        else if ((this.y + this.height) > obj.height) {
            this.y = (obj.height - this.height);
        }
    }
    detecthardWalls = (obj) => {
        for(let i=0; i<obj.length;i++){
            if (((this.x + this.width) >= obj[i].x) &&
            ((this.x) <= obj[i].width+obj[i].x) &&
            ((this.y+this.height)>=obj[i].y) &&
            ((this.y)<=(obj[i].y+obj[i].height)))
            {
                //pared derecha cubo, pareded izq objeto +obj[i].width
                if ((this.x+this.width)<(obj[i].x+obj[i].width)){
                    return this.x=obj[i].x-this.width-5}
                else if ((this.x)>(obj[i].x)){
                    return this.x=obj[i].x+obj[i].width+1}
                // Base de cubo con techo objeto
               /* else if((this.y+this.height)>(obj[i].y)){
                    return this.y=obj[i].y-this.height-5}*/
                /*else if((this.x)>(obj[i].x+obj[i].width/2)){
                    return this.x=obj[i].x+obj[i].width+1}
                else if((this.y)<=(obj[i].y+obj[i].height/2)){
                    return this.y=obj[i].y+obj[i].height+1}*/
                
            }
        }
}
 detectcollision = (obj) => {
        for(let i=0; i<obj.length;i++){
            if (((this.x + this.width) >= obj[i].x) &&
            ((this.x) <= obj[i].width+obj[i].x) &&
            ((this.y+this.height)>=obj[i].y) &&
            ((this.y)<=(obj[i].y+obj[i].height)))
            {return true}
            else false
        }
}

}
class bombclass extends Component{
   constructor(x,y){
       super(x,y)
this.x=x;
this.y=y;

   }
   clock=240;
   color="green";
   width=50;
   height=50;
   radius=15;
}

class Flamas extends Component{
    constructor(x,y,color){
        super(x,y, color)
 this.x=x;
 this.y=y;
 this.color=color;
    }
clock=120;
width= 50;
height = 50; 
 }
const keyDown = (event) => {
       switch (event.key) {
        case "ArrowRight":
        case "d":
        case "D":
            bomberdude.moveRight();
            break;
        case "ArrowLeft":
        case "a":
        case "A":
            bomberdude.moveLeft();
            break;
        case "ArrowUp":
        case "w":
        case "W":
            bomberdude.moveUp();
            break;
        case "ArrowDown":
        case "s":
        case "S":
            bomberdude.moveDown();
            break;
        case " ":
           bomberdude.dropBomb();
            break;
        default:
            return;
    }
}
const keyUp = () => {
    bomberdude.dx = 0;
    bomberdude.dy = 0;
}

let hardWalls=[];
let softWalls=[];
let bombs = [];
function createHardwalls() {
    console.log(createHardwalls)
    rectsize=50
    let gap = bomberdude.width*2;
  
    for (let i=0;i<canvas.width/((rectsize+gap));i++) {
        for(let j= 0; j<Math.floor(canvas.height/(rectsize+gap));j++){
             //                              w    h  c x   y   dx  speed
           hardWalls.push(new Component(rectsize,rectsize,'green',rectsize*i+gap*i+gap,rectsize*j+gap*j+gap));
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
            if(Math.random()>=.5){softWalls.push(new Component(rectsize,rectsize,'yellow',rectsize*i+gap*i+extra,rectsize*j+gap*j+extra))}
            else if(Math.random()>=.75){softWalls.push(new Component(rectsize,rectsize,'orange',rectsize*i+gap*i+gap,extra+rectsize*j+gap*j))}
            else if(Math.random()>=0){softWalls.push(new Component(rectsize,rectsize,'purple',rectsize*i+gap*i+extra,rectsize*j+gap*j+gap))}
            //                              w    h  c x   y   dx  speed

        }
        }
}
function updateWalls() {
    for (let i = 0; i < hardWalls.length; i++) {
      hardWalls[i].update();
  }
     for (let i = 0; i < softWalls.length; i++){
     softWalls[i].update();  
     }
}


function flamas(obj){
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

   }
    


let bomberdude = new Component(48,48,"Red",0,0)
const myGameArea = {
    frames: 0,
    /*score: function () {
        const points = Math.floor(this.frames / 5);
        context.font = '40px serif';
        context.fillStyle = 'white';
        context.fillText(`Score: ${points}`, 75, 50);
    },
    */
  };    
