import React from 'react'
import { usePlane } from '@react-three/cannon'
import * as THREE from 'three';


export default function Desk(props) {
    const [ref] = usePlane(() => ({ position: [0, 0, 0], ...props }))

    return (
        <mesh ref={ref} material={new THREE.MeshPhongMaterial({color: "#101010"})}>
            <planeBufferGeometry attach="geometry" args={[100, 100]} />
        </mesh>
    )
}
