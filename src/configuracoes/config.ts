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
}

export interface ConfigFundoEstreladoBrilhantes {
  quantidade: number
  escalas: [number, number, number]
  opacidades: [number, number, number]
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
  haloEscalas: [number, number, number]
  haloOpacidades: [number, number, number]
  corNucleo: string
  corHalo: string
  sombras: ConfigSombrasDirecional
  tamanhoTexturaBrilho?: number
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
}

export interface ConfigMarte {
  raioOrbita: number
  velocidadeOrbitaMarte: number
  velocidadeRotacaoMarte: number
  raioMarte: number
  segmentosMarte: number
  rugosidadeMarte: number
  metalicidadeMarte: number
}

export interface ConfigBloom {
  intensidade: number
  limiarLuminancia: number
  suavizacaoLuminancia: number
}

export interface ConfigPosProcessamento {
  bloom: ConfigBloom
}

export const camera: ConfigCamera = {
  posicao: [0, 150, 0],
  campoDeVisao: 55,
  planoProximo: 0.1,
  planoDistante: 5000,
}

export const exibicao: ConfigExibicao = {
  densidadePixels: [1, 2],
  corFundo: 'black',
  antiSerrilhado: true,
  exposicaoTomAces: 1.35,
}

export const luzAmbiente: ConfigLuzAmbiente = {
  intensidade: 0.1,
}

export const estrelas: ConfigEstrelas = {
  raio: 180,
  profundidade: 90,
  quantidade: 8000,
  fator: 4,
  saturacao: 0,
  esmaecer: true,
}

export const fundoEstrelado: ConfigFundoEstrelado = {
  tamanhos: [0.1, 0.1, 0.1],
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
  raio: 1200,
}

export const fundoEstreladoBrilhantes: ConfigFundoEstreladoBrilhantes = {
  quantidade: 30,
  escalas: [0.2, 2.0, 9.0],
  opacidades: [231.0, 10.5, 10.28],
}

export const sol: ConfigSol = {
  posicao: [0, 0, 0],
  intensidade: 7.5,
  haloEscalas: [3, 5, 7],
  haloOpacidades: [1.0, 20.5, 30.28],
  corNucleo: '#f0af4eff',
  corHalo: '#f0af4eff',
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
}

export const terraLua: ConfigTerraLua = {
  raioOrbita: 40,
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
}

export const marte: ConfigMarte = {
  raioOrbita: 50,
  velocidadeOrbitaMarte: 0.0004,
  velocidadeRotacaoMarte: 0.004,
  raioMarte: 1.6,
  segmentosMarte: 64,
  rugosidadeMarte: 0.85,
  metalicidadeMarte: 0.0,
}

export const posProcessamento: ConfigPosProcessamento = {
  bloom: {
    intensidade: 0.9,
    limiarLuminancia: 0.6,
    suavizacaoLuminancia: 0.2,
  },
}
