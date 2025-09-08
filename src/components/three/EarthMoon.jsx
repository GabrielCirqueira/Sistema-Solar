import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

export default function EarthMoon() {
    const earthRef = useRef();
    const moonGroupRef = useRef();

    const base = import.meta.env.BASE_URL || "/";
    const [earthTex, moonTex] = useTexture([
        `${base}textures/earth.jpg`,
        `${base}textures/moon.jpg`,
    ]);

    earthTex.colorSpace = THREE.SRGBColorSpace;
    moonTex.colorSpace = THREE.SRGBColorSpace;

    useFrame(() => {
        if (earthRef.current) earthRef.current.rotation.y += 0.002;
        if (moonGroupRef.current) moonGroupRef.current.rotation.y += 0.01;
    });

    return (
        <group>
            <mesh ref={earthRef} castShadow receiveShadow>
                <sphereGeometry args={[1.5, 64, 64]} />
                <meshStandardMaterial
                    map={earthTex}
                    roughness={0.85}
                    metalness={0.0}
                />
            </mesh>

            <group ref={moonGroupRef}>
                <mesh position={[3, 0, 0]} castShadow receiveShadow>
                    <sphereGeometry args={[0.4, 32, 32]} />
                    <meshStandardMaterial
                        map={moonTex}
                        roughness={0.95}
                        metalness={0.0}
                    />
                </mesh>
            </group>
        </group>
    );
}
