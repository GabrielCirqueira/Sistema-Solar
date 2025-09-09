import { forwardRef, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { marte as cfg } from "@src/configuracoes/config";

const Marte = forwardRef(function Marte(_, referenciaMarte) {
  const referenciaOrbitaMarte = useRef();

  const base = import.meta.env.BASE_URL || "/";
  const [texturaMarte] = useTexture([
    `${base}textures/planetas/marte.jpg`,
  ]);

  texturaMarte.colorSpace = THREE.SRGBColorSpace;

  useFrame(() => {
    if (referenciaMarte?.current) referenciaMarte.current.rotation.y += cfg.velocidadeRotacaoMarte;
    if (referenciaOrbitaMarte.current) referenciaOrbitaMarte.current.rotation.y += cfg.velocidadeOrbitaMarte;
  });

  return (
    <group ref={referenciaOrbitaMarte} rotation={[0, cfg.faseInicial || 0, 0]}>
      <group position={[cfg.raioOrbita, 0, 0]}>
        <mesh ref={referenciaMarte} castShadow receiveShadow>
          <sphereGeometry args={[cfg.raioMarte, cfg.segmentosMarte, cfg.segmentosMarte]} />
          <meshStandardMaterial map={texturaMarte} roughness={cfg.rugosidadeMarte} metalness={cfg.metalicidadeMarte} />
        </mesh>
      </group>
    </group>
  );
});

export default Marte;
