export interface ConfigCamera {
  posicao: [number, number, number]
  campoDeVisao: number
  planoProximo: number
  planoDistante: number
}

export interface ConfigExibicao {
  densidadePixels: number | [number, number]
  corFundo: string
  antiSerrilhado: boolean
  exposicaoTomAces: number
}

export interface ConfigLuzAmbiente {
  intensidade: number
  cor?: string
}

export interface ConfigEstrelas {
  raio: number
  profundidade: number
  quantidade: number
  fator: number
  saturacao: number
  esmaecer: boolean
}

export interface ConfigFundoEstrelado {
  tamanhos: number[]
  cores: string[]
  quantidadePorTamanho: number
  quantidadesPorTamanho?: number[]
  fatorDecaimentoQuantidade?: number
  opacidadeBase: number
  desvioOpacidade: number
  raio: number
  tamanhoTexturaPontos?: number
}

export interface ConfigFundoEstreladoBrilhantes {
  quantidade: number
  escalas: number[]
  opacidades: number[]
  tamanhoTexturaHalo?: number
}

export interface ConfigEstrelasVariadas {
  tamanhos: number[]
  cores: string[]
  quantidadePorTamanho: number
  raio: number
  profundidade: number
  opacidade: number
}

export interface ConfigSombrasDirecional {
  larguraMapa: number
  alturaMapa: number
  planoProximo: number
  planoDistante: number
  limiteEsquerda: number
  limiteDireita: number
  limiteTopo: number
  limiteFundo: number
}

export interface ConfigSol {
  posicao: [number, number, number]
  intensidade: number
  raio: number
  haloEscalas: [number, number, number]
  haloOpacidades: [number, number, number]
  corNucleo: string
  corHalo: string
  sombras: ConfigSombrasDirecional
  tamanhoTexturaBrilho?: number
  segmentosSol?: number
  corLuz?: string
}

export interface ConfigTerraLua {
  raioOrbita: number
  velocidadeOrbita: number
  velocidadeRotacaoTerra: number
  distanciaLua: number
  velocidadeOrbitaLua: number
  raioTerra: number
  segmentosTerra: number
  raioLua: number
  segmentosLua: number
  rugosidadeTerra: number
  metalicidadeTerra: number
  rugosidadeLua: number
  metalicidadeLua: number
  faseInicial?: number
  inclinacaoOrbitaLuaGraus?: number
  inclinacaoGraus?: number
}

export interface ConfigMarte {
  raioOrbita: number
  velocidadeOrbitaMarte: number
  velocidadeRotacaoMarte: number
  raioMarte: number
  segmentosMarte: number
  rugosidadeMarte: number
  metalicidadeMarte: number
  faseInicial?: number
  inclinacaoGraus?: number
}

export interface ConfigMercurio {
  raioOrbita: number
  velocidadeOrbitaMercurio: number
  velocidadeRotacaoMercurio: number
  raioMercurio: number
  segmentosMercurio: number
  rugosidadeMercurio: number
  metalicidadeMercurio: number
  faseInicial?: number
  inclinacaoGraus?: number
}

export interface ConfigVenus {
  raioOrbita: number
  velocidadeOrbitaVenus: number
  velocidadeRotacaoVenus: number
  raioVenus: number
  segmentosVenus: number
  rugosidadeVenus: number
  metalicidadeVenus: number
  faseInicial?: number
  inclinacaoGraus?: number
}

export interface ConfigJupiter {
  raioOrbita: number
  velocidadeOrbitaJupiter: number
  velocidadeRotacaoJupiter: number
  raioJupiter: number
  segmentosJupiter: number
  rugosidadeJupiter: number
  metalicidadeJupiter: number
  faseInicial?: number
  inclinacaoGraus?: number
}

export interface ConfigSaturno {
  raioOrbita: number
  velocidadeOrbitaSaturno: number
  velocidadeRotacaoSaturno: number
  raioSaturno: number
  segmentosSaturno: number
  rugosidadeSaturno: number
  metalicidadeSaturno: number
  faseInicial?: number
  inclinacaoGraus?: number
  aneisQuantidade?: number
  aneisSegmentosCircunferencia?: number
  aneisRaioInternoMult?: number
  aneisRaioExternoMult?: number
  aneisInclinacaoRad?: number
  aneisTexturaLargura?: number
  aneisTexturaAltura?: number
  aneisLarguraBase?: number
  aneisLarguraOscilacao?: number
  aneisLarguraDivisor?: number
  aneisEspacamentoBase?: number
  aneisEspacamentoMultiplo?: number
  aneisEspacamentoDivisor?: number
  aneisOpacidadeBase?: number
  aneisOpacidadeOscAmp?: number
  aneisOpacidadeOscFreq?: number
  aneisOpacidadeOscPhase?: number
  aneisCorHueInicial?: number
  aneisCorHuePasso?: number
  aneisCorSaturacao?: number
  aneisCorLumInicial?: number
  aneisCorLumPasso?: number
  aneisBrilhoLadoClaro?: number
  aneisBrilhoLadoEscuro?: number
  aneisOpacidadeMultiplicador?: number
  aneisCorGlobal?: string
  aneisGanhoLuz?: number
  aneisIluminacaoMinima?: number
}

export interface ConfigUrano {
  raioOrbita: number
  velocidadeOrbitaUrano: number
  velocidadeRotacaoUrano: number
  raioUrano: number
  segmentosUrano: number
  rugosidadeUrano: number
  metalicidadeUrano: number
  faseInicial?: number
  inclinacaoGraus?: number
}

export interface ConfigNetuno {
  raioOrbita: number
  velocidadeOrbitaNetuno: number
  velocidadeRotacaoNetuno: number
  raioNetuno: number
  segmentosNetuno: number
  rugosidadeNetuno: number
  metalicidadeNetuno: number
  faseInicial?: number
  inclinacaoGraus?: number
}

export interface ConfigBloom {
  intensidade: number
  limiarLuminancia: number
  suavizacaoLuminancia: number
}

export interface ConfigPosProcessamento {
  bloom: ConfigBloom
  godRays?: {
    habilitado: boolean
    samples: number
    density: number
    decay: number
    weight: number
    exposure: number
    clampMax: number
  }
}

export interface ConfigControlesOrbita {
  amortecimento: boolean
  fatorAmortecimento: number
  permitirPan: boolean
  distanciaMinima: number
  distanciaMaxima: number
}

export interface ConfigControlesTeclado {
  velocidadeBase: number
  multiplicadorTurbo: number
}

export const camera: ConfigCamera = {
  posicao: [0, 200, 0],
  campoDeVisao: 55,
  planoProximo: 0.1,
  planoDistante: 20000,
}

export const exibicao: ConfigExibicao = {
  densidadePixels: [1, 2],
  corFundo: 'rgba(0, 0, 17, 1)',
  antiSerrilhado: true,
  exposicaoTomAces: 1.35,
}

export const luzAmbiente: ConfigLuzAmbiente = {
  intensidade: 0.58,
  cor: '#404040',
}

export const estrelas: ConfigEstrelas = {
  raio: 800,
  profundidade: 400,
  quantidade: 12000,
  fator: 4,
  saturacao: 0,
  esmaecer: true,
}

export const fundoEstrelado: ConfigFundoEstrelado = {
  tamanhos: [1.18, 1.5, 0.34, 0.48, 0.7],
  cores: [
    '#ffffff', '#f8fbff', '#eef7ff', '#e1f0ff',
    '#fff2cc', '#ffe8a3', '#ffd27a', '#ffbf5f',
    '#cfe9ff', '#a6d8ff', '#7fc8ff', '#45b3ff',
    '#ffd6e7', '#ffb3c7', '#ff8aa3', '#ff6b6b',
    '#e3ffd6', '#b9ff9c', '#8cff66', '#5fe08c'
  ],
  quantidadePorTamanho: 22000,
  quantidadesPorTamanho: [12000, 8000, 4000, 1500, 500],
  fatorDecaimentoQuantidade: 0.6,
  opacidadeBase: 0.55,
  desvioOpacidade: 0.1,
  raio: 5000,
  tamanhoTexturaPontos: 64,
}

export const fundoEstreladoBrilhantes: ConfigFundoEstreladoBrilhantes = {
  quantidade: 21600,
  escalas: [1.0, 1.8, 3.0],
  opacidades: [0.85, 0.32, 0.1],
  tamanhoTexturaHalo: 128,
}

export const sol: ConfigSol = {
  posicao: [0, 0, 0],
  intensidade: 5,
  raio: 5,
  haloEscalas: [8, 14, 22],
  haloOpacidades: [1.0, 0.35, 0.12],
  corNucleo: '#ffffff',
  corHalo: '#ffe2a8',
  sombras: {
    larguraMapa: 2048,
    alturaMapa: 2048,
    planoProximo: 1,
    planoDistante: 2000,
    limiteEsquerda: -120,
    limiteDireita: 120,
    limiteTopo: 120,
    limiteFundo: -120,
  },
  tamanhoTexturaBrilho: 256,
  segmentosSol: 64,
  corLuz: '#fff2cc',
}

export const terraLua: ConfigTerraLua = {
  raioOrbita: 50,
  velocidadeOrbita: 0.0004,
  velocidadeRotacaoTerra: 0.003,
  distanciaLua: 3,
  velocidadeOrbitaLua: 0.0032,
  raioTerra: 1.6,
  segmentosTerra: 64,
  raioLua: 0.35,
  segmentosLua: 32,
  rugosidadeTerra: 0.85,
  metalicidadeTerra: 0.0,
  rugosidadeLua: 0.95,
  metalicidadeLua: 0.0,
  faseInicial: 2.1,
  inclinacaoOrbitaLuaGraus: 5.145,
  inclinacaoGraus: 23.44,
}

export const marte: ConfigMarte = {
  raioOrbita: 60.8,
  velocidadeOrbitaMarte: 0.00028,
  velocidadeRotacaoMarte: 0.004,
  raioMarte: 0.85 * 1.6,
  segmentosMarte: 64,
  rugosidadeMarte: 0.85,
  metalicidadeMarte: 0.0,
  faseInicial: 3.5,
}

const velOrbital = (raioOrbita: number, raioOrbitaTerra = terraLua.raioOrbita, velTerra = terraLua.velocidadeOrbita) => {
  const a = Math.max(raioOrbita / raioOrbitaTerra, 0.1);
  return velTerra / Math.pow(a, 1.5);
};

export const mercurio: ConfigMercurio = {
  raioOrbita: 19.5,
  velocidadeOrbitaMercurio: velOrbital(19.5),
  velocidadeRotacaoMercurio: 0.0002,
  raioMercurio: 0.383 * 1.6,
  segmentosMercurio: 48,
  rugosidadeMercurio: 0.9,
  metalicidadeMercurio: 0.0,
  faseInicial: 0.1,
  inclinacaoGraus: 0.03,
}

export const venus: ConfigVenus = {
  raioOrbita: 36,
  velocidadeOrbitaVenus: velOrbital(36),
  velocidadeRotacaoVenus: -0.0001,
  raioVenus: 0.949 * 1.6,
  segmentosVenus: 64,
  rugosidadeVenus: 0.85,
  metalicidadeVenus: 0.0,
  faseInicial: 1.3,
  inclinacaoGraus: 177.36,
}

export const jupiter: ConfigJupiter = {
  raioOrbita: 260,
  velocidadeOrbitaJupiter: velOrbital(260),
  velocidadeRotacaoJupiter: 0.01,
  raioJupiter: 11.21 * 1.6,
  segmentosJupiter: 64,
  rugosidadeJupiter: 0.8,
  metalicidadeJupiter: 0.0,
  faseInicial: 0.6,
  inclinacaoGraus: 3.13,
}

export const saturno: ConfigSaturno = {
  raioOrbita: 479,
  velocidadeOrbitaSaturno: velOrbital(479),
  velocidadeRotacaoSaturno: 0.008,
  raioSaturno: 9.45 * 1.6,
  segmentosSaturno: 64,
  rugosidadeSaturno: 0.85,
  metalicidadeSaturno: 0.0,
  faseInicial: 2.7,
  inclinacaoGraus: 16.73,
  aneisSegmentosCircunferencia: 256,
  aneisTexturaLargura: 2048,
  aneisTexturaAltura: 8,

  aneisRaioInternoMult: 1.11,
  aneisRaioExternoMult: 2.30,

  aneisQuantidade: 2200,
  aneisLarguraBase: 12.16,
  aneisLarguraOscilacao: 0.0025,
  aneisLarguraDivisor: 240,
  aneisEspacamentoBase: 0.004,
  aneisEspacamentoMultiplo: 0.01,
  aneisEspacamentoDivisor: 150,

  aneisOpacidadeBase: 0.03,
  aneisOpacidadeOscAmp: 0.55,
  aneisOpacidadeOscFreq: 1.6,
  aneisOpacidadeOscPhase: 0.0,

  aneisCorHueInicial: 0.11,
  aneisCorHuePasso: 0.0,
  aneisCorSaturacao: 0.22,
  aneisCorLumInicial: 0.86,
  aneisCorLumPasso: 0.0,

  aneisBrilhoLadoClaro: 1.35,
  aneisBrilhoLadoEscuro: 0.06,
  aneisOpacidadeMultiplicador: 1.0,

  aneisCorGlobal: 'auto',

  aneisGanhoLuz: 0.2,
  aneisIluminacaoMinima: 0.08,
}

export const urano: ConfigUrano = {
  raioOrbita: 960,
  velocidadeOrbitaUrano: velOrbital(960),
  velocidadeRotacaoUrano: 0.006,
  raioUrano: 4.01 * 1.6,
  segmentosUrano: 64,
  rugosidadeUrano: 0.85,
  metalicidadeUrano: 0.0,
  faseInicial: 1.9,
  inclinacaoGraus: 97.77,
}

export const netuno: ConfigNetuno = {
  raioOrbita: 1505,
  velocidadeOrbitaNetuno: velOrbital(1505),
  velocidadeRotacaoNetuno: 0.0065,
  raioNetuno: 3.88 * 1.6,
  segmentosNetuno: 64,
  rugosidadeNetuno: 0.85,
  metalicidadeNetuno: 0.0,
  faseInicial: 4.0,
  inclinacaoGraus: 28.32,
}

export const posProcessamento: ConfigPosProcessamento = {
  bloom: {
    intensidade: 0.9,
    limiarLuminancia: 0.6,
    suavizacaoLuminancia: 0.2,
  },
  godRays: {
    habilitado: true,
    samples: 150,
    density: 0.985,
    decay: 0.965,
    weight: 0.65,
    exposure: 0.26,
    clampMax: 1.0,
  },
}

export const controlesOrbita: ConfigControlesOrbita = {
  amortecimento: true,
  fatorAmortecimento: 0.08,
  permitirPan: true,
  distanciaMinima: 2,
  distanciaMaxima: 1200,
}

export const controlesTeclado: ConfigControlesTeclado = {
  velocidadeBase: 25,
  multiplicadorTurbo: 3.5,
}
