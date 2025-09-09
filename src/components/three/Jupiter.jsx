import { forwardRef, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { jupiter as cfg } from "@src/configuracoes/config";

const Jupiter = forwardRef(function Jupiter(_, referenciaPlaneta) {
  const referenciaOrbita = useRef();

  const base = import.meta.env.BASE_URL || "/";
  const [textura] = useTexture([`${base}textures/planetas/jupter.jpg`]);
  textura.colorSpace = THREE.SRGBColorSpace;

  useFrame(() => {
    if (referenciaPlaneta?.current) referenciaPlaneta.current.rotation.y += cfg.velocidadeRotacaoJupiter;
    if (referenciaOrbita.current) referenciaOrbita.current.rotation.y += cfg.velocidadeOrbitaJupiter;
  });

  return (
    <group ref={referenciaOrbita} rotation={[0, cfg.faseInicial || 0, 0]}>
      <group position={[cfg.raioOrbita, 0, 0]}>
        <mesh ref={referenciaPlaneta} castShadow receiveShadow>
          <sphereGeometry args={[cfg.raioJupiter, cfg.segmentosJupiter, cfg.segmentosJupiter]} />
          <meshStandardMaterial map={textura} roughness={cfg.rugosidadeJupiter} metalness={cfg.metalicidadeJupiter} />
        </mesh>
      </group>
    </group>
  );
});

export default Jupiter;
