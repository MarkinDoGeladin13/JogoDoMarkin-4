var canva;
var jogador;
var GCaixa, GEspinho, GPlataforma, GBinvisivel;
var binvisivel;
var plataforma1;
var edges;
var estadoJogo = JOGAR;
var JOGAR = 1;
var ENCERRAR = 0;
var imgCaixa;
var imgEspinho;
function preload(){
    imgCaixa = loadImage("JogoDoMarkin-main/freescifiplatform/png/Tiles/Tile (5).png")
    imgEspinho = loadImage("JogoDoMarkin-main/freescifiplatform/png/Tiles/Spike.png")


}
function setup() {
    canva = createCanvas(700, 300);
    
    jogador = createSprite(50,50,25,25);
    edges = createEdgeSprites();
    plataforma1 = createSprite(50,75,100,25);
    GCaixa = createGroup();
    GPlataforma = createGroup();
    GEspinho = createGroup();
	GBinvisivel = createGroup();

	

}
    function draw(){
    background("green");
    jogador.collide(plataforma1);
    jogador.collide(GCaixa);
    
    if(keyDown("space")){
        pular();
    }
   
    if(keyDown(RIGHT_ARROW)){
       jogador.x = jogador.x+5;
    }
    if(keyDown(LEFT_ARROW)){
       jogador.x = jogador.x-5;
    }
    if(estadoJogo === JOGAR){
         gerarCaixas();
         gerarPlataforma();
         gerarEspinho();
         
        if(jogador.collide(edges[3])){
            estadoJogo = ENCERRAR;
        }
        if(jogador.isTouching(binvisivel)){
            estadoJogo = ENCERRAR;
        }
    }
    else if(estadoJogo === ENCERRAR){
         GCaixas.destroyEach();
         GPlataforma.destroyEach();
         GEspinho.destroyEach();
         binvisivel.destroyEach();
         textSize(100,20);
         text("GAME OVER, pressione R para reiniciar", 350, 150);
         if(keyDown("r")){
            estadoJogo = JOGAR;
      }
    }
    
    
    gerarCaixas();
    jogador.velocityY = jogador.velocityY+0.5;
    
    drawSprites();
    

}
    function gerarCaixas(){
        if (frameCount % 40 === 0){
            var caixa = createSprite(700,300,50,50);
            GCaixa.add(caixa);
            caixa.y = Math.round(random(250,150));
            caixa.velocityX = -5;
            GCaixa.lifetime=200;
            caixa.addImage(imgCaixa);
            caixa.scale = 0.3;
            binvisivel = createSprite(200,200,100,20);
            binvisivel.x = caixa.x;
            binvisivel.y = caixa.y+15;
            binvisivel.velocityX = -5
            binvisivel.visible = false;
            GBinvisivel.add(binvisivel);
        }
    } 
    function gerarPlataforma(){
        if(frameCount % 30 === 0){
            var plataforma = createSprite(700,300,50,50);
            GPlataforma.add(plataforma);
            plataforma.y = Math.round(random(250,150));
            plataforma.velocityX = -5;
            GPlataforma.lifetime=200;
        }
      }
    function pular(){
        if(keyDown("space")){
            jogador.velocityY = jogador.velocityY-5;
            jogador.y = jogador.y-2;
        }
    }
    function gerarEspinho(){
        if(frameCount % 3 === 0){    
            var espinho = createSprite(700,250,25,25);
            espinho.velocityX = -5;
            espinho.addImage(imgEspinho);
            GEspinho.add(espinho);
            espinho.lifetime=200;
            
        }
    }
    
    