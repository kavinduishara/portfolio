import { OrbitControls, Environment } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import React, { useState, useEffect, useRef } from 'react';
import useCurrentSection from './components/useCurrentSection';

function Box({ position, color, scale }) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={scale} />
      <meshStandardMaterial
        color={color}
        metalness={0.7}
        roughness={0}
      />
    </mesh>
  );
}

// Easing helper
function easeInOutSine(t) {
  return -(Math.cos(Math.PI * t) - 1) / 2;
}

function RoomContent() {
  const [boxes, setBoxes] = useState([]);
  const spacing = 5.3;

  const groupRefs = useRef({});
  const animating = useRef(false);
  const startRotation = useRef(0);
  const targetRotation = useRef(0);
  const elapsedTime = useRef(0);
  const duration = 1; // seconds for 90° rotation

  const n = useRef(0);
  const sign = useRef(1);
  const num = useRef(0);

  useEffect(() => {
    const temp = [];
    const positions = Array.from({ length: 3 }, (_, i) => (i - 1) * spacing);

    positions.forEach(x => {
      positions.forEach(y => {
        positions.forEach(z => {
          temp.push({
            initial: [x, y , z],
            position: [x, y, z]
          });
        });
      });
    });

    setBoxes(temp);
  }, []);

  useFrame((_, delta) => {
    num.current += delta;

    // Trigger new rotation every 3s
    if (!animating.current && num.current >= 3) {
      n.current = Math.floor(Math.random() * 3);
      sign.current = Math.random() < 0.5 ? 1 : -1;

      const group = Object.values(groupRefs.current)[n.current];
      if (group?.current) {

        startRotation.current = group.current.rotation.y;
        targetRotation.current = startRotation.current + sign.current * Math.PI / 2;
        elapsedTime.current = 0;
        animating.current = true;
      }
      num.current = 0;
    }

    // Animate with easing
    if (animating.current) {
      const group = Object.values(groupRefs.current)[n.current];
      if (group?.current) {
        elapsedTime.current += delta;
        const t = Math.min(elapsedTime.current / duration, 1); // 0 → 1
        const easedT = easeInOutSine(t);
        group.current.rotation.y =
          startRotation.current +
          (targetRotation.current - startRotation.current) * easedT;

        if (t >= 1) {
          animating.current = false; // stop when done
        }
      }
    }
  });

  const groupsByY = boxes.reduce((groups, box) => {
    const y = box.position[1];
    if (!groups[y]) groups[y] = [];
    groups[y].push(box);
    return groups;
  }, {});

  return (
    <>
      {Object.entries(groupsByY).map(([y, groupBoxes]) => {
        if (!groupRefs.current[y]) {
          groupRefs.current[y] = React.createRef();
        }
        return (
          <group key={y} ref={groupRefs.current[y]}>
            {groupBoxes.map(box => (
              <Box
                key={`${box.initial[0]}-${box.initial[1]}-${box.initial[2]}`}
                color="gray"
                position={box.position}
                scale={[5, 5, 5]}
              />
            ))}
          </group>
        );
      })}
      {/* <Box
        color="blue"
        position={[-10,-10,20]}
        scale={[5, 5, 5]}
      />
      <Box
        color="blue"
        position={[10,-10,-10]}
        rotation={[0,2,0]}
        scale={[5, 5, 5]}
      /> */}
    </>
  );
}




function Boxes() {
  return (
    <Canvas
      shadows
      camera={{ position: [30, 15, 30], fov: 60 }}
      style={{ width: "100vw", height: "100vh" }}
    >
      {/* Existing lights */}
      <ambientLight intensity={0.6} color={"blue"} />
      <directionalLight
        position={[-10, 40, 20]}
        intensity={2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={100}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
        color={"blue"}
      />
      <pointLight position={[50, 50, 50]} intensity={1.5} />
      <pointLight position={[50, 50, -50]} intensity={1.5} color={"blue"} />

      {/* Bright blue light from behind the camera */}
      <spotLight
        position={[30, 15, 60]}  // behind the camera
        intensity={3}             // make it bright
        angle={Math.PI / 6}      // narrow cone
        penumbra={0.3}
        color={"blue"}
        castShadow
      />

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[50, -15, 50]} receiveShadow>
        <planeGeometry args={[300, 300]} />
        <shadowMaterial opacity={0.3} />
      </mesh>

      <Environment preset="city" />
      <RoomContent />
      {/* <OrbitControls /> */}
    </Canvas>
  );
}


export default Boxes;
