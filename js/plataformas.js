var canvas;
var ctx;
var FPS;
var anchoF = 50;
var altoF = 50;

var muro = '#044f14';
var tierra = '#c6892f';

var escenario = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,2,2,2,2,2,2,2,2,2,2,2,2,2,0],
    [0,2,2,2,2,2,2,2,2,2,2,2,2,2,0],
    [0,2,2,0,0,2,2,0,0,0,0,2,2,0,0],
    [0,2,2,2,2,2,2,2,2,2,2,2,0,0,0],
    [0,2,2,2,2,2,2,2,2,2,2,0,0,0,0],
    [0,2,2,2,2,2,2,0,2,2,0,0,0,0,0],
    [0,2,2,2,2,2,0,0,0,2,2,2,2,2,0],
    [0,0,0,2,2,0,0,0,0,0,2,2,0,2,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  ];


  var protagonista;


  var jugador = function(){
      this.x = 100;
      this.y = 100;
       
      this.vy = 0;
      this.vx = 0;

      this.gravedad = 0.2;
      this.friccion = 0.1;

      this.salto = 6;
      this.velocidad = 0.2;

      this.velocidadMax = 5;

      this.suelo = false;

      this.pulsaIzquierda = false;
      this.pulsaDerecha = false;
      
      this.colision = function(x,y){
          var colisiona = false;
          if(escenario[parseInt(y/altoF)][parseInt(x/anchoF)]==0){
              colisiona = true;
          }

          return colisiona;
      }

      this.arriba = function(){
          if(this.suelo == true){
              this.vy -= this.salto;
              this.suelo = false;
          }
      }

      this.derecha = function(){
        this.pulsaDerecha = true;
      }

      this.izquierda = function(){
        this.pulsaIzquierda = true;
      }

      this.sueltaDerecha = function(){
        this.pulsaDerecha = false;
      }

      this.sueltaIzquierda = function(){
        this.pulsaIzquierda = false;
      }

      this.correccion = function(lugar){
        //abajo
        if(lugar == 1){
          this.y = parseInt(this.y/altoF)*altoF;
        }

        if(lugar == 2){
          this.y = parseInt((this.y/altoF)+1)*altoF;
        }

        //iz
        if(lugar == 3){
          this.x = parseInt(this.x/anchoF)*anchoF;
        }

        //derecha
        if(lugar == 4){
          this.x = parseInt((this.x/anchoF)+1)*anchoF;
        }

      }

      this.fisica = function(){
        if(this.suelo == false){
          this.vy += this.gravedad;
        }
        else{
          this.correccion(1);
          this.vy = 0;
        }

        if(this.pulsaDerecha == true && (this.vx <= this.velocidadMax)){
          console.log('derecha on');
          this.vx += this.velocidad;
        }

        if(this.pulsaIzquierda == true && (this.vx >= 0-(this.velocidadMax))){
          console.log('izquierda on');
          this.vx -= this.velocidad;
        }

        //friccion
        if(this.vx < 0){
          this.vx += this.friccion;
    
          //si nos pasamos, paramos
          if(this.vx >0){
            this.vx = 0;
          }
        }
    
        //Derecha
        if(this.vx > 0){
          this.vx -= this.friccion;
    
          if(this.vx < 0){
            this.vx = 0;
          }
        }

        if(this.vx >0){
          if((this.colision(this.x + anchoF + this.vx, this.y+1)==true)||(this.colision(this.x + anchoF + this.vx, this.y+altoF-1)==true)){
            if(this.x != parseInt(this.x/anchoF)*anchoF){
              this.correccion(4);
            }
            this.vx =0;
          }
        }

        if(this.vx <0){
          if((this.colision(this.x + this.vx, this.y+1)==true)||(this.colision(this.x + this.vx, this.y+altoF-1)==true)){
            if(this.x != parseInt(this.x/anchoF)*anchoF){
              this.correccion(3);
            }
            this.vx =0;
          }
        }

        this.y += this.vy;
        this.x += this.vx;

        //colision techo
        if(this.vy <0){
          if((this.colision(this.x+1,this.y)==true)||(this.colision(this.x + anchoF-1,this.y)==true)){
            this.vy = 0;
            this.correccion(2);
          }
        }


        //colision suelo
        if(this.vy >= 0){
            if((this.colision(this.x + 1, this.y + altoF)==true)||((this.colision(this.x + anchoF - 1, this.y + altoF)==true))){
                this.suelo = true;
                this.vy = 0;
                this.correccion(1);    
            }else{
              this.suelo = false;
            }
        }
        //console.log(this.vx);

        
      }      

      this.dibuja = function(){
          this.fisica();
          ctx.fillStyle = '#820c01';
          ctx.fillRect(this.x, this.y, anchoF, altoF);
      }

    
  }
  
  function dibujaEscenario(){
    var color;
  
    for(y=0;y<10;y++){
      for(x=0;x<15;x++){
  
        if(escenario[y][x]==0)
          color = muro;
  
        if(escenario[y][x]==2)
          color = tierra;
  
        ctx.fillStyle = color;
        ctx.fillRect(x*anchoF,y*altoF,anchoF,altoF);
      }
    }
  }


  function init(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    protagonista = new jugador();

    document.addEventListener('keydown',function(tecla){

        if(tecla.keyCode == 38){
          protagonista.arriba();
        }
    
        if(tecla.keyCode == 37){
          console.log('pulsa izquierda');
          protagonista.izquierda();
        }
    
        if(tecla.keyCode == 39){
          console.log('pulsa drecha');
          protagonista.derecha();
        }
    
      });
    
      document.addEventListener('keyup',function(tecla){

        if(tecla.keyCode == 37){
          protagonista.sueltaIzquierda();
        }
    
        if(tecla.keyCode == 39){
          protagonista.sueltaDerecha();
        }
    
      });


    setInterval(function(){
        principal();
      },1000/FPS);
  }   

  function borraCanvas(){
    canvas.width=750;
    canvas.height=500;
  }
  
  
  function principal(){
    borraCanvas();
    dibujaEscenario();
    protagonista.dibuja();
  }