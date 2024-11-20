interface Imagem {
  ordem: number,
  tamanho: number,
  urlImagem: string,
}

interface Detalhamento{
  acabamento: string,
  cor: number,
  desAcabamento: string,
  desCor: string,
  desVariacao: string,
  imagem: Imagem[],
}

export default class Product {
  altura: number;
  colecao: string;
  comprimento: number;
  descricao: string;
  detalhamento: Detalhamento[];
  grupo: string;
  item: string;
  largura: number;
  linha: string;
  pesoBruto: number;
  pesoLiquido: number;
  subGrupo: string;
  tipoProduto: string;
  unidade: string;

  constructor(
    altura: number,
    colecao: string,
    comprimento: number,
    descricao: string,
    detalhamento: Detalhamento[],
    grupo: string,
    item: string,
    largura: number,
    linha: string,
    pesoBruto: number,
    pesoLiquido: number,
    subGrupo: string,
    tipoProduto: string,
    unidade: string
  ) {
    this.altura = altura;
    this.colecao = colecao;
    this.comprimento = comprimento;
    this.descricao = descricao;
    this.detalhamento = detalhamento;
    this.grupo = grupo;
    this.item = item;
    this.largura = largura;
    this.linha = linha;
    this.pesoBruto = pesoBruto;
    this.pesoLiquido = pesoLiquido;
    this.subGrupo = subGrupo;
    this.tipoProduto = tipoProduto;
    this.unidade = unidade;
  }
}
