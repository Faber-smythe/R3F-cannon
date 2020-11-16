
import React from 'react'
import * as THREE from "three";
import {create_dice_materials} from "../3Dscript/materials.js";

import {useConvexPolyhedron} from '@react-three/cannon'
import diceFormer from "../3Dscript/diceFormer.js";
let former = diceFormer();

export default function D6() {

    let material = create_dice_materials(former.standard_d20_dice_face_labels, 30, 0.7);
    material = material.slice(1, 7);

    let geom = new THREE.BoxGeometry(1)

    // Arrange opposite faces equal sum
    const materialIndices = [0, 5, 1, 4, 2, 3]

    geom.faces.forEach(function(face, i){
        face.materialIndex = materialIndices[Math.floor(i/2)]
    });

    // Assign geometry to component
    const [ref] = useConvexPolyhedron(() => ({
        args:geom,
        mass: 10,
        rotation:[Math.PI*1.4, 0, Math.PI*1.6],
        position:[2, 0, 2]
    }))
    return (
        <mesh
            ref={ref}
            material={material}
            geometry={geom}>
        </mesh>
    )
}