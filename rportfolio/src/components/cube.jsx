import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";

function RotatingCube() {
  const cubeRef = useRef();

  useFrame(() => {
    cubeRef.current.rotation.x += 0.01;
    cubeRef.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={cubeRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#d75b45" />
    </mesh>
  );
}

function Cube() {
  return (
    <Canvas>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 3, 3]} />
      <RotatingCube />
      <OrbitControls />
    </Canvas>
  );
}

export default Cube;