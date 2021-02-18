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

var escenario =[
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,2,2,0,0,0,2,2,0,0,2,0,0,0,0,0,2,2,1,0],
    [0,0,2,2,2,2,2,0,0,0,2,0,0,0,0,2,2,2,0,0],
    [0,2,2,0,0,0,2,2,2,2,2,0,2,2,2,2,0,0,0,0],
    [0,2,2,0,0,0,0,2,0,0,2,0,2,0,0,2,0,0,0,0],
    [0,2,2,2,0,0,2,2,0,0,2,2,2,0,0,2,2,0,0,0],
    [0,0,2,0,0,2,2,2,0,0,0,0,2,0,0,2,0,0,0,0],
    [0,2,2,0,0,0,2,2,0,0,0,2,2,0,0,2,2,2,0,0],
    [0,0,2,2,2,2,2,2,0,0,0,2,2,0,0,0,2,3,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
];

function dibujaEscenario(){
    var color;
    for(y=0;y<10;y++){
        for(x=0;x<20;x++){
            var tile = escenario[y][x];
            /*if(escenario[y][x]==0) color = cesped;
            if(escenario[y][x]==1) color = agua;
            if(escenario[y][x]==2) color = tierra;
            if(escenario[y][x]==3) color = llave;
            if(escenario[y][x]==4) color = puerta;*/    

            //ctx.fillStyle = color;
            //ctx.fillRect(x*anchoF,y*altoF,anchoF,altoF);
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

    this.getCoordenadas = function(){
        var coordenadas = [];

        coordenadas.push(this.x);
        coordenadas.push(this.y);

        return coordenadas;
    }

    this.setCoordenadas = function(x,y){
        this.x = x;
        this.y = y;
    }


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

    this.getCoordenadas = function(){
        var coordenadas = [];

        coordenadas.push(this.x);
        coordenadas.push(this.y);

        return coordenadas;
    }

    this.setCoordenadas = function(x,y){
        this.x = x;
        this.y = y;
    }

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

function guardarPartida(){
    var coordenadasJ = [];
    var coordenadasE0 = [];
    var coordenadasE1 = [];
    var coordenadasE2 = [];
    coordenadasJ = protagonista.getCoordenadas();
    coordenadasE0 = enemigo[0].getCoordenadas();
    coordenadasE1 = enemigo[1].getCoordenadas();
    coordenadasE2 = enemigo[2].getCoordenadas();
    
    localStorage.setItem("jx",coordenadasJ[0]);
    localStorage.setItem("jy",coordenadasJ[1]);

    localStorage.setItem("e0x",coordenadasE0[0]);
    localStorage.setItem("e0y",coordenadasE0[1]);

    localStorage.setItem("e1x",coordenadasE1[0]);
    localStorage.setItem("e1y",coordenadasE1[1]);

    localStorage.setItem("e2x",coordenadasE2[0]);
    localStorage.setItem("e2y",coordenadasE2[1]);


    console.log('Guardando Partida');
}

function cargarpartida(){
    var jx,jy,e0x,e0y,e1x,e1y,e2x,eyx;

    jx = localStorage.getItem("jx");
    jy = localStorage.getItem("jy");

    e0x = localStorage.getItem("e0x");
    e0y = localStorage.getItem("e0y");

    e1x = localStorage.getItem("e1x");
    e1y = localStorage.getItem("e1y");
    
    e2x = localStorage.getItem("e2x");
    e2y = localStorage.getItem("e2y");

    protagonista.setCoordenadas(jx,jy);
    enemigo[0].setCoordenadas(e0x,e0y);
    enemigo[1].setCoordenadas(e1x,e1y);
    enemigo[2].setCoordenadas(e2x,e2y);
}

function init(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    tileMap = new Image();
    tileMap.src = 'img/tilemap.png';

    protagonista = new jugador();

    imagenAntorcha = new antorcha(0,0);

    enemigo.push(new malo(3,7));
    enemigo.push(new malo(7,3));
    enemigo.push(new malo(6,6));

    document.addEventListener('keydown',function(tecla){

        //up
        if(tecla.keyCode == 38){
            protagonista.arriba();
        }
    
        //down
        if(tecla.keyCode == 40){
            protagonista.abajo();
        }
    
        //left
        if(tecla.keyCode == 37){
            protagonista.izquierda();
        }
    
        //rigth
        if(tecla.keyCode == 39){
            protagonista.derecha();
        }

        if(tecla.keyCode == 71){
            //guardar G
            guardarPartida();
           
        }

        if(tecla.keyCode == 67){
            //cargar C
            cargarpartida();
        }

        if(tecla.keycode == 66){
            //borrar b
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
    dibujaEscenario();
    protagonista.dibuja();
    imagenAntorcha.dibuja();

    for(c=0; c<enemigo.length;c++){
        enemigo[c].mueve();
        enemigo[c].dibuja();
    }
}