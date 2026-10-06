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

  get valida() {
    return this.linha > 0 && this.coluna > 0;
  }

  get invalida(){
    return !this.valida
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
    if (!this.#jogadaValida(jogada)){
      return console.log ("JOGADA INVÁLIDA!!!")
    } else {
    this.#adicionarMarcador(jogada)
    this.jogadorAtual = this.#trocarJogador()
    }
  }

  #campo(linha, coluna){
    return this.tabuleiro[linha -1][coluna -1];
  }
  #ocupado(jogada){
    let {linha, coluna} = jogada;
    return this.#campo(linha,coluna) !=="";
  }

  #jogadaValida(jogada){
    if (jogada.invalida){
      return false
    }
    let {linha, coluna} = jogada;
    if (linha > this.tamanho || coluna > this.tamanho) {
      return false
    }
    if (this.#ocupado(jogada)){
      return false
    } 
    return true
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

