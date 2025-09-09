import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Suspense, useRef, useEffect } from "react";
import * as THREE from "three";
import TerraLua from "@src/components/three/TerraLua.jsx";
import Marte from "@src/components/three/Marte.jsx";
import Mercurio from "@src/components/three/Mercurio.jsx";
import Venus from "@src/components/three/Venus.jsx";
import Jupiter from "@src/components/three/Jupiter.jsx";
import Saturno from "@src/components/three/Saturno.jsx";
import Urano from "@src/components/three/Urano.jsx";
import Netuno from "@src/components/three/Netuno.jsx";
import Sol from "@src/components/three/Sol.jsx";
import FundoEstrelado from "@src/components/three/FundoEstrelado.jsx";
import { EffectComposer, Bloom, GodRays } from "@react-three/postprocessing";
import { camera, exibicao, luzAmbiente, estrelas, posProcessamento, controlesOrbita, controlesTeclado } from "@src/configuracoes/config";

export default function App() {
  const referenciaControles = useRef(null);
  const referenciaTerra = useRef(null);
  const referenciaMarte = useRef(null);
  const referenciaSol = useRef(null);

  useEffect(() => {
    referenciaControles.current?.target.set(0, 0, 0);
    referenciaControles.current?.update();
  }, []);

  return (
    <Canvas
      shadows
      camera={{ position: camera.posicao, fov: camera.campoDeVisao, near: camera.planoProximo, far: camera.planoDistante }}
      dpr={exibicao.densidadePixels}
      gl={{ antialias: exibicao.antiSerrilhado }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.outputColorSpace = THREE.SRGBColorSpace;
        gl.toneMappingExposure = exibicao.exposicaoTomAces;
      }}
      style={{ width: "100vw", height: "100vh" }}
    >
      <color attach="background" args={[exibicao.corFundo]} />
      <ambientLight intensity={luzAmbiente.intensidade} color={luzAmbiente.cor} />

      <OrbitControls
        ref={referenciaControles}
        makeDefault
        enableDamping={controlesOrbita.amortecimento}
        dampingFactor={controlesOrbita.fatorAmortecimento}
        enablePan={controlesOrbita.permitirPan}
        mouseButtons={{
          LEFT: THREE.MOUSE.ROTATE,
          MIDDLE: THREE.MOUSE.PAN,
          RIGHT: THREE.MOUSE.ROTATE,
        }}
        minDistance={controlesOrbita.distanciaMinima}
        maxDistance={controlesOrbita.distanciaMaxima}
      />

      <ControladorTeclado controlesRef={referenciaControles} />

      <FundoEstrelado />
      <Stars
        radius={estrelas.raio}
        depth={estrelas.profundidade}
        count={estrelas.quantidade}
        factor={estrelas.fator}
        saturation={estrelas.saturacao}
        fade={estrelas.esmaecer}
      />

      <Sol ref={referenciaSol} />

      <Suspense fallback={null}>
        <Mercurio />
        <Venus />
        <TerraLua ref={referenciaTerra} />
        <Marte ref={referenciaMarte} />
        <Jupiter />
        <Saturno />
        <Urano />
        <Netuno />
      </Suspense>

      <EffectComposer>
        <Bloom
          mipmapBlur
          intensity={posProcessamento.bloom.intensidade}
          luminanceThreshold={posProcessamento.bloom.limiarLuminancia}
          luminanceSmoothing={posProcessamento.bloom.suavizacaoLuminancia}
        />
        {posProcessamento.godRays?.habilitado && referenciaSol.current && (
          <GodRays
            sun={referenciaSol.current}
            samples={posProcessamento.godRays.samples}
            density={posProcessamento.godRays.density}
            decay={posProcessamento.godRays.decay}
            weight={posProcessamento.godRays.weight}
            exposure={posProcessamento.godRays.exposure}
            clampMax={posProcessamento.godRays.clampMax}
          />
        )}
      </EffectComposer>
    </Canvas>
  );
}

function ControladorTeclado({ controlesRef }) {
  const { camera } = useThree();
  const pressionadas = useRef(new Set());
  const velocidade = useRef(new THREE.Vector3());

  useEffect(() => {
    const bloquearAtalhosNavegador = (e) => {
      // Bloqueia Ctrl+W / Cmd+W proativamente
      const isCloseTab = (e.ctrlKey || e.metaKey) && (e.code === 'KeyW');
      if (isCloseTab) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation?.();
        return false;
      }
      return true;
    };

    const aoPressionar = (e) => {
      bloquearAtalhosNavegador(e);
      const relevantes = new Set([
        'KeyW','KeyA','KeyS','KeyD',
        'ArrowUp','ArrowDown','ArrowLeft','ArrowRight',
        'ControlLeft','ControlRight','ShiftLeft','ShiftRight','Space'
      ]);
      if (relevantes.has(e.code)) {
        e.preventDefault();
        e.stopPropagation();
      }
      pressionadas.current.add(e.code);
    };
    const aoSoltar = (e) => {
      pressionadas.current.delete(e.code);
    };
    // Captura cedo para tentar suprimir atalhos e scroll
    window.addEventListener('keydown', aoPressionar, { passive: false, capture: true });
    window.addEventListener('keyup', aoSoltar, { capture: true });
    // Extra: redundância contra Ctrl+W
    const beforeUnload = (ev) => {
      if (pressionadas.current.has('ControlLeft') || pressionadas.current.has('ControlRight')) {
        ev.preventDefault();
        ev.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', beforeUnload);
    return () => {
      window.removeEventListener('keydown', aoPressionar, { capture: true });
      window.removeEventListener('keyup', aoSoltar, { capture: true });
      window.removeEventListener('beforeunload', beforeUnload);
    };
  }, []);

  useFrame((_, delta) => {
    controlesRef.current?.update?.();

    const moveFrente = pressionadas.current.has('KeyW') || pressionadas.current.has('ArrowUp');
    const moveTras   = pressionadas.current.has('KeyS') || pressionadas.current.has('ArrowDown');
    const moveEsq    = pressionadas.current.has('KeyA') || pressionadas.current.has('ArrowLeft');
    const moveDir    = pressionadas.current.has('KeyD') || pressionadas.current.has('ArrowRight');
    const turbo = pressionadas.current.has('ControlLeft') || pressionadas.current.has('ControlRight');
    const subir = pressionadas.current.has('Space');
    const descer = pressionadas.current.has('ShiftLeft') || pressionadas.current.has('ShiftRight');

    const base = controlesTeclado.velocidadeBase;
    const mult = turbo ? controlesTeclado.multiplicadorTurbo : 1.0;
    const targetSpeed = base * mult;

    const frente = new THREE.Vector3();
    camera.getWorldDirection(frente);
    frente.y = 0;
    if (frente.lengthSq() < 1e-6) frente.set(0, 0, -1); else frente.normalize();

    const direita = frente.clone().cross(new THREE.Vector3(0, 1, 0)).normalize();

    const desejada = new THREE.Vector3();
    if (moveFrente) desejada.add(frente);
    if (moveTras)   desejada.sub(frente);
    if (moveDir)    desejada.add(direita);
    if (moveEsq)    desejada.sub(direita);
    if (subir)  desejada.y += 1;
    if (descer) desejada.y -= 1;
    if (desejada.lengthSq() > 0) desejada.normalize().multiplyScalar(targetSpeed);

    // Suavização de velocidade (aceleração/atrito)
    const acel = 10.0;   // aceleração para atingir a velocidade desejada
    const atrito = 8.0;  // desaceleração quando sem input
    const v = velocidade.current;
    const diff = desejada.clone().sub(v);
    const fator = (desejada.lengthSq() > 0 ? acel : atrito) * delta;
    v.add(diff.multiplyScalar(Math.min(Math.max(fator, 0), 1)));

    const desloc = v.clone().multiplyScalar(delta);
    camera.position.add(desloc);
    if (controlesRef.current?.target) {
      controlesRef.current.target.add(desloc);
      controlesRef.current.update?.();
    }
  });

  return null;
}
