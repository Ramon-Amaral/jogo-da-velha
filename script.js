class Jogador {
  constructor(simbolo) {
    this.simbolo = simbolo;
  }
}

class Jogada {
  constructor(linha,coluna){
    this.linha = linha;
    this.coluna = coluna;
  }
}

class JogoDaVelha {
  constructor (tamanho){
  this.j1 = new Jogador("X");
  this.j2 = new Jogador("O");
  this.tamanho = tamanho;
  this.tabuleiro = this.#iniciarTabuleiro();
  this.pontuação = {X:0, O:0}
  this.jogadorAtual = this.j1;
  }
  #iniciarTabuleiro(){
    return Array(this.tamanho).fill("").map(()=> Array(this.tamanho).fill(""));
  }

  Jogar (jogada){
    this.#adicionarMarcador(jogada)
    this.jogadorAtual = this.#trocarJogador()
  }

 toString(){
  const matriz = this.tabuleiro;
 return matriz.map((linha)=> linha.map(posicao => posicao || "-").join(" ")).join("\n");
  }

  #adicionarMarcador(jogada){
    let {linha, coluna} = jogada;
    this.tabuleiro[linha -1][coluna -1] = this.jogadorAtual.simbolo
  }

  #trocarJogador(){
    return this.jogadorAtual === this.j1 ? this.j2 : this.j1
  }
}

const jogo = new JogoDaVelha(4);
jogo.Jogar(new Jogada(1,1))
jogo.Jogar(new Jogada(2,4))
console.log (jogo.toString())

