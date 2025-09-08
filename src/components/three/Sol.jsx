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
    const gradiente = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    gradiente.addColorStop(0.0, "rgba(253, 233, 173, 1)");
    gradiente.addColorStop(0.4, "rgba(255,180,60,0.65)");
    gradiente.addColorStop(0.75, "rgba(255,140,30,0.25)");
    gradiente.addColorStop(1.0, "rgba(255,120,0,0.0)");
    ctx.fillStyle = gradiente;
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
        <meshBasicMaterial color="#f8e9c4ff" toneMapped={false} />
      </mesh>

      <sprite scale={[configSol.escalaBrilho1, configSol.escalaBrilho1, 1]}>
        <spriteMaterial
          map={texturaBrilho}
          transparent
          opacity={1}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </sprite>

      <sprite scale={[configSol.escalaBrilho2, configSol.escalaBrilho2, 2]}>
        <spriteMaterial
          map={texturaBrilho}
          transparent
          opacity={0.2}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </sprite>

      <sprite scale={[configSol.escalaBrilho3, configSol.escalaBrilho3, 3]}>
        <spriteMaterial
          map={texturaBrilho}
          opacity={0.15}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
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
