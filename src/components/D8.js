
import React from 'react'
import * as THREE from "three";
import {create_dice_materials} from "../3Dscript/materials.js";

import {useConvexPolyhedron} from '@react-three/cannon'
import diceFormer from "../3Dscript/diceFormer.js";
import texture234 from "../texture234.png";

let former = diceFormer();
const loader = new THREE.TextureLoader();
const texture = loader.load(texture234);

export default function D8() {

    let material = create_dice_materials(former.standard_d20_dice_face_labels, 30, 1.2, 8);
    material = material.slice(1, 9);

    let geom = new THREE.OctahedronGeometry(1)

    // Arrange opposite faces equal sum
    const materialIndices = [0, 2, 4, 6, 5, 7, 1, 3]

    geom.faces.forEach(function(face, i){
        face.materialIndex = materialIndices[i]
    });

    // WORK ON UVS TRIANGLE MAPS
    let equi_tri_height = Math.sin(Math.PI/3)
    let half_margin = ((1-equi_tri_height)/2);

    for(let i=0 ; i<8 ; i++){
        geom.faceVertexUvs[0][i] = [
            new THREE.Vector2(0.5, 0-half_margin),
            new THREE.Vector2(1, equi_tri_height-half_margin),
            new THREE.Vector2(0, equi_tri_height-half_margin)
        ];
    }

    // Assign geometry to component
    const [ref] = useConvexPolyhedron(() => ({
        args:geom,
        mass: 10,
        position:[-2.6, 0, 2],
        rotation:[Math.PI*1.4, 0, Math.PI*1.6]
    }))

    return (
        <mesh
            ref={ref}
            material={material}
            geometry={geom}>
        </mesh>
    )
}