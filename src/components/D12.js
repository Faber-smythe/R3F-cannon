
import React from 'react'
import * as THREE from "three";
import {create_dice_materials} from "../3Dscript/materials.js";

import {useConvexPolyhedron} from '@react-three/cannon'
import diceFormer from "../3Dscript/diceFormer.js";
import texture234 from "../texture234.png";
let former = diceFormer();

export default function D12() {

    //volatile
    const loader = new THREE.TextureLoader();
    const texture = loader.load(texture234);

    let material = create_dice_materials(former.standard_d20_dice_face_labels, 30, 0.7);
    material = material.slice(1, 13);
    let colors = ['aqua', 'chocolate', 'chartreuse', 'fuchsia', 'darkblue', 'red', 'blue', 'darkslateblue', 'lightpink', 'aliceblue', 'yellow', 'darkgrey',
        'aqua', 'chocolate', 'chartreuse', 'fuchsia', 'darkblue', 'red', 'blue', 'darkslateblue', 'lightpink', 'aliceblue', 'yellow', 'darkgrey',
        'aqua', 'chocolate', 'chartreuse', 'fuchsia', 'darkblue', 'red', 'blue', 'darkslateblue', 'lightpink', 'aliceblue', 'yellow', 'darkgrey',]
    material = [];
    colors.forEach(function(color){
        material.push(new THREE.MeshPhongMaterial({color: color}))
    })
    let geom = new THREE.DodecahedronGeometry(1)

    // Arrange opposite faces equal sum

    // const materialIndices = [1, 12, 2, 11, 3, 10, 4, 9, 5, 8, 6, 7]
    geom.faces.forEach(function(face, i){
        if([6, 7, 8, 18, 19, 20, 30, 31, 32].includes(i)) {
            material[i] = new THREE.MeshPhongMaterial({map: texture})

            console.log(material[i])
        }
        face.materialIndex = i
    });

    // Assign geometry to component
    const [ref] = useConvexPolyhedron(() => ({
        args:geom,
        mass: 0,
        rotation:[Math.PI*1.4, 0, Math.PI*1.6],
        position:[0, 0, 2]
    }))
    return (
        <mesh
            ref={ref}
            material={material}
            geometry={geom}>
        </mesh>
    )
}