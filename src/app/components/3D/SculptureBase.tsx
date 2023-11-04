import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const SculptureBase: React.FC = () => {
  const cubeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cubeRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    const width = 200;
    const height = 200;
    renderer.setSize(width, height);

    cubeRef.current.appendChild(renderer.domElement);

    const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cubeGeometry = new THREE.BoxGeometry();

    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

    camera.position.z = 5;

    scene.add(cube);

    renderer.render(scene, camera);
  }, []);

  return (
    <div ref={cubeRef} style={{ width: '200px', height: '200px' }}>
      {/* O renderizador será anexado aqui */}
    </div>
  );
};


export default SculptureBase