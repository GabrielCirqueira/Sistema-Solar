import { forwardRef, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { venus as cfg } from "@src/configuracoes/config";

const Venus = forwardRef(function Venus(_, referenciaPlaneta) {
  const referenciaOrbita = useRef();

  const base = import.meta.env.BASE_URL || "/";
  const [textura] = useTexture([`${base}textures/planetas/venus.jpg`]);
  textura.colorSpace = THREE.SRGBColorSpace;

  useFrame(() => {
    if (referenciaPlaneta?.current) referenciaPlaneta.current.rotation.y += cfg.velocidadeRotacaoVenus;
    if (referenciaOrbita.current) referenciaOrbita.current.rotation.y += cfg.velocidadeOrbitaVenus;
  });

  return (
    <group ref={referenciaOrbita} rotation={[0, cfg.faseInicial || 0, 0]}>
      <group position={[cfg.raioOrbita, 0, 0]}>
        <mesh ref={referenciaPlaneta} castShadow receiveShadow>
          <sphereGeometry args={[cfg.raioVenus, cfg.segmentosVenus, cfg.segmentosVenus]} />
          <meshStandardMaterial map={textura} roughness={cfg.rugosidadeVenus} metalness={cfg.metalicidadeVenus} />
        </mesh>
      </group>
    </group>
  );
});

export default Venus;
