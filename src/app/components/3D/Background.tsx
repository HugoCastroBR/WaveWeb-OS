import React, { useRef } from 'react'
import { OrbitControls, Stars } from '@react-three/drei'
const Background = (props: any) => {


  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 50, 10]} color='#fefdff' intensity={500}/>
      <pointLight position={[6,3,5]} color='#4900ff' intensity={250}/>
      <pointLight position={[6,-3,0]} color='#ff00c1' intensity={200}/>
      <Stars
        radius={180}
        depth={1}
        count={10000}
        factor={5}
        saturation={0.4}
        fade
        speed={0.1}
      />
      <mesh {...props}>
        {/* <sphereGeometry attach="geometry" args={[1, 32, 32]} /> */}
        {props.children}
      </mesh>
    </>
  )
}

export default Background