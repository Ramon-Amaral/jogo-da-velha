class Jogador {
  constructor(simbolo) {
    this.simbolo = simbolo;
  }
}

class JogoDaVelha {
  constructor (tamanho){
  this.j1 = new Jogador("X");
  this.j2 = new Jogador("O");
  this.tamanho = tamanho;
  this.tabuleiro = this.#iniciarTabuleiro(3);
  this.pontuação = {X:0, O:0}
  this.turno = this.j1;
  }
  #iniciarTabuleiro(){
    return Array(this.tamanho).fill("").map(()=> Array(this.tamanho).fill(""));
  }

 toString(){
  const matriz = this.tabuleiro;
  matriz.map((linha)=> linha.map(posicao => posicao || "-").join(" ")).join("\n");
  return matriz;


  }
}

