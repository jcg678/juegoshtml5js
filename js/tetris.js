
var canvas;
var ctx;
var FPS = 50;

var anchoCanvas = 400;
var altoCanvas = 640;

var anchotablero = 10;
var altoTablero = 20;

var anchoF = 40;
var altoF = 40;

var margenSuperior = 4;




var tablero = [
[1,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,1],    
[1,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,3,0,0,0,0,1],
[1,0,0,0,0,0,3,0,0,0,0,1],
[1,0,0,0,2,2,3,0,0,0,0,1],
[1,0,0,0,2,2,3,0,0,0,0,1],
[1,1,1,1,1,1,1,1,1,1,1,1]
];

var pieza;

var fichaGrafico= [
    [
        [
        [0,0,0,0],
        [0,1,1,0],
        [0,1,1,0],
        [0,0,0,0]
        ],
    
        [
        [0,0,0,0],
        [0,1,1,0],
        [0,1,1,0],
        [0,0,0,0]
        ],
    
        [
        [0,0,0,0],
        [0,1,1,0],
        [0,1,1,0],
        [0,0,0,0]
        ],
    
        [
        [0,0,0,0],
        [0,1,1,0],
        [0,1,1,0],
        [0,0,0,0]
        ]
    ],
    
    [
        [
        [0,0,0,0],
        [2,2,2,2],
        [0,0,0,0],
        [0,0,0,0]
        ],
    
        [
        [0,0,2,0],
        [0,0,2,0],
        [0,0,2,0],
        [0,0,2,0]
        ],
    
        [
        [0,0,0,0],
        [2,2,2,2],
        [0,0,0,0],
        [0,0,0,0]
        ],
    
        [
        [0,0,2,0],
        [0,0,2,0],
        [0,0,2,0],
        [0,0,2,0]
        ]
    
    ],
    
    [
        [
        [0,0,0,0],
        [0,0,3,3],
        [0,3,3,0],
        [0,0,0,0]
        ],
    
        [
        [0,0,3,0],
        [0,0,3,3],
        [0,0,0,3],
        [0,0,0,0]
        ],
    
        [
        [0,0,0,0],
        [0,0,3,3],
        [0,3,3,0],
        [0,0,0,0]
        ],
    
        [
        [0,0,3,0],
        [0,0,3,3],
        [0,0,0,3],
        [0,0,0,0]
        ]
    
    ],
    
    [
        [
        [0,0,0,0],
        [0,4,4,0],
        [0,0,4,4],
        [0,0,0,0]
        ],
    
        [
        [0,0,0,4],
        [0,0,4,4],
        [0,0,4,0],
        [0,0,0,0]
        ],
    
        [
        [0,0,0,0],
        [0,4,4,0],
        [0,0,4,4],
        [0,0,0,0]
        ],
    
        [
        [0,0,0,4],
        [0,0,4,4],
        [0,0,4,0],
        [0,0,0,0]
        ]
    
    ],
    
    [
        [
        [0,0,0,0],
        [0,5,5,5],
        [0,5,0,0],
        [0,0,0,0]
        ],
    
        [
        [0,0,5,0],
        [0,0,5,0],
        [0,0,5,5],
        [0,0,0,0]
        ],
    
        [
        [0,0,0,5],
        [0,5,5,5],
        [0,0,0,0],
        [0,0,0,0]
        ],
    
        [
        [0,5,5,0],
        [0,0,5,0],
        [0,0,5,0],
        [0,0,0,0]
        ]
    
    ],
    
    [
        [
        [0,0,0,0],
        [0,6,6,6],
        [0,0,0,6],
        [0,0,0,0]
        ],
    
        [
        [0,0,6,6],
        [0,0,6,0],
        [0,0,6,0],
        [0,0,0,0]
        ],
    
        [
        [0,6,0,0],
        [0,6,6,6],
        [0,0,0,0],
        [0,0,0,0]
        ],
    
        [
        [0,0,6,0],
        [0,0,6,0],
        [0,6,6,0],
        [0,0,0,0]
        ]
    ],
    
    
    [
        [
        [0,0,0,0],
        [0,7,7,7],
        [0,0,7,0],
        [0,0,0,0]
        ],
    
        [
        [0,0,7,0],
        [0,0,7,7],
        [0,0,7,0],
        [0,0,0,0]
        ],
    
        [
        [0,0,7,0],
        [0,7,7,7],
        [0,0,0,0],
        [0,0,0,0]
        ],
    
        [
        [0,0,7,0],
        [0,7,7,0],
        [0,0,7,0],
        [0,0,0,0]
        ]
    ]
    ];

//COLORES
var rojo = '#FF0000';
var morado = '#800080';
var naranja = '#FF8C00';
var amarillo = '#FFD700';
var verde = '#008000';
var cyan = '#00CED1';
var azul = '#0000CD';    


var objPieza = function(){
    this.x = 0;
    this.y = 0;
    this.angulo =0;
    this.tipo = 2;
    this.retraso = 50;
    this.fotograma = 0;

    this.nueva = function(){
        this.tipo = Math.floor(Math.random()*7);
        this.y = 0;
        this.x = 4;

    };

    this.caer = function(){
        if(this.fotograma < this.retraso){
            this.fotograma++;
        }else{
            
            if(this.colision(this.angulo,this.x,this.y+1)==false){
                this.y++;
                
            }else{
               this.fijar(); 
               this.nueva();     
            }
            this.fotograma =0;

        }
        
        
    }

    this.fijar = function(){
        for(py=0;py<4;py++){
            for(px=0;px<4;px++){
                if(fichaGrafico[this.tipo][this.angulo][py][px]>0){
                    tablero[this.y+py][this.x+px] = fichaGrafico[this.tipo][this.angulo][py][px];
                }
            }
        }
    };

    this.dibuja = function(){
        for(py=0;py<4;py++){
            for(px=0;px<4;px++){
                if(fichaGrafico[this.tipo][this.angulo][py][px]!=0){

                        if(fichaGrafico[this.tipo][this.angulo][py][px]==0) ctx.fillStyle = '#123123';
                        if(fichaGrafico[this.tipo][this.angulo][py][px]==1) ctx.fillStyle = rojo;
                        if(fichaGrafico[this.tipo][this.angulo][py][px]==2) ctx.fillStyle = naranja;
                        if(fichaGrafico[this.tipo][this.angulo][py][px]==3) ctx.fillStyle = amarillo;
                        if(fichaGrafico[this.tipo][this.angulo][py][px]==4) ctx.fillStyle = verde;
                        if(fichaGrafico[this.tipo][this.angulo][py][px]==5) ctx.fillStyle = cyan;
                        if(fichaGrafico[this.tipo][this.angulo][py][px]==6) ctx.fillStyle = azul;


                    ctx.fillRect((this.x+px-1)*anchoF,(this.y +py -margenSuperior)*altoF,anchoF,altoF);
                }
            }
        }
    }

    this.rotar = function(){
        var anguloNuevo = this.angulo;


        if(this.angulo<3){
            anguloNuevo++;
        }else{
            anguloNuevo =0;
        }

        if(this.colision(anguloNuevo,this.x,this.y)==false){
            this.angulo=anguloNuevo;
        }

    }


    this.colision = function(anguloNuevo, xNueva, yNueva){
        var resultado = false;
        for(py=0;py<4;py++){
            for(px=0;px<4;px++){
                if(fichaGrafico[this.tipo][anguloNuevo][py][px]>0){
                    if(tablero[yNueva+py][xNueva+px]>0){
                        resultado = true;
                    }
                }
                
            }
        }
        return resultado;
    }

    this.abajo = function(){
        if(this.colision(this.angulo,this.x, this.y+1)==false) this.y++;
    }
    this.izquierda = function(){
        if(this.colision(this.angulo,this.x-1, this.y)==false) this.x--;
    }
    this.derecha = function(){
        if(this.colision(this.angulo,this.x+1, this.y)==false) this.x++;
    }

    this.nueva();
}

function dibujaTablero(){
    for(py=margenSuperior;py<altoTablero;py++){
        for(px=1;px<anchotablero;px++){
            if(tablero[py][px]!=0){

                    if(tablero[py][px]==0) ctx.fillStyle = '#123123';
                    if(tablero[py][px]==1) ctx.fillStyle = rojo;
                    if(tablero[py][px]==2) ctx.fillStyle = naranja;
                    if(tablero[py][px]==3) ctx.fillStyle = amarillo;
                    if(tablero[py][px]==4) ctx.fillStyle = verde;
                    if(tablero[py][px]==5) ctx.fillStyle = cyan;
                    if(tablero[py][px]==6) ctx.fillStyle = azul;


                ctx.fillRect((px-1)*anchoF,(py-margenSuperior)*altoF,anchoF,altoF);
            }
        }
    }
}

function inicializaTeclado(){
    document.addEventListener('keydown',function(tecla){
        if(tecla.keyCode == 38){
            pieza.rotar()
        }
        if(tecla.keyCode == 40){
            pieza.abajo()
        }
        if(tecla.keyCode == 37){
            pieza.izquierda()
        }
        if(tecla.keyCode == 39){
            pieza.derecha();
        }
    })
}

function init(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    canvas.style.width = anchoCanvas;
    canvas.style.height =altoCanvas;

    pieza = new objPieza();

    inicializaTeclado();

    setInterval(function(){
        principal();
    },1000/FPS)
}

function borrarCanvas(){
    canvas.width = anchoCanvas;
    canvas.height =altoCanvas;
}


function principal(){
    console.log('x');
    
    borrarCanvas();
    pieza.dibuja();
    pieza.caer();
    dibujaTablero();
}