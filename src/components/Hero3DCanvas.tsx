import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Hero3DCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.set(2.8, 1.8, 3.4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mount.appendChild(renderer.domElement);

    // Warm gallery lighting
    const ambientLight = new THREE.AmbientLight(0xfff6eb, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffeedd, 2.5);
    keyLight.position.set(4, 6, 4);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.6);
    rimLight.position.set(-3, 2, -2);
    scene.add(rimLight);

    // Ambient floating dust particles
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 8;
      particlePositions[i + 1] = (Math.random() - 0.5) * 6;
      particlePositions[i + 2] = (Math.random() - 0.5) * 8;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xc5a880,
      size: 0.025,
      transparent: true,
      opacity: 0.5,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // Floating tensegrity sculpture
    const group = new THREE.Group();
    scene.add(group);

    // Materials
    const walnutMat = new THREE.MeshStandardMaterial({
      color: 0x422c1d,
      roughness: 0.35,
      metalness: 0.08,
    });

    const titaniumMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      roughness: 0.2,
      metalness: 0.9,
    });

    const cableMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      linewidth: 1.5,
      transparent: true,
      opacity: 0.85,
    });

    // Base slab
    const baseGeo = new THREE.BoxGeometry(2.1, 0.07, 1.05);
    const base = new THREE.Mesh(baseGeo, walnutMat);
    base.position.y = -0.7;
    base.castShadow = true;
    base.receiveShadow = true;
    group.add(base);

    // Lower mast pillar
    const lowerPillarGeo = new THREE.CylinderGeometry(0.038, 0.038, 0.75, 20);
    const lowerPillar = new THREE.Mesh(lowerPillarGeo, titaniumMat);
    lowerPillar.position.set(0, -0.35, 0);
    lowerPillar.castShadow = true;
    group.add(lowerPillar);

    const lowerOverhangGeo = new THREE.CylinderGeometry(0.032, 0.032, 0.42, 20);
    const lowerOverhang = new THREE.Mesh(lowerOverhangGeo, titaniumMat);
    lowerOverhang.rotation.z = Math.PI / 2;
    lowerOverhang.position.set(0.21, 0.02, 0);
    lowerOverhang.castShadow = true;
    group.add(lowerOverhang);

    // Suspended floating upper slab
    const floatingGroup = new THREE.Group();
    group.add(floatingGroup);

    const topGeo = new THREE.BoxGeometry(2.3, 0.08, 1.15);
    const topSlab = new THREE.Mesh(topGeo, walnutMat);
    topSlab.position.y = 0.55;
    topSlab.castShadow = true;
    topSlab.receiveShadow = true;
    floatingGroup.add(topSlab);

    // Upper mast pillar hanging down
    const upperPillarGeo = new THREE.CylinderGeometry(0.038, 0.038, 0.7, 20);
    const upperPillar = new THREE.Mesh(upperPillarGeo, titaniumMat);
    upperPillar.position.set(0, 0.2, 0);
    upperPillar.castShadow = true;
    floatingGroup.add(upperPillar);

    const upperOverhangGeo = new THREE.CylinderGeometry(0.032, 0.032, 0.42, 20);
    const upperOverhang = new THREE.Mesh(upperOverhangGeo, titaniumMat);
    upperOverhang.rotation.z = Math.PI / 2;
    upperOverhang.position.set(0.21, -0.15, 0);
    upperOverhang.castShadow = true;
    floatingGroup.add(upperOverhang);

    // Central tension cable
    const centralPts = [new THREE.Vector3(0.42, 0.02, 0), new THREE.Vector3(0.42, -0.15, 0)];
    const centralGeo = new THREE.BufferGeometry().setFromPoints(centralPts);
    const centralLine = new THREE.Line(centralGeo, cableMat);
    group.add(centralLine);

    // Corner suspension cables
    const corners = [
      { b: new THREE.Vector3(-0.95, -0.66, -0.45), t: new THREE.Vector3(-1.05, 0.51, -0.5) },
      { b: new THREE.Vector3(0.95, -0.66, -0.45), t: new THREE.Vector3(1.05, 0.51, -0.5) },
      { b: new THREE.Vector3(-0.95, -0.66, 0.45), t: new THREE.Vector3(-1.05, 0.51, 0.5) },
      { b: new THREE.Vector3(0.95, -0.66, 0.45), t: new THREE.Vector3(1.05, 0.51, 0.5) },
    ];

    corners.forEach((c) => {
      const geo = new THREE.BufferGeometry().setFromPoints([c.b, c.t]);
      const line = new THREE.Line(geo, cableMat);
      group.add(line);
    });

    // Mouse parallax
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      targetRotationY = x * 0.4;
      targetRotationX = y * 0.25;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (!mount) return;
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Animation
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth floating oscillation
      floatingGroup.position.y = Math.sin(elapsed * 1.5) * 0.018;
      floatingGroup.rotation.z = Math.sin(elapsed * 1.1) * 0.005;

      // Parallax easing
      group.rotation.y += (targetRotationY - group.rotation.y) * 0.04 + 0.002;
      group.rotation.x += (targetRotationX - group.rotation.x) * 0.04;

      // Slowly rotate dust particles
      particleSystem.rotation.y = elapsed * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[480px] lg:h-[620px] pointer-events-auto">
      <div ref={mountRef} className="w-full h-full cursor-move" />
      {/* Floating subtle caption */}
      <div className="absolute bottom-6 left-6 flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-xs font-mono text-zinc-300">
        <span className="w-1.5 h-1.5 rounded-full bg-tense-steel animate-ping" />
        <span>LIVE TENSEGRITY PREVIEW | INTERACT WITH CURSOR</span>
      </div>
    </div>
  );
};
