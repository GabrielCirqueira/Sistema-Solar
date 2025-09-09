import { useEffect, useMemo, useRef } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { fundoEstrelado as cfg, fundoEstreladoBrilhantes as cfgBrilho } from "@src/configuracoes/config";

function criarTexturaPonto(tamanho = 64) {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = tamanho;
  const ctx = canvas.getContext("2d");
  const cx = tamanho / 2;
  const cy = tamanho / 2;
  const r = tamanho / 2;
  const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
  g.addColorStop(0.0, "rgba(255,255,255,1)");
  g.addColorStop(0.6, "rgba(255,255,255,0.35)");
  g.addColorStop(1.0, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, tamanho, tamanho);
  const textura = new THREE.CanvasTexture(canvas);
  textura.colorSpace = THREE.SRGBColorSpace;
  textura.minFilter = THREE.LinearFilter;
  textura.magFilter = THREE.LinearFilter;
  textura.needsUpdate = true;
  return textura;
}

function posicaoAleatoriaEmCasca(raio) {
  const u = Math.random();
  const v = Math.random();
  const theta = 2 * Math.PI * u;
  const phi = Math.acos(2 * v - 1);
  const r = raio * (0.98 + Math.random() * 0.02);
  const x = r * Math.sin(phi) * Math.cos(theta);
  const y = r * Math.sin(phi) * Math.sin(theta);
  const z = r * Math.cos(phi);
  return [x, y, z];
}

function corHexParaRgb(hex) {
  let h = hex.replace('#', '');
  if (h.length === 3) h = h.split('').map((ch) => ch + ch).join('');
  const r = parseInt(h.substring(0, 2), 16) / 255;
  const g = parseInt(h.substring(2, 4), 16) / 255;
  const b = parseInt(h.substring(4, 6), 16) / 255;
  return [r, g, b];
}

export default function FundoEstrelado() {
  const grupoRef = useRef();
  const mapa = useMemo(() => criarTexturaPonto(cfg.tamanhoTexturaPontos ?? 64), [cfg.tamanhoTexturaPontos]);
  const texturaHalo = useMemo(() => {
    const tamanho = cfgBrilho.tamanhoTexturaHalo ?? 128;
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = tamanho;
    const ctx = canvas.getContext('2d');
    const cx = tamanho / 2;
    const cy = tamanho / 2;
    const r = tamanho / 2;
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    g.addColorStop(0.0, 'rgba(255,255,255,1)');
    g.addColorStop(0.4, 'rgba(255,255,255,0.55)');
    g.addColorStop(0.7, 'rgba(255,255,255,0.22)');
    g.addColorStop(1.0, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, tamanho, tamanho);
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.needsUpdate = true;
    return tex;
  }, []);

  const nuvens = useMemo(() => {
    const resultado = [];
    const raio = cfg.raio;
    const paleta = cfg.cores;
    cfg.tamanhos.forEach((tamanho, idx) => {
      const base = cfg.quantidadePorTamanho;
      const dec = cfg.fatorDecaimentoQuantidade ?? 1.0;
      const total = (cfg.quantidadesPorTamanho && cfg.quantidadesPorTamanho[idx] != null)
        ? cfg.quantidadesPorTamanho[idx]
        : Math.max(1, Math.floor(base * Math.pow(dec, idx)));
      const positions = new Float32Array(total * 3);
      const colors = new Float32Array(total * 3);
      for (let i = 0; i < total; i++) {
        const [x, y, z] = posicaoAleatoriaEmCasca(raio);
        positions[i * 3 + 0] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
        const cor = paleta[Math.floor(Math.random() * paleta.length)] || '#ffffff';
        const [r, g, b] = corHexParaRgb(cor);
        colors[i * 3 + 0] = r;
        colors[i * 3 + 1] = g;
        colors[i * 3 + 2] = b;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
      const op = Math.max(0, Math.min(1, (cfg.opacidadeBase ?? 0.4) + ((Math.random() * 2 - 1) * (cfg.desvioOpacidade ?? 0))))
      const mat = new THREE.PointsMaterial({
        size: tamanho,
        map: mapa,
        transparent: true,
        opacity: op,
        depthWrite: false,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: false,
      });
      resultado.push({ geo, mat });
    });
    return resultado;
  }, [mapa]);

  const estrelasBrilhantes = useMemo(() => {
    const lista = [];
    const raio = cfg.raio;
    const paleta = cfg.cores;
    for (let i = 0; i < cfgBrilho.quantidade; i++) {
      const [x, y, z] = posicaoAleatoriaEmCasca(raio);
      const cor = paleta[Math.floor(Math.random() * paleta.length)] || '#ffffff';
      lista.push({ key: `b-${i}`, pos: [x, y, z], cor });
    }
    return lista;
  }, []);


  useEffect(() => {
    return () => {
      nuvens.forEach(({ geo, mat }) => { geo.dispose(); mat.dispose(); });
      mapa.dispose();
      texturaHalo.dispose();
    };
  }, [nuvens, mapa, texturaHalo]);

  return (
    <group ref={grupoRef}>
      {nuvens.map(({ geo, mat }, idx) => (
        <points key={idx} geometry={geo} material={mat} />
      ))}
      {estrelasBrilhantes.map((e) => (
        <group key={e.key} position={e.pos}>
          <sprite scale={[cfgBrilho.escalas[0], cfgBrilho.escalas[0], 1]}>
            <spriteMaterial map={texturaHalo} transparent opacity={cfgBrilho.opacidades[0]} depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} color={e.cor} />
          </sprite>
          <sprite scale={[cfgBrilho.escalas[1], cfgBrilho.escalas[1], 1]}>
            <spriteMaterial map={texturaHalo} transparent opacity={cfgBrilho.opacidades[1]} depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} color={e.cor} />
          </sprite>
          <sprite scale={[cfgBrilho.escalas[2], cfgBrilho.escalas[2], 1]}>
            <spriteMaterial map={texturaHalo} transparent opacity={cfgBrilho.opacidades[2]} depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} color={e.cor} />
          </sprite>
        </group>
      ))}
    </group>
  );
}
