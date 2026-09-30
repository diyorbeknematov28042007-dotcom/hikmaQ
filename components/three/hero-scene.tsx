"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import * as THREE from "three";
import { vortexFragment, vortexVertex } from "@/shaders/vortex";

type Quality = "mobile" | "tablet" | "desktop";
type PointerPosition = { x: number; y: number };
type SceneProps = {
  quality: Quality;
  active: boolean;
  pointer: React.RefObject<PointerPosition>;
  onReady: () => void;
  onFailure: () => void;
};

type Particle = {
  radius: number;
  phase: number;
  speed: number;
  depth: number;
  size: number;
  spin: number;
  tilt: number;
};

const counts: Record<Quality, number> = { mobile: 140, tablet: 260, desktop: 440 };

function fraction(n: number) { return n - Math.floor(n); }
function random(index: number, salt: number) { return fraction(Math.sin(index * 127.1 + salt * 311.7) * 43758.5453); }

function buildParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, index) => {
    const radius = 0.95 + Math.pow(random(index, 1), 0.8) * 2.6;
    return {
      radius,
      phase: random(index, 2) * Math.PI * 2,
      speed: (0.07 + random(index, 3) * 0.13) * (random(index, 4) > .22 ? 1 : -.3),
      depth: (random(index, 5) - .5) * 2.8,
      size: .35 + random(index, 6) * (radius > 2.75 ? 1.1 : .75),
      spin: (random(index, 7) - .5) * 1.1,
      tilt: random(index, 8) * Math.PI * 2
    };
  });
}

function Vortex() {
  const material = useRef<THREE.ShaderMaterial>(null);
  useFrame((state) => { if (material.current) material.current.uniforms.uTime.value = state.clock.elapsedTime; });

  return <group rotation={[0, 0, -.18]}>
    <mesh position={[0, 0, -1.05]} renderOrder={1}>
      <planeGeometry args={[7.8, 6.7]} />
      <shaderMaterial ref={material} vertexShader={vortexVertex} fragmentShader={vortexFragment} uniforms={{ uTime: { value: 0 } }} transparent depthWrite={false} side={THREE.DoubleSide} />
    </mesh>
    <mesh rotation={[.3, .08, .38]} position={[0, 0, -.78]}>
      <torusGeometry args={[2.12, .003, 3, 144]} />
      <meshBasicMaterial color="#2bc88b" transparent opacity={.16} depthWrite={false} />
    </mesh>
    <mesh rotation={[-.24, -.08, -.45]} position={[0, 0, -.89]}>
      <torusGeometry args={[2.55, .0025, 3, 144]} />
      <meshBasicMaterial color="#75f5b9" transparent opacity={.08} depthWrite={false} />
    </mesh>
  </group>;
}

function OrbitingTriangles({ count }: { count: number }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const particles = useMemo(() => buildParticles(count), [count]);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const color = useMemo(() => new THREE.Color(), []);

  useEffect(() => {
    const current = mesh.current;
    if (!current) return;
    current.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    particles.forEach((particle, index) => {
      const brightness = .18 + random(index, 9) * .58;
      color.setRGB(.09 * brightness, .9 * brightness, .52 * brightness);
      current.setColorAt(index, color);
      dummy.position.set(Math.cos(particle.phase) * particle.radius, Math.sin(particle.phase) * particle.radius * .7, particle.depth);
      dummy.rotation.set(particle.tilt, particle.phase, particle.tilt);
      dummy.scale.setScalar(particle.size);
      dummy.updateMatrix();
      current.setMatrixAt(index, dummy.matrix);
    });
    current.instanceMatrix.needsUpdate = true;
    if (current.instanceColor) current.instanceColor.needsUpdate = true;
    current.frustumCulled = false;
  }, [particles, color, dummy]);

  useFrame((state) => {
    const current = mesh.current;
    if (!current) return;
    const time = state.clock.elapsedTime;
    particles.forEach((particle, index) => {
      const angle = particle.phase + time * particle.speed;
      const pulse = 1 + Math.sin(time * .42 + particle.phase * 2) * .035;
      dummy.position.set(
        Math.cos(angle) * particle.radius * pulse,
        Math.sin(angle) * particle.radius * .70 * pulse,
        particle.depth + Math.sin(angle * 1.3 + particle.phase) * .19
      );
      dummy.rotation.set(particle.tilt + time * particle.spin * .17, angle, angle * .45 + particle.tilt);
      dummy.scale.setScalar(particle.size * (1 + Math.sin(time * .7 + index) * .08));
      dummy.updateMatrix();
      current.setMatrixAt(index, dummy.matrix);
    });
    current.instanceMatrix.needsUpdate = true;
  });

  return <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
    <coneGeometry args={[.085, .16, 3]} />
    <meshBasicMaterial color="#ffffff" transparent opacity={.65} depthWrite={false} side={THREE.DoubleSide} toneMapped={false} />
  </instancedMesh>;
}

function CameraParallax({ pointer, quality }: { pointer: React.RefObject<PointerPosition>; quality: Quality }) {
  useFrame(({ camera }, delta) => {
    if (quality === "mobile") return;
    const damping = 1 - Math.exp(-delta * 2.4);
    camera.position.x += ((pointer.current?.x ?? 0) * .14 - camera.position.x) * damping;
    camera.position.y += ((pointer.current?.y ?? 0) * .085 - camera.position.y) * damping;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function Scene({ quality, pointer }: { quality: Quality; pointer: React.RefObject<PointerPosition> }) {
  return <>
    <Vortex />
    <OrbitingTriangles count={counts[quality]} />
    <CameraParallax pointer={pointer} quality={quality} />
  </>;
}

export function HeroScene({ quality, active, pointer, onReady, onFailure }: SceneProps) {
  const maxDpr = quality === "mobile" ? 1.25 : quality === "tablet" ? 1.4 : 1.5;
  const [dpr, setDpr] = useState(maxDpr);
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvas) return;
    const lost = (event: Event) => { event.preventDefault(); onFailure(); };
    canvas.addEventListener("webglcontextlost", lost);
    return () => canvas.removeEventListener("webglcontextlost", lost);
  }, [canvas, onFailure]);

  return <Canvas
    className="webgl-canvas"
    dpr={dpr}
    frameloop={active ? "always" : "demand"}
    camera={{ position: [0, 0, 7.5], fov: 48, near: .1, far: 30 }}
    gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
    fallback={null}
    onCreated={({ gl }) => { setCanvas(gl.domElement); onReady(); }}
  >
    <PerformanceMonitor flipflops={3} onDecline={() => setDpr(value => Math.max(1, value - .25))} onIncline={() => setDpr(value => Math.min(maxDpr, value + .25))} onFallback={() => setDpr(1)} />
    <Scene quality={quality} pointer={pointer} />
  </Canvas>;
}
