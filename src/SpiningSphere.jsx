import { OrbitControls, Environment } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import React, { useRef } from 'react';
import * as THREE from 'three';

// Fallback implementation of FlakesTexture if not available via import
function FlakesTexture() {
  const canvas = document.createElement('canvas');
  const size = 512;
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext('2d');

  context.fillStyle = 'rgb(127, 127, 255)';
  context.fillRect(0, 0, size, size);

  for (let i = 0; i < 2000; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const radius = Math.random() * 2 + 1;
    const r = Math.random() * 127 + 128;
    const g = Math.random() * 127 + 128;
    const b = Math.random() * 255;
    context.fillStyle = `rgb(${r}, ${g}, ${b})`;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill();
  }

  return new THREE.CanvasTexture(canvas);
}

function Ball({ position = [0, 0, 0], scale = [10, 128, 128] }) {
  const flakesTexture = FlakesTexture(); // Use the custom FlakesTexture
  flakesTexture.wrapS = flakesTexture.wrapT = THREE.RepeatWrapping;
  flakesTexture.repeat.set(10, 6); // Adjust repeat for more glitter density

  const meshRef = useRef();

  // Rotate the sphere slowly
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh ref={meshRef} position={position} castShadow receiveShadow>
      <sphereGeometry args={scale} />
      <meshPhysicalMaterial
        color="#800080" // Rich purple
        roughness={0.05} // Very smooth for high gloss
        metalness={0.2} // Slight metallic hint for reflectivity
        clearcoat={1.0} // Adds a clear coat layer for extra gloss
        clearcoatRoughness={0.1} // Smooth clear coat
        normalMap={flakesTexture} // Use FlakesTexture as normal map for glitter
        normalScale={new THREE.Vector2(0.5, 0.5)} // Adjust bumpiness
        envMapIntensity={2.0} // Stronger environment reflections
        reflectivity={0.9} // High reflectivity for mirror-like surface
      />
    </mesh>
  );
}

function SpinningSphere() {
  return (
    <Canvas
      shadows
      gl={{ antialias: true }}
      camera={{ position: [0, -100, 150], fov: 45 }}
      style={{ width: "100vw", height: "100vh", }}
    >
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[5, 10, 5]}
        intensity={2.5}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[0, 0, 10]} intensity={1.5} distance={30} decay={2} />
      <hemisphereLight skyColor="#4B0082" groundColor="#4B0082" intensity={0.5} />

      {/* Sphere */}
      <Ball scale={[7, 128, 128]} />

      {/* Environment and Controls */}
      <Environment preset="studio" />
      <OrbitControls
        enablePan={false}
        minDistance={15}
        maxDistance={25}
        enableZoom={false}
      />
    </Canvas>
  );
}

export default SpinningSphere;