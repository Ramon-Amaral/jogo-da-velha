class JogadorHumano {
  constructor(simbolo) {
    this.simbolo = simbolo;
    this.humano = true;
  }
}

class JogadorMaquina {
  constructor(simbolo) {
    this.simbolo = simbolo;
    this.humano = false;
  }

  jogar(tabuleiro){
    let linha;
    let coluna;
    return new Jogada (linha,coluna)
  }

  #aleatorio(min,max){
    let valor = Math.random() * (max - min) + min;
    return Math.trunc(valor);
  }
}

class Jogada {
  constructor(linha, coluna){
    this.linha = linha;
    this.coluna = coluna;
  }

  get valida() {
    return this.linha > 0 && this.coluna > 0;
  }

  get invalida(){
    return !this.valida;
  }
}

class JogoDaVelha {
  constructor (tamanho){
    this.j1 = new JogadorHumano("X");
    this.j2 = new JogadorHumano("O");
    this.tamanho = tamanho;
    this.pontuação = {X:0, O:0};
    this.zerar();
  }

  #iniciarTabuleiro(){
    return Array(this.tamanho).fill("").map(()=> Array(this.tamanho).fill(""));
  }

  Jogar(jogada){
    this.#processarJogada(jogada);
  }
  
  #processarJogada(jogada){
    if (!this.#jogadaValida(jogada)) return;

    this.#adicionarMarcador(jogada);
    
    if(this.#vitoriaComJogada(jogada)){
      this.vencedor = this.jogadorAtual.simbolo;
      return;
    } else if (this.#empatou()){
      this.vencedor = "-";
      return;
    }
    
    this.jogadorAtual = this.#trocarJogador();
  }

  #campo(linha, coluna){
    return this.tabuleiro[linha - 1][coluna - 1];
  }

  #ocupado(jogada){
    let {linha, coluna} = jogada;
    return this.#campo(linha, coluna) !== "";
  }

  #vitoriaComJogada(jogada){
    let {linha, coluna} = jogada;
    let {tabuleiro, jogadorAtual} = this;
    let tamanho = tabuleiro.length;
    
    let indices = Array(tamanho).fill(0).map((_, i) => i + 1);

    let ganhouEmLinha = indices.every((i) => this.#campo(linha, i) === jogadorAtual.simbolo);

    let ganhouEmColuna = indices.every((i) => this.#campo(i, coluna) === jogadorAtual.simbolo);

    let ganhouEmDiagonal1 = indices.every((i) => this.#campo(i, i) === jogadorAtual.simbolo);
    
    let ganhouEmDiagonal2 = indices.every((i) => this.#campo(tamanho - i + 1, i) === jogadorAtual.simbolo);

    return ganhouEmLinha || ganhouEmColuna || ganhouEmDiagonal1 || ganhouEmDiagonal2;
  }

  #empatou(){
    let espacosVazios = this.tabuleiro.flat().filter((campo) => campo === "");
    return espacosVazios.length === 0;
  }

  #jogadaValida(jogada){
    if (jogada.invalida){
      return false;
    }
    
    let {linha, coluna} = jogada;
    
    if (linha > this.tamanho || coluna > this.tamanho) {
      return false;
    }
    if (this.#ocupado(jogada)){
      return false;
    }
    if (this.vencedor){
      return false;
    } 
    return true;
  }

  zerar(){
    this.tabuleiro = this.#iniciarTabuleiro();
    this.jogadorAtual = this.j1
    this.vencedor = null
  }

  toString(){
    const matrizFormatada = this.tabuleiro.map((linha) => linha.map(posicao => posicao || "-").join(" ")).join("\n");
    let quemVenceu = this.vencedor ? `\nVencedor: ${this.vencedor}` : "";
    
    return `${matrizFormatada}${quemVenceu}`;
  }

  #adicionarMarcador(jogada){
    let {linha, coluna} = jogada;
    this.tabuleiro[linha - 1][coluna - 1] = this.jogadorAtual.simbolo;
  }

  #trocarJogador(){
    return this.jogadorAtual === this.j1 ? this.j2 : this.j1;
  }
}

const jogo = new JogoDaVelha(4);
jogo.Jogar(new Jogada(1, 1));
jogo.Jogar(new Jogada(2, 4));
jogo.Jogar(new Jogada(1, 2));
jogo.Jogar(new Jogada(4, 1));
jogo.Jogar(new Jogada(1, 3));
jogo.Jogar(new Jogada(4, 2));
jogo.Jogar(new Jogada(1, 4));

console.log(jogo.toString());