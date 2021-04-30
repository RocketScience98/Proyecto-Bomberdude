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
            this.bottom() <= obstacle.top() ||
            this.top() >= obstacle.bottom() || 
            this.right() <= obstacle.left() || 
            this.left() >= obstacle.right());
      }
    update() {  // GENERA UNA FIGURA COLOR ROJO
      context.fillStyle = this.color;
      context.fillRect(this.x, this.y, this.width, this.height);
    }

    draw(){
        context.drawImage(this.img,this.x,this.y,this.width,this.height)
    }
    detectWalls = (obj) => {
        if (this.x < 0) {
            this.x = 0;
        }
        else if ((this.x + this.width) > obj.width) {
            this.x = (obj.width - this.width-5);
        }
        else if (this.y < 0) {
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
                    return this.x=obj[i].x-this.width-10}
                if ((this.x)>(obj[i].x)){
                    return this.x=obj[i].x+obj[i].width+10}
                // Base de cubo con techo objeto
               if((this.y+this.height)>(obj[i].y)){
                    return this.y=obj[i].y-this.height-10}
                if((this.y)>=(obj[i].y+obj[i].height/3)){
                    return this.y=obj[i].y+obj[i].height+10}
                
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
class Hardwall extends Component{
    constructor(width,height,color,x,y){
        super(width,height,x,y)
 this.x=x;
 this.y=y;
 this.width=width
 this.height=height
 this.color=color
    }
    img = hardwallimg
}

class Softwall extends Component{
    constructor(width,height,color,x,y){
        super(width,height,x,y)
 this.x=x;
 this.y=y;
 this.width=width
 this.height=height
 this.color=color
    }
    img = softwallimg
}
class Player extends Component{
    constructor(width,height,color,x,y){
        super(width,height,x,y)
 this.x=x;
 this.y=y;
 this.width=width
 this.height=height
 this.color=color
    }
    img = downbomberimg
    availablebombs=2;
    poder=1;
    health=1;
    flamas=[];
    setbombs=[];  
 moveRight = () => {
        this.dx = this.speed;
        this.img= rightbomberimg;
        STEPSOUND.cloneNode(true).play()
    }
moveLeft = () => {
  
        this.dx -= this.speed;
        this.img = leftbomberimg;
        STEPSOUND.cloneNode(true).play()
    }
moveUp = () => {
        
        this.dy -= this.speed;
        this.img= upbomberimg;
        STEPSOUND.cloneNode(true).play()
    }
moveDown = () => {
     
        this.dy = this.speed;
        this.img = downbomberimg;
        STEPSOUND.cloneNode(true).play()
    }
newPos() { // new Position del jugador o del obstáculo
        this.x += this.dx;
        this.y += this.dy;
    }
dropBomb =()=>{if(this.setbombs.length<this.availablebombs){
        this.setbombs.push(new bombclass(Math.floor(((this.x+1)/75))*75+25,Math.floor(((this.y+1)/75))*75+25))
        DROPBOMBSOUND.cloneNode(true).play();    
    }
          }
drawbomb(){
            for(let i=0; i<this.setbombs.length;i++){
                this.setbombs[i].draw()
                //this.setbombs[i].update()
        
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
            else if(this.setbombs[i].clock<=0){
                for(let j=-this.poder; j<=this.poder;j++){
                this.flamas.push(new Flamas(this.setbombs[i].x+bombsize*j+25*j,this.setbombs[i].y,'purple'))
                this.flamas.push(new Flamas(this.setbombs[i].x,this.setbombs[i].y+bombsize*j+25*j,'purple'))
                }
                this.setbombs.splice(i,1)
                EXPLODEBOMBSOUND.cloneNode(true).play();
            }
            }}
drawflames(){
        for(let i=0; i<this.flamas.length; i++){  
            if(this.flamas[i].clock>0){
                //this.flamas[i].update()
                this.flamas[i].draw()
                this.flamas[i].clock-=1}
        
            else if (this.flamas[i].clock>=0){
                this.flamas.splice(i,1)
                        }
            }}
 }

 class enemy extends Player{
    constructor(width,height,color,x,y){
        super(width,height,x,y)
 this.x=x;
 this.y=y;
 this.width=width
 this.height=height
 this.color=color
    }
    img = downenemyimg
    //Image position made in movement 
 }

class bombclass extends Component{
   constructor(x,y){
       super(x,y)
this.x=x;
this.y=y;

   }
   clock=180;
   color="green";
   width=50;
   height=50;
   radius=15;
   img = bombasimg
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
img = flamasimg
 }

   //clase Musica
   class sounds {
    constructor(src) {
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";

        document.body.appendChild(this.sound);
        this.play = function () {
            this.sound.play();
        };
        this.playLoop = function () {
            this.sound.play();
            this.sound.loop = true;
        };
        this.stop = function () {
            this.sound.pause();
            this.sound.currentTime = 0;
        };


    }
}
new Audio
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
    //Carga de Imagenes
  //bomberdude images
  let upbomberimg = new Image()
  let downbomberimg =new Image()
  let rightbomberimg =new Image()
  let leftbomberimg =new Image()
  upbomberimg.src= './images/Bomberman/Bman_Up.png'
  downbomberimg.src= './images/Bomberman/Bman_Down.png'
  rightbomberimg.src= './images/Bomberman/Bman_Right.png'
  leftbomberimg.src = './images/Bomberman/Bman_Left.png'
//enemy images
let upenemyimg = new Image()
let downenemyimg =new Image()
let rightenemyimg =new Image()
let leftenemyimg =new Image()
upenemyimg.src= './images/Enemy/Creep_Up.png'
downenemyimg.src= './images/Enemy/Creep_Down.png'
rightenemyimg.src= './images/Enemy/Creep_Right.png'
leftenemyimg.src = './images/Enemy/Creep_Left.png'
//Paredes
let hardwallimg = new Image()
hardwallimg.src = './images/Block/SolidBlock.png'
let softwallimg= new Image()
softwallimg.src = './images/Block/ExplodableBlock.png'
//Bombas
let bombasimg = new Image()
bombasimg.src = './images/Bombs/Bomb_f01.png'
//Flamas
let flamasimg = new Image()
flamasimg.src = "./images/Flame/Flame_f00.png"

//let bomberdude = new Player(50,50,"Red",0,0)
  let enemies = [];
//Background tile
let backtileimg= new Image()
backtileimg.src = "./images/Block/BackgroundTile.png"
//Startmenuimg
let startmenuimg = new Image()
startmenuimg.src = "./images/Startbackground/title_background.jpg"
let oneplayerimg= new Image()
oneplayerimg.src = "./images/Startbackground/One_Player_Normal.png"


//MUSIC
let INTROMUSIC=new sounds("./sounds/intro.mp3")
let WONMUSIC = new sounds("./sounds/win.wav")
let GAMEMUSIC = new sounds("./sounds/music.wav")
let LOSTMUSIC = new sounds("./sounds/totalfail.wav")

//SONIDOS - AUDIO
let STEPSOUND = new Audio("./sounds/step.wav")
let DROPBOMBSOUND = new Audio("./sounds/Drop.wav")
let EXPLODEBOMBSOUND = new Audio("./sounds/Explosion.mp3")