import { forwardRef, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { urano as cfg } from "@src/configuracoes/config";

const Urano = forwardRef(function Urano(_, referenciaPlaneta) {
  const referenciaOrbita = useRef();

  const base = import.meta.env.BASE_URL || "/";
  const [textura] = useTexture([`${base}textures/planetas/urano.png`]);
  textura.colorSpace = THREE.SRGBColorSpace;

  useFrame(() => {
    if (referenciaPlaneta?.current) referenciaPlaneta.current.rotation.y += cfg.velocidadeRotacaoUrano;
    if (referenciaOrbita.current) referenciaOrbita.current.rotation.y += cfg.velocidadeOrbitaUrano;
  });

  return (
    <group ref={referenciaOrbita} rotation={[0, cfg.faseInicial || 0, 0]}>
      <group position={[cfg.raioOrbita, 0, 0]}>
        <group rotation={[0, 0, THREE.MathUtils.degToRad(cfg.inclinacaoGraus || 0)]}>
          <mesh ref={referenciaPlaneta} castShadow receiveShadow>
          <sphereGeometry args={[cfg.raioUrano, cfg.segmentosUrano, cfg.segmentosUrano]} />
          <meshStandardMaterial map={textura} roughness={cfg.rugosidadeUrano} metalness={cfg.metalicidadeUrano} />
          </mesh>
        </group>
      </group>
    </group>
  );
});

export default Urano;
