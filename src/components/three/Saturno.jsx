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
    uDark: { value: cfg.aneisBrilhoLadoEscuro ?? 0.6 },
    uOpacityMul: { value: cfg.aneisOpacidadeMultiplicador ?? 1.0 },
    uPlanetRadius: { value: cfg.raioSaturno },
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
        <group rotation={[0, 0, (cfg.inclinacaoGraus ? THREE.MathUtils.degToRad(cfg.inclinacaoGraus) : (cfg.aneisInclinacaoRad ?? 0.2))]}>
          <mesh ref={referenciaPlaneta} castShadow receiveShadow>
            <sphereGeometry args={[cfg.raioSaturno, cfg.segmentosSaturno, cfg.segmentosSaturno]} />
            <meshStandardMaterial map={textura} roughness={cfg.rugosidadeSaturno} metalness={cfg.metalicidadeSaturno} />
          </mesh>
          <group rotation={[-Math.PI / 2, 0, 0]}>
            {(() => {
              const base = cfg.raioSaturno;

              // limites absolutos (em unidades de cena)
              const rMin = base * (cfg.aneisRaioInternoMult ?? 1.11);
              const rMax = base * (cfg.aneisRaioExternoMult ?? 2.30);

              // zonas físicas dos anéis (múltiplos do raio do planeta)
              // valores inspirados em dados reais (aprox.):
              // C: ~1.23–1.52  | B: ~1.52–1.95  | Cassini: ~1.95–2.02
              // A: ~2.02–2.28  | F: ~2.33 (finíssimo)
              const ZONES = [
                {
                  name: 'D',
                  multMin: 1.11, multMax: 1.23,
                  opMin: 0.02, opMax: 0.08,
                  hue: 0.11, sat: 0.12, lum: 0.80,
                  widthDiv: 260, gapDiv: 110, wScale: 0.6, gScale: 1.1,
                },
                {
                  name: 'C',
                  multMin: 1.23, multMax: 1.52,
                  opMin: 0.07, opMax: 0.20,
                  hue: 0.11, sat: 0.14, lum: 0.78,
                  widthDiv: 240, gapDiv: 140, wScale: 0.8, gScale: 0.9,
                },
                {
                  name: 'B',
                  multMin: 1.52, multMax: 1.95,
                  opMin: 0.45, opMax: 0.95,
                  hue: 0.12, sat: 0.22, lum: 0.88,
                  widthDiv: 220, gapDiv: 180, wScale: 1.0, gScale: 0.35, // denso
                },
                {
                  name: 'Cassini',
                  multMin: 1.95, multMax: 2.02,
                  opMin: 0.02, opMax: 0.10,
                  hue: 0.10, sat: 0.10, lum: 0.72,
                  widthDiv: 260, gapDiv: 90, wScale: 0.4, gScale: 2.2, // escuro
                },
                {
                  name: 'A',
                  multMin: 2.02, multMax: 2.28,
                  opMin: 0.20, opMax: 0.55,
                  hue: 0.11, sat: 0.20, lum: 0.86,
                  widthDiv: 240, gapDiv: 150, wScale: 0.9, gScale: 0.8,
                },
              ];

              const rings = [];
              let idx = 0;

              const addRing = (rin, rout, opacity, color) => {
                rings.push({ rInner: rin, rOuter: rout, opacity, color });
              };

              for (const z of ZONES) {
                const zMin = Math.max(rMin, base * z.multMin);
                const zMax = Math.min(rMax, base * z.multMax);
                if (zMin >= zMax) continue;

                let rInner = zMin;
                const zoneSpan = zMax - zMin;

                while (rInner < zMax) {
                  // larguras/gaps finos que variam e criam "anelizações"
                  const width = (
                    (cfg.aneisLarguraBase * z.wScale) +
                    Math.sin(idx * 0.73) * (cfg.aneisLarguraOscilacao * 50.0) // micro-variação
                  ) * (zoneSpan / z.widthDiv);

                  let gap = (
                    (cfg.aneisEspacamentoBase * z.gScale) +
                    (idx % 4) * cfg.aneisEspacamentoMultiplo
                  ) * (zoneSpan / z.gapDiv);

                  const rOuter = Math.min(rInner + Math.max(width, zoneSpan / 2000), zMax);
                  const rMid = 0.5 * (rInner + rOuter);
                  const multMid = rMid / base; // posição em múltiplos do raio do planeta
                  const tZone = (multMid - z.multMin) / Math.max(1e-6, (z.multMax - z.multMin));

                  // opacidade oscila dentro dos limites da zona
                  const osc = 0.5 + 0.5 * Math.sin(idx * (0.62 + z.sat) + multMid * 1.7);
                  const opacity = THREE.MathUtils.clamp(
                    z.opMin + (z.opMax - z.opMin) * osc,
                    z.opMin, z.opMax
                  );

                  // cor HSL por zona (tons quentes/amarelados como nas fotos)
                  const hue = z.hue - 0.005 * tZone;       // ligeiro shift radial
                  const sat = z.sat;                        // saturação baixa
                  const lum = z.lum + 0.04 * (1.0 - tZone); // um pouco mais claro no interior
                  const color = new THREE.Color().setHSL(hue, sat, lum);

                  // aberturas específicas no A: Encke (~2.217) e Keeler (~2.265)
                  if (z.name === 'A') {
                    if (Math.abs(multMid - 2.217) < 0.008) {
                      gap *= 12.0; // Encke gap bem marcado
                    }
                    if (Math.abs(multMid - 2.265) < 0.004) {
                      gap *= 6.0; // Keeler gap, mais estreito
                    }
                  }

                  // adiciona o anel atual
                  addRing(rInner, rOuter, opacity, `#${color.getHexString()}`);

                  rInner = rOuter + gap;
                  idx++;
                }
              }

              // F ring — muito fino e tênue, logo fora do A
              const fCenter = base * 2.33;
              const fHalfW = base * 0.007; // visualmente fino
              addRing(fCenter - fHalfW, fCenter + fHalfW, 0.12, `#${new THREE.Color().setHSL(0.11, 0.18, 0.85).getHexString()}`);

              return rings.map((r, i) => (
                <mesh key={i}>
                  <ringGeometry args={[r.rInner, r.rOuter, cfg.aneisSegmentosCircunferencia ?? 256]} />
                  <meshStandardMaterial
                    // usa cor automática por anel quando cfg.aneisCorGlobal === 'auto'
                    color={cfg.aneisCorGlobal === 'auto' ? r.color : (cfg.aneisCorGlobal ?? r.color)}
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
                      shader.uniforms.uPlanetRadius = uniformesAneis.uPlanetRadius;
                      shader.vertexShader = shader.vertexShader.replace(
                        '#include <common>',
                        '#include <common>\n varying vec3 vWorldPosition;\n varying vec3 vWorldNormal;'
                      );
                      shader.vertexShader = shader.vertexShader.replace(
                        '#include <project_vertex>',
                        '#include <project_vertex>\n vWorldPosition = (modelMatrix * vec4(transformed, 1.0)).xyz;\n vWorldNormal = normalize(mat3(modelMatrix) * objectNormal);'
                      );
                      shader.fragmentShader = shader.fragmentShader.replace(
                        '#include <common>',
                        '#include <common>\n varying vec3 vWorldPosition;\n varying vec3 vWorldNormal;\n uniform vec3 uSunPosition;\n uniform vec3 uRingCenter;\n uniform float uBright;\n uniform float uDark;\n uniform float uOpacityMul;\n uniform float uPlanetRadius;'
                      );
                      shader.fragmentShader = shader.fragmentShader.replace(
                        'gl_FragColor = vec4( outgoingLight, diffuseColor.a );',
                        `gl_FragColor = vec4( outgoingLight, diffuseColor.a );
                         {
                           // Direção do Sol relativa ao centro do planeta
                           vec3 sunDirCenter = normalize(uSunPosition - uRingCenter);
                           // Normal do plano do anel em espaço de mundo
                           vec3 ringNormal = normalize(vWorldNormal);
                           // Projeta direção do Sol no plano do anel para definir a metade iluminada
                           vec3 sunDirProj = sunDirCenter - ringNormal * dot(sunDirCenter, ringNormal);
                           float lenProj = length(sunDirProj);
                           sunDirProj = lenProj > 1e-5 ? sunDirProj / lenProj : vec3(1.0, 0.0, 0.0);
                           vec3 outward = normalize(vWorldPosition - uRingCenter);
                           float side = clamp(0.5 + 0.5 * dot(outward, sunDirProj), 0.0, 1.0);
                           float bright = mix(uDark, uBright, side);

                           // Sombra geométrica do planeta nos anéis
                           vec3 toSunVec = uSunPosition - vWorldPosition;
                           float distToSun = length(toSunVec);
                           vec3 dirToSun = toSunVec / max(distToSun, 1e-6);
                           vec3 centerToFrag = uRingCenter - vWorldPosition;
                           float tProj = dot(centerToFrag, dirToSun);
                           float between = step(0.0, tProj) * step(tProj, distToSun);
                           float distRayToCenter = length(cross(dirToSun, centerToFrag));
                           float inShadow = step(distRayToCenter, uPlanetRadius);
                           float shadowMask = between * inShadow;
                           // Escurece totalmente onde o planeta bloqueia a luz
                           float shadowFactor = 1.0 - shadowMask;

                           gl_FragColor.rgb *= bright * shadowFactor;
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
