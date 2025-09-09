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
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { camera, exibicao, luzAmbiente, estrelas, posProcessamento, controlesOrbita, controlesTeclado } from "@src/configuracoes/config";

export default function App() {
  const referenciaControles = useRef(null);
  const referenciaTerra = useRef(null);
  const referenciaMarte = useRef(null);

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
      <ambientLight intensity={luzAmbiente.intensidade} />

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

      <Sol />

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
      </EffectComposer>
    </Canvas>
  );
}

function ControladorTeclado({ controlesRef }) {
  const { camera } = useThree();
  const pressionadas = useRef({});

  useEffect(() => {
    const aoPressionar = (e) => {
      const relevantes = [
        "w",
        "a",
        "s",
        "d",
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        "Control",
        "Shift",
        " ",
        "Space",
      ];
      if ((e.ctrlKey || e.metaKey) && (e.key === "w" || e.key === "W")) {
        e.preventDefault();
        e.stopPropagation();
      }
      if (relevantes.includes(e.key)) e.preventDefault();
      pressionadas.current[e.key] = true;
    };
    const aoSoltar = (e) => {
      pressionadas.current[e.key] = false;
    };
    window.addEventListener("keydown", aoPressionar, { passive: false });
    window.addEventListener("keyup", aoSoltar);
    return () => {
      window.removeEventListener("keydown", aoPressionar);
      window.removeEventListener("keyup", aoSoltar);
    };
  }, []);

  useFrame((_, delta) => {
    controlesRef.current?.update?.();

    const moveFrente = !!(pressionadas.current["w"] || pressionadas.current["ArrowUp"]);
    const moveTras = !!(pressionadas.current["s"] || pressionadas.current["ArrowDown"]);
    const moveEsq = !!(pressionadas.current["a"] || pressionadas.current["ArrowLeft"]);
    const moveDir = !!(pressionadas.current["d"] || pressionadas.current["ArrowRight"]);
    const turbo = !!pressionadas.current["Control"];
    const subir = !!(pressionadas.current[" "] || pressionadas.current["Space"]);
    const descer = !!pressionadas.current["Shift"];

    const velocidadeBase = controlesTeclado.velocidadeBase;
    const multiplicador = turbo ? controlesTeclado.multiplicadorTurbo : 1.0;
    const velocidade = velocidadeBase * multiplicador * delta;

    const frente = new THREE.Vector3();
    camera.getWorldDirection(frente);
    frente.y = 0;
    if (frente.lengthSq() < 1e-6) {
      frente.set(0, 0, -1);
    } else {
      frente.normalize();
    }

    const direita = new THREE.Vector3(0, 1, 0).cross(frente).normalize();

    const dir = new THREE.Vector3(0, 0, 0);
    if (moveFrente) dir.add(frente);
    if (moveTras) dir.sub(frente);
    if (moveDir) dir.add(direita);
    if (moveEsq) dir.sub(direita);
    if (subir) dir.y += 1;
    if (descer) dir.y -= 1;
    if (dir.lengthSq() > 0) dir.normalize().multiplyScalar(velocidade);

    camera.position.add(dir);
    if (controlesRef.current?.target) {
      controlesRef.current.target.add(dir);
      controlesRef.current.update?.();
    }
  });

  return null;
}
