import { forwardRef, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { terraLua as cfg } from "@src/configuracoes/config";

const TerraLua = forwardRef(function TerraLua(_, referenciaTerra) {
  const referenciaOrbitaTerra = useRef();
  const referenciaOrbitaLua = useRef();

  const base = import.meta.env.BASE_URL || "/";
  const [texturaTerra, texturaLua] = useTexture([
    `${base}textures/earth.jpg`,
    `${base}textures/moon.jpg`,
  ]);

  texturaTerra.colorSpace = THREE.SRGBColorSpace;
  texturaLua.colorSpace = THREE.SRGBColorSpace;

  useFrame(() => {
    if (referenciaTerra?.current) referenciaTerra.current.rotation.y += cfg.velocidadeRotacaoTerra;
    if (referenciaOrbitaTerra.current) referenciaOrbitaTerra.current.rotation.y += cfg.velocidadeOrbita;
    if (referenciaOrbitaLua.current) referenciaOrbitaLua.current.rotation.y += cfg.velocidadeOrbitaLua;
  });

  return (
    <group ref={referenciaOrbitaTerra}>
      <group position={[cfg.raioOrbita, 0, 0]}>
        <mesh ref={referenciaTerra} castShadow receiveShadow>
          <sphereGeometry args={[cfg.raioTerra, cfg.segmentosTerra, cfg.segmentosTerra]} />
          <meshStandardMaterial map={texturaTerra} roughness={cfg.rugosidadeTerra} metalness={cfg.metalicidadeTerra} />
        </mesh>

        <group ref={referenciaOrbitaLua}>
          <mesh position={[cfg.distanciaLua, 0, 0]} castShadow receiveShadow>
            <sphereGeometry args={[cfg.raioLua, cfg.segmentosLua, cfg.segmentosLua]} />
            <meshStandardMaterial map={texturaLua} roughness={cfg.rugosidadeLua} metalness={cfg.metalicidadeLua} />
          </mesh>
        </group>
      </group>
    </group>
  );
});

export default TerraLua;
