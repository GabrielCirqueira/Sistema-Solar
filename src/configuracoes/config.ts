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
  escalaBrilho1: number
  escalaBrilho2: number
  escalaBrilho3: number
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
  planoProximo: 10.1,
  planoDistante: 1500,
}

export const exibicao: ConfigExibicao = {
  densidadePixels: [0.3, 21],
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
  quantidade: 18000,
  fator: 4,
  saturacao: 10,
  esmaecer: true,
}

export const sol: ConfigSol = {
  posicao: [0, 0, 0],
  intensidade: 7,
  escalaBrilho1: 5,
  escalaBrilho2: 6,
  escalaBrilho3: 8,
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
  raioOrbita: 30,
  velocidadeOrbita: 0.0004,
  velocidadeRotacaoTerra: 0.003,
  distanciaLua: 3,
  velocidadeOrbitaLua: 0.0032,
  raioTerra: 1.6,
  segmentosTerra: 64,
  raioLua: 0.45,
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
