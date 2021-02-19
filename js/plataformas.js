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

      this.gravedad = 0.5;
      this.friccion = 0.1;

      this.salto = 10;
      this.velocidad = 0;

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


      this.fisica = function(){
        if(this.suelo == false){
            this.vy += this.gravedad;
        }

        if(this.vy > 0){
            if(this.colision(this.x, this.y + altoF)==true){
                this.suelo = true;
                this.vy = 0;    
            }
        }

        this.y += this.vy;
        
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
          //protagonista.izquierda();
        }
    
        if(tecla.keyCode == 39){
          //protagonista.derecha();
        }
    
      });
    
      document.addEventListener('keyup',function(tecla){

        if(tecla.keyCode == 37){
          //protagonista.izquierdaSuelta();
        }
    
        if(tecla.keyCode == 39){
          //protagonista.derechaSuelta();
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