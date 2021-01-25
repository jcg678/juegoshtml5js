var canvas;
var ctx;
var FPS = 50;
var imgRex;

function init(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');


    imgRex = new Image();
    imgRex.src = 'img/prota.png';


    setInterval(function(){
        principal();
    },1000/FPS);
}


var Protagonista = function(x,y){
    this.x=x;
    this.y=y;
    this.velocidad= 3;
    
    this.dibuja = function(){
        ctx.drawImage(imgRex,this.x,this.y);    
    }

    this.arriba = function(){
        this.y -= this.velocidad;
    }

    this.abajo = function(){
        this.y += this.velocidad;
    }
    this.izquierda = function(){
        this.x -= this.velocidad;
    }
    this.derecha = function(){
        this.x += this.velocidad;
    }

    this.texto = function(){
        ctx.font = '30px impact';
        ctx.fillStyle= '#555555';
        ctx.fillText('X:'+this.x, 100, 100);
    }

}

var Personaje = function(x,y){
    this.x=x;
    this.y=y;
    this.derecha = true;

    this.dibuja = function(){
        ctx.fillStyle = '#FF0000';
        ctx.fillRect(this.x,this.y,50,50);
    }

    this.mueve = function(velocidad){
        if(this.derecha == true){
            if(this.x<400){
                this.x+=velocidad;
            }else{
                this.derecha= false;
            }
        }
        if(this.derecha == false){
            if(this.x>10){
                this.x-=velocidad;
            }else{
                this.derecha= true;
            }
        }


    }
}

document.addEventListener('keydown',function(tecla){

    //up
    if(tecla.keyCode == 38){
        prota.arriba();
    }

    //down
    if(tecla.keyCode == 40){
        prota.abajo();
    }

    //left
    if(tecla.keyCode == 37){
        prota.izquierda();
    }

    //rigth
    if(tecla.keyCode == 39){
        prota.derecha();
    }

});

var per1 = new Personaje(10,100);
var per2 = new Personaje(10,200);
var per3 = new Personaje(10,270);
var prota = new Protagonista(200,200);




function borrarCanvas(){
    canvas.width =500;
    canvas.height =400;
}

function principal(){
    borrarCanvas();
    per1.dibuja();
    per2.dibuja();
    per3.dibuja();
    per1.mueve(5);
    per2.mueve(6);
    per3.mueve(3);
    prota.dibuja();
    prota.texto();
}

