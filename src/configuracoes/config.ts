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
}

export interface ConfigBloom {
  intensidade: number
  limiarLuminancia: number
  suavizacaoLuminancia: number
}

export interface ConfigPosProcessamento {
  bloom: ConfigBloom
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
  intensidade: 0.2,
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
  tamanhos: [1.1, 0.1, 0.1],
  cores: [
    "#f0f8ff", "#e6f2ff", "#d4edff", "#c1e3ff",
    "#9fd3ff", "#8ce6ff", "#7effb0", "#7ac3ff",
    "#ff9b7a", "#ff7e7e", "#fff0e6", "#e6fffa",
    "#f5f0ff", "#ffe6f2", "#f0ffe6", "#ffffe6",
    "#e6f7ff", "#f9f2ff", "#fff2e6", "#e6fff0",
    "#f0e6ff", "#ffe6e6", "#e6ffe6", "#fffff0"
  ],
  quantidadePorTamanho: 600,
  opacidadeBase: 0.35,
  desvioOpacidade: 0.1,
  raio: 5000,
  tamanhoTexturaPontos: 64,
}

export const fundoEstreladoBrilhantes: ConfigFundoEstreladoBrilhantes = {
  quantidade: 9230,
  escalas: [0.2, 2.0, 3.0, 4.0, 5.0, 15.0],
  opacidades: [31.0, 10.5, 20.28, 40.0, 60.0, 100.0],
  tamanhoTexturaHalo: 128,
}

export const sol: ConfigSol = {
  posicao: [0, 0, 0],
  intensidade: 4,
  raio: 5,
  haloEscalas: [6, 9, 12],
  haloOpacidades: [1.0, 20.5, 30.28],
  corNucleo: '#ffffffff',
  corHalo: '#e78b00ff',
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
  aneisQuantidade: 298,
  aneisSegmentosCircunferencia: 180,
  aneisRaioInternoMult: 1.22,
  aneisRaioExternoMult: 2.35,
  aneisInclinacaoRad: 0.2,
  aneisTexturaLargura: 1024,
  aneisTexturaAltura: 6,
  aneisLarguraBase: 0.5,
  aneisLarguraOscilacao: 0.15,
  aneisLarguraDivisor: 80,
  aneisEspacamentoBase: 0.008,
  aneisEspacamentoMultiplo: 0.02,
  aneisEspacamentoDivisor: 120,
  aneisOpacidadeBase: 0.12,
  aneisOpacidadeOscAmp: 0.5,
  aneisOpacidadeOscFreq: 0.41,
  aneisOpacidadeOscPhase: 0.3,
  aneisCorHueInicial: 0.12,
  aneisCorHuePasso: 0.0015,
  aneisCorSaturacao: 0.32,
  aneisCorLumInicial: 10.78,
  aneisCorLumPasso: 0.004,
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
}

export const posProcessamento: ConfigPosProcessamento = {
  bloom: {
    intensidade: 0.9,
    limiarLuminancia: 0.6,
    suavizacaoLuminancia: 0.2,
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
