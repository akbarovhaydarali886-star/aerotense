import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Tensegrity3DCanvasProps {
  loadKg: number;
  showVectors: boolean;
  wireframe: boolean;
  woodColor?: string;
  hardwareColor?: string;
}

export const Tensegrity3DCanvas: React.FC<Tensegrity3DCanvasProps> = ({
  loadKg,
  showVectors,
  wireframe,
  woodColor = '#5C4033',
  hardwareColor = '#94A3B8',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  // References to dynamic objects
  const tableGroupRef = useRef<THREE.Group | null>(null);
  const upperPartRef = useRef<THREE.Group | null>(null);
  const centralCableRef = useRef<THREE.Line | null>(null);
  const cornerCablesRef = useRef<THREE.Line[]>([]);
  const weightMeshRef = useRef<THREE.Mesh | null>(null);
  const vectorArrowsRef = useRef<THREE.ArrowHelper[]>([]);
  const materialsRef = useRef<{ [key: string]: THREE.Material }>({});

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      42,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.set(3.2, 2.4, 3.8);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    rendererRef.current = renderer;
    mount.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const mainSpot = new THREE.DirectionalLight(0xfff5ea, 2.2);
    mainSpot.position.set(4, 7, 5);
    mainSpot.castShadow = true;
    mainSpot.shadow.mapSize.width = 1024;
    mainSpot.shadow.mapSize.height = 1024;
    mainSpot.shadow.bias = -0.001;
    scene.add(mainSpot);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.2);
    rimLight.position.set(-4, 3, -3);
    scene.add(rimLight);

    const floorLight = new THREE.DirectionalLight(0xc5a880, 0.4);
    floorLight.position.set(0, -3, 0);
    scene.add(floorLight);

    // Ground reflective floor
    const floorGeo = new THREE.PlaneGeometry(12, 12);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x0e1012,
      roughness: 0.85,
      metalness: 0.1,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.2;
    floor.receiveShadow = true;
    scene.add(floor);

    // Subtle grid on floor
    const grid = new THREE.GridHelper(10, 20, 0x272b30, 0x181a1d);
    grid.position.y = -1.19;
    scene.add(grid);

    // --- BUILD TENSEGRITY STRUCTURE ---
    const tableGroup = new THREE.Group();
    tableGroupRef.current = tableGroup;
    scene.add(tableGroup);

    // Common materials
    const woodMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(woodColor),
      roughness: 0.4,
      metalness: 0.05,
      wireframe: wireframe,
    });
    materialsRef.current.wood = woodMat;

    const metalMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(hardwareColor),
      roughness: 0.25,
      metalness: 0.85,
      wireframe: wireframe,
    });
    materialsRef.current.metal = metalMat;

    const cableMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      linewidth: 2,
    });
    materialsRef.current.cable = cableMat;

    const centralCableMat = new THREE.LineBasicMaterial({
      color: 0x0ea5e9,
      linewidth: 3,
    });
    materialsRef.current.centralCable = centralCableMat;

    // 1. Lower Base Structure (Fixed to floor)
    const baseGroup = new THREE.Group();
    tableGroup.add(baseGroup);

    // Lower base plate
    const basePlateGeo = new THREE.BoxGeometry(2.0, 0.06, 1.0);
    const basePlate = new THREE.Mesh(basePlateGeo, woodMat);
    basePlate.position.set(0, -0.9, 0);
    basePlate.receiveShadow = true;
    basePlate.castShadow = true;
    baseGroup.add(basePlate);

    // Lower Mast: An inverted J/C arch rising up from base center
    const lowerMastPillarGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.9, 16);
    const lowerMastPillar = new THREE.Mesh(lowerMastPillarGeo, metalMat);
    lowerMastPillar.position.set(0, -0.45, 0);
    lowerMastPillar.castShadow = true;
    baseGroup.add(lowerMastPillar);

    const lowerMastOverhangGeo = new THREE.CylinderGeometry(0.035, 0.035, 0.5, 16);
    const lowerMastOverhang = new THREE.Mesh(lowerMastOverhangGeo, metalMat);
    lowerMastOverhang.rotation.z = Math.PI / 2;
    lowerMastOverhang.position.set(0.25, 0.0, 0);
    lowerMastOverhang.castShadow = true;
    baseGroup.add(lowerMastOverhang);

    // Lower central anchor hook
    const lowerAnchorPos = new THREE.Vector3(0.5, 0.0, 0);

    // 2. Upper Floating Structure (Suspended)
    const upperGroup = new THREE.Group();
    upperPartRef.current = upperGroup;
    tableGroup.add(upperGroup);

    // Upper Tabletop Slab
    const tableTopGeo = new THREE.BoxGeometry(2.2, 0.08, 1.1);
    const tableTop = new THREE.Mesh(tableTopGeo, woodMat);
    tableTop.position.set(0, 0.6, 0);
    tableTop.castShadow = true;
    tableTop.receiveShadow = true;
    upperGroup.add(tableTop);

    // Upper Mast: An inverted arch hanging down from tabletop center
    const upperMastPillarGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.8, 16);
    const upperMastPillar = new THREE.Mesh(upperMastPillarGeo, metalMat);
    upperMastPillar.position.set(0, 0.2, 0);
    upperMastPillar.castShadow = true;
    upperGroup.add(upperMastPillar);

    const upperMastOverhangGeo = new THREE.CylinderGeometry(0.035, 0.035, 0.5, 16);
    const upperMastOverhang = new THREE.Mesh(upperMastOverhangGeo, metalMat);
    upperMastOverhang.rotation.z = Math.PI / 2;
    upperMastOverhang.position.set(0.25, -0.2, 0);
    upperMastOverhang.castShadow = true;
    upperGroup.add(upperMastOverhang);

    // Upper central anchor hook: Notice this is positioned BELOW the lower anchor!
    // That means the upper structure HANGS from the lower structure via the central tension cable!
    const upperAnchorPos = new THREE.Vector3(0.5, -0.2, 0);

    // 3. Central Tension Cable (Carries the entire suspended weight)
    const centralPoints = [lowerAnchorPos, upperAnchorPos];
    const centralGeo = new THREE.BufferGeometry().setFromPoints(centralPoints);
    const centralCable = new THREE.Line(centralGeo, centralCableMat);
    tableGroup.add(centralCable);
    centralCableRef.current = centralCable;

    // 4. Perimeter Corner Cables (4 corners to balance against rotation)
    const cornerPositions = [
      { base: new THREE.Vector3(-0.9, -0.87, -0.42), top: new THREE.Vector3(-1.0, 0.56, -0.47) },
      { base: new THREE.Vector3(0.9, -0.87, -0.42), top: new THREE.Vector3(1.0, 0.56, -0.47) },
      { base: new THREE.Vector3(-0.9, -0.87, 0.42), top: new THREE.Vector3(-1.0, 0.56, 0.47) },
      { base: new THREE.Vector3(0.9, -0.87, 0.42), top: new THREE.Vector3(1.0, 0.56, 0.47) },
    ];

    cornerCablesRef.current = [];
    cornerPositions.forEach((pos) => {
      const pts = [pos.base, pos.top];
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const line = new THREE.Line(geo, cableMat);
      tableGroup.add(line);
      cornerCablesRef.current.push(line);
    });

    // 5. Weight Model (Appears on top of table when loadKg > 0)
    const weightGeo = new THREE.CylinderGeometry(0.2, 0.24, 0.28, 24);
    const weightMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37, // Brass / Gold weight
      roughness: 0.2,
      metalness: 0.9,
    });
    const weightMesh = new THREE.Mesh(weightGeo, weightMat);
    weightMesh.position.set(0, 0.8, 0);
    weightMesh.castShadow = true;
    upperGroup.add(weightMesh);
    weightMeshRef.current = weightMesh;

    // --- INTERACTIVE ORBIT CONTROLS ---
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let spherical = { radius: 5.2, theta: Math.PI / 4, phi: Math.PI / 3 };

    const updateCameraPosition = () => {
      spherical.phi = Math.max(0.1, Math.min(Math.PI / 2 - 0.05, spherical.phi));
      camera.position.x = spherical.radius * Math.sin(spherical.phi) * Math.sin(spherical.theta);
      camera.position.y = spherical.radius * Math.cos(spherical.phi);
      camera.position.z = spherical.radius * Math.sin(spherical.phi) * Math.cos(spherical.theta);
      camera.lookAt(0, -0.1, 0);
    };

    updateCameraPosition();

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      previousMousePosition = { x: clientX, y: clientY };
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - previousMousePosition.x;
      const deltaY = clientY - previousMousePosition.y;

      spherical.theta -= deltaX * 0.008;
      spherical.phi -= deltaY * 0.008;

      updateCameraPosition();
      previousMousePosition = { x: clientX, y: clientY };
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      spherical.radius = Math.max(3.0, Math.min(8.0, spherical.radius + e.deltaY * 0.004));
      updateCameraPosition();
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);
    dom.addEventListener('touchstart', handlePointerDown);
    window.addEventListener('touchmove', handlePointerMove);
    window.addEventListener('touchend', handlePointerUp);
    dom.addEventListener('wheel', handleWheel, { passive: false });

    // Window resize
    const handleResize = () => {
      if (!mount) return;
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = (performance.now() - startTime) * 0.001;

      // Subtle atmospheric breathing / micro-vibration in the upper suspended slab
      if (upperGroup) {
        // Tension equilibrium micro-oscillation (sub-millimeter)
        const loadDamp = 1 + loadKg * 0.01;
        const microFloat = Math.sin(elapsed * 2) * (0.004 / loadDamp);
        upperGroup.position.y = microFloat;
      }

      // Gentle auto-rotation when user is not actively dragging
      if (!isDragging) {
        spherical.theta += 0.0015;
        updateCameraPosition();
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      dom.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      dom.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
      dom.removeEventListener('wheel', handleWheel);

      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update dynamic properties when props change
  useEffect(() => {
    // 1. Update Load / Weight appearance
    if (weightMeshRef.current) {
      if (loadKg <= 0) {
        weightMeshRef.current.visible = false;
      } else {
        weightMeshRef.current.visible = true;
        // Scale weight mesh proportional to kg
        const scaleFactor = 0.5 + Math.cbrt(loadKg / 150) * 0.7;
        weightMeshRef.current.scale.set(scaleFactor, scaleFactor, scaleFactor);
        weightMeshRef.current.position.y = 0.64 + (0.28 * scaleFactor) / 2;
      }
    }

    // 2. Update Central Cable Tension color (Blue -> Intense Cyan -> Electric Amber at 150kg)
    if (centralCableRef.current && materialsRef.current.centralCable) {
      const mat = materialsRef.current.centralCable as THREE.LineBasicMaterial;
      const ratio = Math.min(1, loadKg / 150);
      const color = new THREE.Color().lerpColors(
        new THREE.Color(0x38bdf8), // Rest tension
        new THREE.Color(0xf59e0b), // Peak load amber
        ratio
      );
      mat.color = color;
    }

    // 3. Update Wireframe mode
    if (materialsRef.current.wood && materialsRef.current.metal) {
      (materialsRef.current.wood as THREE.MeshStandardMaterial).wireframe = wireframe;
      (materialsRef.current.metal as THREE.MeshStandardMaterial).wireframe = wireframe;
    }

    // 4. Update Wood & Hardware Colors
    if (materialsRef.current.wood) {
      (materialsRef.current.wood as THREE.MeshStandardMaterial).color.set(woodColor);
    }
    if (materialsRef.current.metal) {
      (materialsRef.current.metal as THREE.MeshStandardMaterial).color.set(hardwareColor);
    }

    // 5. Update Force Vector Arrows
    const scene = sceneRef.current;
    if (scene) {
      // Remove old arrows
      vectorArrowsRef.current.forEach((arrow) => scene.remove(arrow));
      vectorArrowsRef.current = [];

      if (showVectors) {
        // Central upward pull vector
        const centralDir = new THREE.Vector3(0, 1, 0);
        const centralOrigin = new THREE.Vector3(0.5, -0.2, 0);
        const centralLength = 0.4 + (loadKg / 150) * 0.6;
        const centralArrow = new THREE.ArrowHelper(
          centralDir,
          centralOrigin,
          centralLength,
          0x0ea5e9,
          0.12,
          0.08
        );
        scene.add(centralArrow);
        vectorArrowsRef.current.push(centralArrow);

        // Corner downward restraint vectors
        const cornerOrigins = [
          new THREE.Vector3(-1.0, 0.56, -0.47),
          new THREE.Vector3(1.0, 0.56, -0.47),
          new THREE.Vector3(-1.0, 0.56, 0.47),
          new THREE.Vector3(1.0, 0.56, 0.47),
        ];

        cornerOrigins.forEach((origin) => {
          const cornerDir = new THREE.Vector3(0, -1, 0);
          const cornerLength = 0.25 + (loadKg / 150) * 0.2;
          const arrow = new THREE.ArrowHelper(
            cornerDir,
            origin,
            cornerLength,
            0x38bdf8,
            0.08,
            0.05
          );
          scene.add(arrow);
          vectorArrowsRef.current.push(arrow);
        });
      }
    }
  }, [loadKg, showVectors, wireframe, woodColor, hardwareColor]);

  return (
    <div className="relative w-full h-[450px] md:h-[540px] bg-gradient-to-b from-[#0F1114] to-[#0A0B0D] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
      {/* 3D Mount Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating telemetry HUD overlay */}
      <div className="absolute top-4 left-4 flex flex-col gap-1.5 pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-tense-bg/80 border border-white/10 backdrop-blur-md text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-zinc-300">REAL-TIME WEBGL DYNAMICS</span>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 pointer-events-none text-[11px] font-mono text-zinc-500 bg-tense-bg/70 px-2.5 py-1 rounded border border-white/5">
        60 FPS | TENSEGRITY v2.4
      </div>
    </div>
  );
};
