import { forwardRef, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { mercurio as cfg } from "@src/configuracoes/config";

const Mercurio = forwardRef(function Mercurio(_, referenciaPlaneta) {
  const referenciaOrbita = useRef();

  const base = import.meta.env.BASE_URL || "/";
  const [textura] = useTexture([`${base}textures/planetas/mercurio.jpg`]);
  textura.colorSpace = THREE.SRGBColorSpace;

  useFrame(() => {
    if (referenciaPlaneta?.current) referenciaPlaneta.current.rotation.y += cfg.velocidadeRotacaoMercurio;
    if (referenciaOrbita.current) referenciaOrbita.current.rotation.y += cfg.velocidadeOrbitaMercurio;
  });

  return (
    <group ref={referenciaOrbita} rotation={[0, cfg.faseInicial || 0, 0]}>
      <group position={[cfg.raioOrbita, 0, 0]}>
        <mesh ref={referenciaPlaneta} castShadow receiveShadow>
          <sphereGeometry args={[cfg.raioMercurio, cfg.segmentosMercurio, cfg.segmentosMercurio]} />
          <meshStandardMaterial map={textura} roughness={cfg.rugosidadeMercurio} metalness={cfg.metalicidadeMercurio} />
        </mesh>
      </group>
    </group>
  );
});

export default Mercurio;
