import { OrbitControls, Environment } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import React, { useState, useEffect, useRef } from 'react';
import { EffectComposer, Bloom } from "@react-three/postprocessing";

function Box({ position, color, scale }) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={scale} />
      <meshStandardMaterial color={color} metalness={0.7} roughness={0} />
    </mesh>
  );
}

function RoomContent() {
  const [boxes, setBoxes] = useState([]);
  const positions = Array.from({ length: 50 }, (_, i) => i * 6-150);
  const positionsz = Array.from({ length: 10 }, (_, i) => i * 6);
  const timeRef = useRef(0);

  useEffect(() => {
    const temp = [];
    const y = -5;
    positions.forEach(x =>
      positionsz.forEach(z => {
        temp.push({
          initial: [x, y, z],
          position: [x, y, z],
        });
      })
    );
    setBoxes(temp);
  }, []);

  useFrame((_, delta) => {
    timeRef.current += delta;
    setBoxes(prev =>
      prev.map(box => {
        const [ix, iy, iz] = box.initial;
        const newY = iy + Math.sin(timeRef.current + ix + iy + iz) * 2;
        return { ...box, position: [ix, newY, iz] };
      })
    );
  });

  return (
    <>
      {boxes.map(item => (
        <Box
          key={`${item.initial[0]}-${item.initial[1]}-${item.initial[2]}`}
          color="gray"
          position={item.position}
          scale={[5, 5, 5]}
        />
      ))}
    </>
  );
}

function GlowingPlane() {
  return (
    <mesh position={[(20 * 6) / 2-150, -7.5, (20 * 6) / 2]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[500,100]} />
      <meshStandardMaterial
        color={"#6b21a8"}
        emissive={"#3b82f6"}
        emissiveIntensity={2.5}
        metalness={0.3}
        roughness={0.2}
      />
    </mesh>
  );
}

function Boxes2() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 70, 50], fov: 60 }}
      style={{ width: "100vw", height: "100vh", zIndex: 1, position: "absolute" }}
    >
      <ambientLight intensity={0.2} color={"#0f172a"} />

      <pointLight
        position={[0, -20, 0]}
        intensity={50}
        distance={300}
        decay={1.5}
        color={"#00f0ff"}
      />

      <spotLight
        position={[0, -50, 0]}
        intensity={80}
        angle={Math.PI / 2.2}
        penumbra={0.9}
        color={"#00f0ff"}
        castShadow
      />

      <GlowingPlane />
      <RoomContent />
      <OrbitControls />

      <EffectComposer>
        <Bloom
          intensity={2}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          height={300}
        />
      </EffectComposer>

      <directionalLight position={[-10, 40, 20]} intensity={1} color={"#3b82f6"} castShadow />
      <pointLight position={[50, 20, 50]} intensity={10} color={"#3b82f6"} />
      <Environment preset="city" />
    </Canvas>
  );
}

export default Boxes2;
