import React, { useEffect, useRef, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { BoxGeometry, Mesh, MeshStandardMaterial, Object3D, TextureLoader } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from '@react-three/drei';

const Sculpture: React.FC = () => {
  const [sculptureModel, setSculptureModel] = useState<Object3D | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Indicador de carregamento

  const BumpMap = 'sculpture-model/map/bump.jpg';
  const DiffuseMap = 'sculpture-model/map/diffuse.jpg';
  const NormalMap = 'sculpture-model/map/normal.jpg';
  const TextureMap = 'sculpture-model/map/texture.jpg';

  const setupModel = (data: any): Object3D | null => {
    const model = data.scene.children[0];
    return model;
  }

  // Carregue as texturas fora da função loadSculpture
  const [textureMap, normalMap, bumpMap, diffuseMap] = useLoader(TextureLoader, [
    TextureMap,
    NormalMap,
    BumpMap,
    DiffuseMap,
  ]);

  const loadSculpture = async () => {
    const loader = new GLTFLoader();

    try {
      const sculptureModel = await loader.loadAsync('./sculpture-model/scene.gltf');
      const sculpture = setupModel(sculptureModel);
      sculpture?.scale.set(0.1, 0.1, 0.1);
      sculpture?.position.set(0, 0, 0);

      sculpture?.traverse((child) => {
        if (child instanceof Mesh) {
          const material = child.material as MeshStandardMaterial;
          material.metalness = 0.1;
          material.roughness = 0.6;
          material.color.set(1.2, 1.2, 1.2);
          material.map = textureMap;
          material.normalMap = normalMap;
          material.bumpMap = bumpMap;
          material.bumpScale = 0.1;
        }
      });

      const centerGroup = new Object3D();
      centerGroup.add(sculpture as Object3D);

      const cubeMaterial = new MeshStandardMaterial({
        normalMap: normalMap,
        bumpMap: bumpMap,
        map: textureMap,
        roughness: 0.6,
        roughnessMap: diffuseMap,
        metalness: 0.2,
      });

      const cubeGeometry = new BoxGeometry(20, 3, 20);

      const cubeMesh = new Mesh(cubeGeometry, cubeMaterial);
      cubeMesh.position.set(-1.5, -6, -8);
      cubeMesh.material.color.set(1, 1, 1);

      centerGroup.add(cubeMesh);

      centerGroup.position.set(0, -1, 0);
      centerGroup.rotation.set(0, 0, 0);
      centerGroup.scale.set(0.08, 0.08, 0.08);
      setSculptureModel(centerGroup);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading Sculpture model:', error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadSculpture();
  }, []);

  const modelRef = useRef<Object3D | null>(null);
  useFrame(() => {
    if (modelRef.current) {
      // modelRef.current.rotation.x += 0.005; // Rotação em torno do eixo X
      modelRef.current.rotation.y += 0.00025; // Rotação em torno do eixo Y
    }
  });

  return (
    <>
      {sculptureModel && !isLoading && <primitive object={sculptureModel} ref={modelRef} />}
      
    </>
  );
}

export default Sculpture;
