import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, Bounds } from "@react-three/drei";
import { Suspense, useRef, useEffect } from "react";
import * as THREE from "three";
import EarthMoon from "@/components/three/EarthMoon.jsx";
import Sun from "@/components/three/Sun.jsx";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

export default function App() {
  const controlsRef = useRef(null);

  useEffect(() => {
    controlsRef.current?.target.set(0, 0, 0);
    controlsRef.current?.update();
  }, []);

  return (
    <Canvas
      shadows
      camera={{ position: [0, 1.8, 8], fov: 60, near: 0.1, far: 4000 }}
      dpr={[1, 2]}
      gl={{ antialias: true }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.outputColorSpace = THREE.SRGBColorSpace;
        gl.toneMappingExposure = 1.35;
      }}
      style={{ width: "100vw", height: "100vh" }}
    >
      <color attach="background" args={["black"]} />
      <ambientLight intensity={0.2} />

      <OrbitControls ref={controlsRef} makeDefault enableDamping />

      <Stars radius={140} depth={80} count={6000} factor={4} saturation={0} fade />

      <Sun position={[40, 20, 200]} intensity={10} />

      <Suspense fallback={null}>
        <Bounds fit clip observe margin={1.2}>
          <EarthMoon />
        </Bounds>
      </Suspense>

      <EffectComposer>
        <Bloom mipmapBlur intensity={0.85} luminanceThreshold={0.6} luminanceSmoothing={0.2} />
      </EffectComposer>
    </Canvas>
  );
}
