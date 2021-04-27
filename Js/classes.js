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
this.setbombs.push(new bombclass(this.x+this.width/2,this.y+this.height/2))
}
  }

    detectWalls = (obj) => {
        if (this.x <= 0) {
            this.x = 0;
        }
        else if ((this.x + this.width) > obj.width) {
            this.x = (obj.width - this.width);
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
                if ((this.x+this.width)<(obj[i].x+obj[i].width)){
                    return this.x=obj[i].x-this.width-1}
                else if((this.x)>(obj[i].x+obj[i].width)/3){
                    return this.x=obj[i].x+obj[i].width+1}
                else if((this.y+this.height)<(obj[i].y+obj[i].height)){
                        return this.y=obj[i].y-this.height-1}
                else if((this.y)>(obj[i].y+obj[i].height)/3){
                        return this.y=obj[i].y+obj[i].height+1}
                
            }
        }
}
}
class bombclass extends Component{
   constructor(x,y){
       super(x,y)
this.x=x;
this.y=y;
   }
   radius= 25/2;
   timer=10; 
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
    rectsize=50
    let gap = bomberdude.width+15;
  
    for (let i=0;i<canvas.width/((rectsize)*2.5);i++) {
        for(let j= 0; j<Math.floor(canvas.height/(rectsize*2.4));j++){
             //                              w    h  c x   y   dx  speed
           hardWalls.push(new Component(rectsize,rectsize,'green',rectsize*i+gap*i+gap,rectsize*j+gap*j+gap));
        }
        }
}
function createSoftwalls() {
    rectsize=50
    let gap = bomberdude.width+15;
    let extra = 15;
    let rnd1 = [];
    let rnd2 = [];
  
    for (let i=0;i<canvas.width/((rectsize+gap)/2.5);i+=1) {
        for(let j= 0; j<canvas.height/((rectsize+gap)/2.4);j+=1){
            rnd1.push(Math.random)
            console.log(Math.random)
            if(Math.random>=0.5){softWalls.push(new Component(rectsize,rectsize,'yellow',rectsize*i+gap*i+extra/2,rectsize*j+gap*j))
        }
            
            //softWalls.push(new Component(rectsize,rectsize,'orange',rectsize*i+gap*i+gap,rectsize*j+gap*j))
            //softWalls.push(new Component(rectsize,rectsize,'purple',rectsize*i+gap*i+extra/2,rectsize*j+gap*j+gap))
            //                              w    h  c x   y   dx  speed

        }
        }
}
function updateHardWalls() {
    for (let i = 0; i < hardWalls.length; i++) {
      hardWalls[i].update();
  }
     for (let i = 0; i < softWalls.length; i++){
     softWalls[i].update();  
     }
}
function drawbomb(){
    for(let i=0; i<bomberdude.setbombs.length;i++){
    context.beginPath();
    context.arc(bomberdude.setbombs[i].x, bomberdude.setbombs[i].y, bomberdude.setbombs[i].radius, 0, 2 * Math.PI, false);
    context.fillStyle = 'green';
    context.fill();
    context.lineWidth = 5;
    context.strokeStyle = '#003300';
    context.stroke();}
}

function explodeBombs(){


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
