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

  jogar(tabuleiro) {
    let linha = this.#aleatorio(1, tabuleiro.length);
    let coluna = this.#aleatorio(1, tabuleiro.length);
    return new Jogada(linha, coluna);
  }

  #aleatorio(min, max) {
    let valor = Math.random() * (max - min) + min;
    return Math.round(valor);
  }
}

class Jogada {
  constructor(linha, coluna) {
    this.linha = linha;
    this.coluna = coluna;
  }

  get valida() {
    return this.linha > 0 && this.coluna > 0;
  }

  get invalida() {
    return !this.valida;
  }
}

class JogoDaVelha {
  constructor(tamanho) {
    this.j1 = new JogadorHumano("X");
    this.j2 = new JogadorMaquina("O");
    this.tamanho = tamanho;
    this.pontuação = { X: 0, O: 0 };
    this.zerar();
  }

  #iniciarTabuleiro() {
    return Array(this.tamanho)
      .fill("")
      .map(() => Array(this.tamanho).fill(""));
  }

  jogar(jogada) {
    if (this.jogadorAtual.humano) {
      this.#processarJogada(jogada);
    }

    while (!this.vencedor && !this.jogadorAtual.humano) {
      let jogada = this.jogadorAtual.jogar(this.tabuleiro);
      this.#processarJogada(jogada);
    }
  }

  #processarJogada(jogada) {
    if (!this.#jogadaValida(jogada)) return;

    this.#adicionarMarcador(jogada);

    if (this.#vitoriaComJogada(jogada)) {
      this.vencedor = this.jogadorAtual.simbolo;
      return;
    } else if (this.#empatou()) {
      this.vencedor = "-";
      return;
    }

    this.jogadorAtual = this.#trocarJogador();
  }

  #campo(linha, coluna) {
    return this.tabuleiro[linha - 1][coluna - 1];
  }

  #ocupado(jogada) {
    let { linha, coluna } = jogada;
    return this.#campo(linha, coluna) !== "";
  }

  #vitoriaComJogada(jogada) {
    let { linha, coluna } = jogada;
    let { tabuleiro, jogadorAtual } = this;
    let tamanho = tabuleiro.length;

    let indices = Array(tamanho)
      .fill(0)
      .map((_, i) => i + 1);

    let ganhouEmLinha = indices.every(
      (i) => this.#campo(linha, i) === jogadorAtual.simbolo,
    );

    let ganhouEmColuna = indices.every(
      (i) => this.#campo(i, coluna) === jogadorAtual.simbolo,
    );

    let ganhouEmDiagonal1 = indices.every(
      (i) => this.#campo(i, i) === jogadorAtual.simbolo,
    );

    let ganhouEmDiagonal2 = indices.every(
      (i) => this.#campo(tamanho - i + 1, i) === jogadorAtual.simbolo,
    );

    return (
      ganhouEmLinha || ganhouEmColuna || ganhouEmDiagonal1 || ganhouEmDiagonal2
    );
  }

  #empatou() {
    let espacosVazios = this.tabuleiro.flat().filter((campo) => campo === "");
    return espacosVazios.length === 0;
  }

  #jogadaValida(jogada) {
    if (jogada.invalida) {
      return false;
    }

    let { linha, coluna } = jogada;

    if (linha > this.tamanho || coluna > this.tamanho) {
      return false;
    }
    if (this.#ocupado(jogada)) {
      return false;
    }
    if (this.vencedor) {
      return false;
    }
    return true;
  }

  zerar() {
    this.tabuleiro = this.#iniciarTabuleiro();
    this.jogadorAtual = this.j1;
    this.vencedor = null;
  }

  toString() {
    const matrizFormatada = this.tabuleiro
      .map((linha) => linha.map((posicao) => posicao || "-").join(" "))
      .join("\n");
    let quemVenceu = this.vencedor ? `\nVencedor: ${this.vencedor}` : "";

    return `${matrizFormatada}${quemVenceu}`;
  }

  #adicionarMarcador(jogada) {
    let { linha, coluna } = jogada;
    this.tabuleiro[linha - 1][coluna - 1] = this.jogadorAtual.simbolo;
  }

  #trocarJogador() {
    return this.jogadorAtual === this.j1 ? this.j2 : this.j1;
  }

status(){
  if(this.vencedor === "-"){
    return "Empate!!!"
  } else if (this.vencedor){
    return `${this.vencedor} venceu!!`
  } else {
    return `É a vez de ${this.jogadorAtual.simbolo}`
  }
}
}

// const jogo = new JogoDaVelha(4);
// jogo.Jogar(new Jogada(1, 1));
// jogo.Jogar(new Jogada(2, 4));
// jogo.Jogar(new Jogada(1, 2));
// jogo.Jogar(new Jogada(4, 1));
// jogo.Jogar(new Jogada(1, 3));
// jogo.Jogar(new Jogada(4, 2));
// jogo.Jogar(new Jogada(1, 4));

// console.log(jogo.toString());

class JogoDaVelhaDOM {
  constructor(tabuleiro, informacoes) {
    this.tabuleiro = tabuleiro;
    this.informacoes = informacoes;
  }

  inicializar(jogo) {
    this.jogo = jogo;
    this.#deixarTabuleiroJogavel();
  }

  #deixarTabuleiroJogavel() {
    const posicoes = this.tabuleiro.getElementsByClassName("posicao");
    for (let posicao of posicoes) {
      posicao.addEventListener("click", (e) => {
        if(this.jogo.vencedor){
          return;
      }
        let posicaoSelecionada = e.target.attributes;
        let linha = +posicaoSelecionada.linha.value;
        let coluna = +posicaoSelecionada.coluna.value;
        this.jogo.jogar(new Jogada(linha, coluna));
        this.informacoes.innerText = this.jogo.status()
        this.#imprimirSimbolos();
      });
    }
  }

  #imprimirSimbolos() {
    let { tabuleiro } = this.jogo;
    let qtdLinhas = tabuleiro.length;
    let qtdColunas = tabuleiro[0].length;
    let posicoes = this.tabuleiro.getElementsByClassName("posicao");
    for (let linha = 0; linha < qtdLinhas; linha++) {
      for (let coluna = 0; coluna < qtdColunas; coluna++) {
        let indiceDaInterface = linha * qtdLinhas + coluna;
        posicoes[indiceDaInterface].innerText = tabuleiro[linha][coluna];
      }
    }
  }
  zerar(){
    this.jogo.zerar();
    let posicoes = document.getElementsByClassName("posicao");
    [...posicoes].forEach(posicao=>posicao.innerText = "");
    this.informacoes.innerText = this.jogo.status();
  }
}

(function () {
  const botaoIniciar = document.getElementById("iniciar");
  const informacoes = document.getElementById("informacoes");
  const tabuleiro = document.getElementById("tabuleiro");
  const jogo = new JogoDaVelha(3);

  const jogoDOM = new JogoDaVelhaDOM(tabuleiro, informacoes);
  jogoDOM.inicializar(jogo);

  botaoIniciar.addEventListener("click",()=>{jogoDOM.zerar()})
})();
