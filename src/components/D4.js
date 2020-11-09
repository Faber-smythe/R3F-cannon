
import React from 'react'
import * as THREE from "three";
import {get_d4_materials} from "../3Dscript/materials.js";
import {useConvexPolyhedron} from "@react-three/cannon";

import diceFormer from "../3Dscript/diceFormer.js";
let former = diceFormer()

export default function D4(props) {

    let material = get_d4_materials(1, 1);
    let geom = new THREE.TetrahedronGeometry(1)

    geom.faces.forEach(function(face, i){face.materialIndex = i});

    // WORK ON UVS MAPS
    let equi_tri_height = Math.sin(Math.PI/3)
    let half_margin = ((1-equi_tri_height)/2);

    for(let i=0 ; i<4 ; i++){
        geom.faceVertexUvs[0][i] = [
            new THREE.Vector2(0.5, 0-half_margin),
            new THREE.Vector2(1, equi_tri_height-half_margin),
            new THREE.Vector2(0, equi_tri_height-half_margin)
        ];
    }
    const [ref] = useConvexPolyhedron(() => ({
        args:geom,
        mass: 1,
        position:[-4, 0, 3],
        rotation: props.rotation,
    }))

    return (
        <mesh
            ref={ref}
            material={material}
            geometry={geom}>
        </mesh>
    )
}

