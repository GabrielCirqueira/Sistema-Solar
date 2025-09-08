import { useEffect, useMemo, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { sol as configSol } from "@src/configuracoes/config";

function usarTexturaBrilhoRadial() {
  return useMemo(() => {
    const tamanho = Number.isFinite(configSol.tamanhoTexturaBrilho)
      ? configSol.tamanhoTexturaBrilho
      : 256;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = tamanho;
    const ctx = canvas.getContext("2d");
    const cx = tamanho / 2;
    const cy = tamanho / 2;
    const r = tamanho / 2;
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    g.addColorStop(0.0, "rgba(255,255,255,1)");
    g.addColorStop(0.5, "rgba(255,255,255,0.5)");
    g.addColorStop(1.0, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, tamanho, tamanho);
    const textura = new THREE.CanvasTexture(canvas);
    textura.colorSpace = THREE.SRGBColorSpace;
    textura.minFilter = THREE.LinearFilter;
    textura.magFilter = THREE.LinearFilter;
    textura.needsUpdate = true;
    return textura;
  }, []);
}

export default function Sol({ referenciaAlvo }) {
  const { scene } = useThree();
  const referenciaLuzDirecional = useRef(null);
  const referenciaMalhaSol = useRef(null);
  const vetorTemporario = useMemo(() => new THREE.Vector3(), []);
  const texturaBrilho = usarTexturaBrilhoRadial();

  useEffect(() => {
    if (referenciaLuzDirecional.current) scene.add(referenciaLuzDirecional.current.target);
  }, [scene]);

  useFrame(() => {
    if (!referenciaLuzDirecional.current || !referenciaAlvo?.current) return;
    referenciaAlvo.current.getWorldPosition(vetorTemporario);
    referenciaLuzDirecional.current.target.position.copy(vetorTemporario);
    referenciaLuzDirecional.current.target.updateMatrixWorld();
  });

  return (
    <group position={configSol.posicao}>
      <mesh ref={referenciaMalhaSol}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshBasicMaterial color={configSol.corNucleo} toneMapped={false} />
      </mesh>

      <sprite scale={[configSol.haloEscalas[0], configSol.haloEscalas[0], 1]}>
        <spriteMaterial
          map={texturaBrilho}
          transparent
          opacity={configSol.haloOpacidades[0]}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
          color={configSol.corHalo}
        />
      </sprite>

      <sprite scale={[configSol.haloEscalas[1], configSol.haloEscalas[1], 1]}>
        <spriteMaterial
          map={texturaBrilho}
          transparent
          opacity={configSol.haloOpacidades[1]}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
          color={configSol.corHalo}
        />
      </sprite>

      <sprite scale={[configSol.haloEscalas[2], configSol.haloEscalas[2], 1]}>
        <spriteMaterial
          map={texturaBrilho}
          transparent
          opacity={configSol.haloOpacidades[2]}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
          color={configSol.corHalo}
        />
      </sprite>

      <directionalLight
        ref={referenciaLuzDirecional}
        position={[0, 0, 0]}
        intensity={configSol.intensidade}
        castShadow
        shadow-mapSize-width={configSol.sombras.larguraMapa}
        shadow-mapSize-height={configSol.sombras.alturaMapa}
        shadow-camera-near={configSol.sombras.planoProximo}
        shadow-camera-far={configSol.sombras.planoDistante}
        shadow-camera-left={configSol.sombras.limiteEsquerda}
        shadow-camera-right={configSol.sombras.limiteDireita}
        shadow-camera-top={configSol.sombras.limiteTopo}
        shadow-camera-bottom={configSol.sombras.limiteFundo}
      />
    </group>
  );
}
