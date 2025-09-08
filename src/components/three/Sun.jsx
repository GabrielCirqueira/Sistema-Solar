import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";

export default function Sun({ position = [30, 10, 20], intensity = 6 }) {
    const dirLightRef = useRef();
    const { scene } = useThree();

    useEffect(() => {
        if (!dirLightRef.current) return;
        dirLightRef.current.target.position.set(0, 0, 0);
        scene.add(dirLightRef.current.target);
    }, [scene]);

    return (
        <group position={position}>
            <mesh>
                <sphereGeometry args={[3.5, 64, 64]} />
                <meshBasicMaterial color={"#f0fcbcff"} />
            </mesh>

            <directionalLight
                ref={dirLightRef}
                castShadow
                intensity={intensity}
                position={[0, 0, 0]}
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-camera-near={1}
                shadow-camera-far={2000}
                shadow-camera-left={-80}
                shadow-camera-right={80}
                shadow-camera-top={80}
                shadow-camera-bottom={-80}
            />
        </group>
    );
}
