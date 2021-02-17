var canvas;
var ctx;
var FPS = 50;

var anchoF = 50;
var altoF = 50;

var cesped = '#34c61f';
var agua = '#4286f4';
var tierra ='#c6892f';
var llave = 'yellow';
var colorProta ='#820c01';
var puerta ='black';

var imagenAntorcha;


var tileMap;

var enemigo = [];

var camara;
var camara2;

var anchoEscenario = 20;
var altoEscenario = 25;

var escenario = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,2,2,0,0,0,2,2,2,2,0,0,2,2,2,2,2,2,2,2,2,2,2,2,0],
    [0,0,2,2,2,2,2,2,0,2,0,0,2,2,0,0,0,2,0,0,2,0,0,0,0],
    [0,0,2,0,0,2,2,2,0,2,2,2,2,2,0,0,0,0,0,0,2,2,2,0,0],
    [0,0,2,2,2,0,2,2,0,0,2,2,2,0,0,0,2,2,2,2,2,0,2,0,0],
    [0,2,2,0,0,0,0,2,0,0,0,2,0,0,0,0,2,0,0,2,0,0,2,0,0],
    [0,0,2,0,0,0,2,2,2,0,0,2,2,2,0,0,2,0,0,0,0,0,2,0,0],
    [0,2,2,2,0,0,2,0,0,2,2,2,2,2,2,2,2,0,0,2,2,0,2,0,0],
    [0,2,2,3,0,0,2,0,0,1,2,2,2,2,0,0,0,0,2,2,2,2,2,0,0],
    [0,2,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,2,0,0,0],
    [0,2,2,2,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,2,0,0,0],
    [0,2,0,2,2,2,0,0,0,0,0,2,2,2,2,0,0,0,0,0,2,2,2,0,0],
    [0,2,0,2,2,2,0,0,0,0,0,2,0,0,2,0,0,0,0,0,2,2,2,0,0],
    [0,2,0,0,0,2,0,0,0,0,0,2,0,0,2,0,0,0,0,0,0,2,0,0,0],
    [0,2,0,0,0,2,0,0,0,0,0,2,0,0,2,2,0,0,2,0,0,2,0,0,0],
    [0,2,2,2,0,2,0,0,0,0,0,2,0,0,2,2,0,0,2,0,0,2,0,0,0],
    [0,2,0,2,0,0,0,0,0,0,0,2,0,0,2,2,0,0,2,0,0,2,0,0,0],
    [0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,2,2,2,2,0,0,2,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  ];

var objCamara = function(x,y,tamX,tamY,posX,posY){
    this.x = x;
    this.y = y;

    this.tamX = tamX;
    this.tamY = tamY;

    this.posX = posX;
    this.posY = posY;
    
    this.dibuja = function(){
        for(y=this.y;y<(this.tamY+this.y);y++){
            for(x=this.x;(x<this.tamX+this.x);x++){
                var tile = escenario[y][x];
                ctx.drawImage(tileMap,tile*32,0,32,32,anchoF*(x-this.x + this.posX),altoF*(y-this.y + this.posY),anchoF,altoF);
            }
        }
    }

    this.arriba = function(){
        if(this.y>0){
            this.y--;
        }
    }
    this.abajo = function(){
        if(this.y< altoEscenario - this.tamY){
            this.y++;
        }
    }
    this.izquierda = function(){
        if(this.x>0){
            this.x--;
        }
    }

    this.derecha = function(){
        if(this.x<anchoEscenario-this.tamX){
            this.x++;
        }
    }

}

function dibujaEscenario(){
    var color;
    for(y=0;y<10;y++){
        for(x=0;x<20;x++){
            var tile = escenario[y][x];
            ctx.drawImage(tileMap,tile*32,0,32,32,anchoF*x,altoF*y,anchoF,altoF);

        }
    }
}

var antorcha = function(x,y){
    this.x = x;
    this.y = y;

    this.fotograma = 0;

    this.retraso = 10;
    this.contador = 0;
  

    this.cambiaFotograma = function(){
        //console.log('ehhh');
        if(this.fotograma<3){
            this.fotograma++;
        }else{
            this.fotograma =0;
        }
    }

    this.dibuja = function(){
        
        if(this.contador < this.retraso){
            this.contador++;
        }else{
            this.contador = 0;
            this.cambiaFotograma();
        }
        //console.log(this.contador);

        ctx.drawImage(tileMap,this.fotograma*32,64,32,32,anchoF*x,altoF*y,anchoF,altoF);
    }    
}


var malo = function(x,y){
    this.x = x;
    this.y = y;
    this.retraso =50;
    this.fotograma = 0;

    this.direccion = Math.floor(Math.random()*4);
    console.log('enemigo creado');

    this.dibuja = function(){
        ctx.fillStyle = this.color;
        
        ctx.drawImage(tileMap,0,32,32,32,this.x*anchoF, this.y*altoF, anchoF,altoF);
    }

    this.compruebaColision = function(x,y){
        var colisiona = false;
        if(escenario[y][x]==0){
            colisiona = true;
        }
        return colisiona;
    }

    this.mueve = function(){

        protagonista.colisionEnemigo(this.x, this.y);

        if(this.contador < this.retraso){
            this.contador ++;
        }else{
            this.contador = 0;
            if(this.direccion == 0){
                if(this.compruebaColision(this.x, this.y-1)==false){
                    this.y--;
                }
            }else{
                this.direccion = Math.floor(Math.random()*4);
            }

            if(this.direccion == 1){
                if(this.compruebaColision(this.x, this.y+1)==false){
                    this.y++;
                }
            }else{
                this.direccion = Math.floor(Math.random()*4);
            }

            if(this.direccion == 2){
                if(this.compruebaColision(this.x-1, this.y)==false){
                    this.x--;
                }
            }else{
                this.direccion = Math.floor(Math.random()*4);
            }

            if(this.direccion == 3){
                if(this.compruebaColision(this.x+1, this.y)==false){
                    this.x++;
                }
            }else{
                this.direccion = Math.floor(Math.random()*4);
            }
        }
    }

}

var jugador = function(){
    this.x = 1;
    this.y = 1;
    this.color = '#820c01';
    this.velocidad=1;
    this.jugador = false;

    this.dibuja = function(){
        ctx.fillStyle = this.color;
        
        ctx.drawImage(tileMap,32,32,32,32,this.x*anchoF, this.y*altoF, anchoF,altoF);
    }

    this.colisionEnemigo = function(x,y){
        if(this.x == x && this.y == y){
            this.muerte();
        }
    }

    this.margenes = function(x,y){
        var colision= false;
        //console.log(escenario[y][x]);
        if(escenario[y][x]==0){
            colision = true;
        }
        return colision;
    }

    this.arriba = function(){
        if(this.margenes(this.x,this.y-1)==false){
            this.y -= this.velocidad;
            this.logicaObjetos();
        }
    }

    this.abajo = function(){
        if(this.margenes(this.x,this.y+1)==false){
            this.y += this.velocidad;
            this.logicaObjetos();
        }
    }
    this.izquierda = function(){
        if(this.margenes(this.x-1,this.y)==false){
            this.x -= this.velocidad;
            this.logicaObjetos();
        }
    }
    this.derecha = function(){

        if(this.margenes(this.x+1,this.y)==false){
            this.x += this.velocidad;
            this.logicaObjetos();
        }
    }

    this.victoria = function(){
        this.x = 2;
        this.y = 2;
        this.llave = false;
        escenario[8][17] = 3;

    }

    this.muerte = function(){
        console.log('Has perdido');
        this.x = 2;
        this.y = 2;
        this.llave = false;
        escenario[8][17] = 3;

    }

    this.logicaObjetos= function(){
        var objeto = escenario[this.y][this.x];
        if(objeto==3){
            this.llave = true;
            escenario[this.y][this.x]=2;
            console.log('Tines la llave');
        }

        if(  objeto == 1){
            if(this.llave){
                console.log('has ganado');
                this.victoria();
            }else{
                console.log('Te falta la llave');
            }
        }
    }


}

var protagonista;

function init(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    tileMap = new Image();
    tileMap.src = 'img/tilemap.png';

    camara = new objCamara(2,2,5,5,1,1);
    camara2 = new objCamara(3,4,4,6,8,2);

    protagonista = new jugador();

    imagenAntorcha = new antorcha(0,0);

    enemigo.push(new malo(3,7));
    enemigo.push(new malo(7,3));
    enemigo.push(new malo(6,6));

    document.addEventListener('keydown',function(tecla){

        //up
        if(tecla.keyCode == 38){
            protagonista.arriba();
            camara.arriba();
            camara2.arriba();
        }
    
        //down
        if(tecla.keyCode == 40){
            protagonista.abajo();
            camara.abajo();
            camara2.abajo();
        }
    
        //left
        if(tecla.keyCode == 37){
            protagonista.izquierda();
            camara.izquierda();
            camara2.izquierda();
        }
    
        //rigth
        if(tecla.keyCode == 39){
            protagonista.derecha();
            camara.derecha();
            camara2.derecha();
        }
    
    });

    setInterval(function(){
        principal();
    },1000/FPS);
}

function borrarCanvas(){
    canvas.width =1000;
    canvas.height =500;
}

function principal(){
    borrarCanvas();
    //dibujaEscenario();
    camara.dibuja();
    camara2.dibuja();
    //protagonista.dibuja();
    //imagenAntorcha.dibuja();

    /*for(c=0; c<enemigo.length;c++){
        enemigo[c].mueve();
        enemigo[c].dibuja();
    }*/
}