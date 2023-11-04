'use client'
import React, { useRef, useEffect, Suspense } from 'react';
import { Canvas } from 'react-three-fiber';
import Background from '../3D/Background';
import Sculpture from '../3D/Sculpture';

interface ThreeSceneProps {
  children: React.ReactNode;
  withSculpture?: boolean;
}
const ThreeScene = ({
  children,
  withSculpture = true,
}:ThreeSceneProps) => {
  return (
    <div className='h-screen w-screen overflow-y-hidden'>
      {children}
      <Canvas>
        <Suspense fallback={null}>
          <Background>
              {withSculpture && <Sculpture />}
          </Background>
        </Suspense>
      </Canvas>
    </div>
  )
};

export default ThreeScene;