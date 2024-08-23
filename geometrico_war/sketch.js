//Projeto de Desenvolvimento de Sistemas
//Aula de POO  e Encapsulamento
//Demetrio Torgan

//Objetivos:
//1- Criar a classe Nave
//2- Criar a função Render
//3- Criar a função Turn com as setas do teclado
//4- Criar a função de bordas
//5-  Criar Placar e personalizar

//----------Variaveis Globais
let nave;
let nave2;
let naveImg;
let nave2Img;
let inimigo;
let inimigos = [];
let inimigoImg;
let laser = [];
let laser2 = [];
let meusPontos = 0;
let opPontos = 0;
let fundo;


function preload(){
  fundo = loadImage('assets/fundo.png')
  inimigoImg = loadImage('assets/inimigo.png')
  naveImg = loadImage('assets/nave.png')
  nave2Img = loadImage('assets/nave2.png')
}

function setup() {
  createCanvas(400, 400);
  nave = new Nave(naveImg);
  nave2 = new Nave(nave2Img);
  
  for(let i = 0; i < 10; i++){
  inimigos[i] = new Inimigo(inimigoImg, random(0, width), random(-800, 0));
  }
} 

function draw() {
    background(fundo);
  meusPontos = laserColisao(laser, meusPontos);
  opPontos = laserColisao(laser2, opPontos);
  
  meusPontos = naveColisao(nave, meusPontos);
  opPontos = naveColisao(nave2, opPontos);
  
  placar(meusPontos, 50,50);
  placar(opPontos, 330, 50);
  
  
  mostraInimigos();
  mostraNave(nave);
  mostraNave(nave2);
  mostraLaser(laser);
  mostraLaser(laser2);
  
  opPontos = verificaDano(nave2, laser, opPontos);
  meusPontos = verificaDano(nave, laser, meusPontos)
}

// ---------Função dos inimigos
function mostraInimigos(){
    for (let inimigo of inimigos){
      inimigo.render();
  }
}

// --------- Função das naves
function mostraNave(nav){
  nav.render();
  nav.giro();
  nav.update();
  nav.edges();
}

// --------- função Laser
function mostraLaser(laserN){
  for(let laser of laserN){
    laser.render();
    laser.update();
  }
}

//-----------Funções do Teclado

function controleNave(){
  if(keyCode == UP_ARROW){
    nave.acelerando(true);
  }
  if(keyCode == RIGHT_ARROW){
    nave.setRotation(0.1);
  }
  if(keyCode == LEFT_ARROW){
    nave.setRotation(-0.1);
  }
  if(key == ' '){    
    laser.push(new Laser(nave.pos,nave.heading));    
  }
}

function controleNave2(){
  if(keyCode == 87){
    nave2.acelerando(true);
  }
  if(keyCode == 68){
    nave2.setRotation(0.1);
  }
  if(keyCode == 65){
    nave2.setRotation(-0.1);
  }
  if(keyCode == 16){    
    laser2.push(new Laser(nave2.pos,nave2.heading));    
  }
}

function keyPressed(){
  controleNave();
  controleNave2()
}

function keyReleased(){
  if(keyCode == UP_ARROW){
    nave.acelerando(false);
  }
  
  if(keyCode == 87){
    nave2.acelerando(false);
  }
  nave.setRotation(0);
  nave2.setRotation(0)
}

// ----------colisao----------

function laserColisao(lasers, pontos){
  for(let laser of lasers){
    for(let inimigo of inimigos){
  if(dist(inimigo.x, inimigo.y, laser.pos.x, laser.pos.y)<40){
      inimigos.splice(inimigos.indexOf(inimigo), 1);
    lasers.splice(lasers.indexOf(laser), 1);
    pontos +=1;
    let novoInimigo = new Inimigo(inimigoImg, random(0, width), random(-800, 0))
    inimigos.push(novoInimigo)
      } 
    }
  }
  return pontos;
}

function naveColisao(nav,pontos){
  for(let inimigo of inimigos){
    if(dist(inimigo.x, inimigo.y, nav.pos.x, nav.pos.y) < 50){
      inimigos.splice(inimigos.indexOf(inimigo), 1);
      if(pontos >0){
        pontos -= 1;
        let novoInimigo = new Inimigo(inimigoImg, random(0 , width), random(-100, 0));
        inimigos.push(novoInimigo);
      }
      if(pontos == 0){
        textAlign(CENTER);
        fill(255)
        textSize(40);
        text('GAME OVER', width/2, height/2);
        noLoop();
      }
    }
  }
  return pontos;
}

// -------------placar----------
function placar(pontos, x, y){
  push()
  textSize(35)
  textFont('Jersey 10');
  fill(255)
  text(pontos,x,y)
  pop()
}

// -----------Função danoInimigo
function verificaDano(nav, lasers, pontos){
  for(let laser of lasers){
    if(dist(nav.pos.x, nav.pos.y, laser.pos.x, laser.pos.y) < 40){
      if(pontos> 0){
        lasers.splice(lasers.indexOf(laser), 1);
        pontos -=1;
      }
    }
  }
  return pontos;
}