import { forwardRef, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { saturno as cfg, sol as cfgSol } from "@src/configuracoes/config";

const Saturno = forwardRef(function Saturno(_, referenciaPlaneta) {
  const referenciaOrbita = useRef();
  const referenciaCentro = useRef();
  const materiaisRef = useRef([]);
  const uniformesAneis = useMemo(() => ({
    uSunPosition: { value: new THREE.Vector3(...cfgSol.posicao) },
    uRingCenter: { value: new THREE.Vector3() },
    uBright: { value: cfg.aneisBrilhoLadoClaro ?? 1.3 },
    uDark: { value: cfg.aneisBrilhoLadoEscuro ?? 0.95 },
    uOpacityMul: { value: cfg.aneisOpacidadeMultiplicador ?? 1.0 },
  }), []);

  const base = import.meta.env.BASE_URL || "/";
  const [textura] = useTexture([`${base}textures/planetas/saturno.jpg`]);
  textura.colorSpace = THREE.SRGBColorSpace;

  const texturaAneis = useMemo(() => {
    const w = cfg.aneisTexturaLargura ?? 1024, h = cfg.aneisTexturaAltura ?? 16;
    const canvas = document.createElement("canvas");
    canvas.width = w; canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    const gradient = ctx.createLinearGradient(0, 0, w, 0);
    gradient.addColorStop(0.0, "rgba(255,255,255,0.0)");
    gradient.addColorStop(0.02, "rgba(255,255,255,0.10)");
    const stops = [
      [0.06, 0.30], [0.08, 0.15], [0.11, 0.45], [0.13, 0.20], [0.16, 0.55],
      [0.18, 0.25], [0.22, 0.40], [0.25, 0.18], [0.29, 0.48], [0.33, 0.22],
      [0.36, 0.35], [0.39, 0.12], [0.43, 0.50], [0.47, 0.28], [0.51, 0.38],
      [0.55, 0.16], [0.58, 0.44], [0.61, 0.26], [0.65, 0.34], [0.69, 0.14],
      [0.73, 0.42], [0.77, 0.24], [0.81, 0.32], [0.85, 0.12], [0.90, 0.28]
    ];
    for (const [p, a] of stops) {
      gradient.addColorStop(Math.max(0, p - 0.004), `rgba(255,255,255,${a * 0.35})`);
      gradient.addColorStop(Math.min(1, p + 0.004), `rgba(255,255,255,${a * 0.10})`);
    }
    gradient.addColorStop(0.97, "rgba(255,255,255,0.08)");
    gradient.addColorStop(1.0, "rgba(255,255,255,0.0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.wrapS = THREE.ClampToEdgeWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.magFilter = THREE.LinearFilter;
    tex.minFilter = THREE.LinearMipMapLinearFilter;
    return tex;
  }, []);

  useFrame(() => {
    if (referenciaPlaneta?.current) referenciaPlaneta.current.rotation.y += cfg.velocidadeRotacaoSaturno;
    if (referenciaOrbita.current) referenciaOrbita.current.rotation.y += cfg.velocidadeOrbitaSaturno;
    if (referenciaCentro.current) {
      referenciaCentro.current.updateWorldMatrix(true, false);
      const pos = new THREE.Vector3();
      referenciaCentro.current.getWorldPosition(pos);
      uniformesAneis.uRingCenter.value.copy(pos);
    }
  });

  return (
    <group ref={referenciaOrbita} rotation={[0, cfg.faseInicial || 0, 0]}>
      <group ref={referenciaCentro} position={[cfg.raioOrbita, 0, 0]}>
        <group rotation={[cfg.aneisInclinacaoRad ?? 0.2, 0, 0]}>
          <mesh ref={referenciaPlaneta} castShadow receiveShadow>
            <sphereGeometry args={[cfg.raioSaturno, cfg.segmentosSaturno, cfg.segmentosSaturno]} />
            <meshStandardMaterial map={textura} roughness={cfg.rugosidadeSaturno} metalness={cfg.metalicidadeSaturno} />
          </mesh>
          <group rotation={[-Math.PI / 2, 0, 0]}>
            {(() => {
              const base = cfg.raioSaturno;
              const rings = [];
              const rMin = base * (cfg.aneisRaioInternoMult ?? 1.22);
              const rMax = base * (cfg.aneisRaioExternoMult ?? 2.35);
              const n = cfg.aneisQuantidade ?? 64;
              const larguraBase = cfg.aneisLarguraBase ?? 0.5;
              const larguraOsc = cfg.aneisLarguraOscilacao ?? 0.15;
              const larguraDiv = cfg.aneisLarguraDivisor ?? 80;
              const gapBase = cfg.aneisEspacamentoBase ?? 0.08;
              const gapMult = cfg.aneisEspacamentoMultiplo ?? 0.02;
              const gapDiv = cfg.aneisEspacamentoDivisor ?? 120;
              const opBase = cfg.aneisOpacidadeBase ?? 0.12;
              const opAmp = cfg.aneisOpacidadeOscAmp ?? 0.5;
              const opFreq = cfg.aneisOpacidadeOscFreq ?? 0.41;
              const opPhase = cfg.aneisOpacidadeOscPhase ?? 0.3;
              const h0 = cfg.aneisCorHueInicial ?? 0.12;
              const hStep = cfg.aneisCorHuePasso ?? 0.0015;
              const s = cfg.aneisCorSaturacao ?? 0.32;
              const l0 = cfg.aneisCorLumInicial ?? 0.78;
              const lStep = cfg.aneisCorLumPasso ?? 0.004;
              let rInner = rMin;
              for (let i = 0; i < n; i++) {
                const span = rMax - rMin;
                const width = (larguraBase + Math.sin(i * 0.7) * larguraOsc) * span / larguraDiv;
                const gap = (gapBase + (i % 4) * gapMult) * span / gapDiv;
                const rOuter = Math.min(rInner + width, rMax);
                const opacity = opBase + opAmp * Math.abs(Math.sin(i * opFreq + opPhase));
                const color = new THREE.Color().setHSL(h0 + i * hStep, s, l0 - i * lStep);
                rings.push({ rInner, rOuter, opacity, color: `#${color.getHexString()}` });
                rInner = rOuter + gap;
                if (rInner >= rMax) break;
              }
              return rings.map((r, idx) => (
                <mesh key={idx}>
                  <ringGeometry args={[r.rInner, r.rOuter, cfg.aneisSegmentosCircunferencia ?? 180]} />
                  <meshStandardMaterial
                    color={r.color}
                    transparent
                    opacity={r.opacity}
                    side={THREE.DoubleSide}
                    alphaMap={texturaAneis || undefined}
                    onBeforeCompile={(shader) => {
                      shader.uniforms.uSunPosition = uniformesAneis.uSunPosition;
                      shader.uniforms.uRingCenter = uniformesAneis.uRingCenter;
                      shader.uniforms.uBright = uniformesAneis.uBright;
                      shader.uniforms.uDark = uniformesAneis.uDark;
                      shader.uniforms.uOpacityMul = uniformesAneis.uOpacityMul;
                      shader.vertexShader = shader.vertexShader.replace(
                        '#include <common>',
                        '#include <common>\n varying vec3 vWorldPosition;'
                      );
                      shader.vertexShader = shader.vertexShader.replace(
                        '#include <project_vertex>',
                        '#include <project_vertex>\n vWorldPosition = (modelMatrix * vec4(transformed, 1.0)).xyz;'
                      );
                      shader.fragmentShader = shader.fragmentShader.replace(
                        '#include <common>',
                        '#include <common>\n varying vec3 vWorldPosition;\n uniform vec3 uSunPosition;\n uniform vec3 uRingCenter;\n uniform float uBright;\n uniform float uDark;\n uniform float uOpacityMul;'
                      );
                      shader.fragmentShader = shader.fragmentShader.replace(
                        'gl_FragColor = vec4( outgoingLight, diffuseColor.a );',
                        `gl_FragColor = vec4( outgoingLight, diffuseColor.a );
                         {
                           vec3 toSun = normalize(uSunPosition - vWorldPosition);
                           vec3 toCenter = normalize(uRingCenter - vWorldPosition);
                           float side = clamp(dot(toSun, -toCenter), 0.0, 1.0);
                           float bright = mix(uDark, uBright, side);
                           gl_FragColor.rgb *= bright;
                           gl_FragColor.a *= uOpacityMul;
                         }`
                      );
                    }}
                    ref={(m) => { if (m && !materiaisRef.current.includes(m)) materiaisRef.current.push(m); }}
                  />
                </mesh>
              ));
            })()}
          </group>
        </group>
      </group>
    </group>
  );
});

export default Saturno;
