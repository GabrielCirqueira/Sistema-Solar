import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Suspense, useRef, useEffect } from "react";
import * as THREE from "three";
import TerraLua from "@src/components/three/TerraLua.jsx";
import Marte from "@src/components/three/Marte.jsx";
import Sol from "@src/components/three/Sol.jsx";
import FundoEstrelado from "@src/components/three/FundoEstrelado.jsx";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { camera, exibicao, luzAmbiente, estrelas, posProcessamento } from "@src/configuracoes/config";

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

      <OrbitControls ref={referenciaControles} makeDefault enableDamping />

      <FundoEstrelado />
      <Stars
        radius={estrelas.raio}
        depth={estrelas.profundidade}
        count={estrelas.quantidade}
        factor={estrelas.fator}
        saturation={estrelas.saturacao}
        fade={estrelas.esmaecer}
      />

      <Sol referenciaAlvo={referenciaTerra} />

      <Suspense fallback={null}>
        <TerraLua ref={referenciaTerra} />
        <Marte ref={referenciaMarte} />
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
