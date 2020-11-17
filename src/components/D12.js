
import React from 'react'
import * as THREE from "three";
import {create_dice_materials} from "../3Dscript/materials.js";

import {useConvexPolyhedron} from '@react-three/cannon'
import diceFormer from "../3Dscript/diceFormer.js";
import texture234 from "../texture234.png";
let former = diceFormer();

export default function D12() {
    let ordered_material = create_dice_materials(former.standard_d20_dice_face_labels, 30, 1.4, 10);
    //volatiles
    const loader = new THREE.TextureLoader();
    const texture = loader.load(texture234);

    let material = create_dice_materials(former.standard_d20_dice_face_labels, 30, 0.7);
    material = material.slice(1, 13);
    let colors = ['aqua', 'chocolate', 'chartreuse', 'fuchsia', 'darkblue', 'red', 'cornflowerblue', 'darkslateblue', 'lightpink', 'aliceblue', 'yellow', 'darkgrey',]
    material = [];
    // colors.forEach(function(color){
    //     material.push(new THREE.MeshPhongMaterial({color: color}))
    // })
    let geom = new THREE.DodecahedronGeometry(1)

    // Arrange opposite faces equal sum

    // const materialIndices = [1, 12, 2, 11, 3, 10, 4, 9, 5, 8, 6, 7]
    geom.faces.forEach(function(face, i){
        switch(i){
            case 0: case 1: case 2:
                // material.push(ordered_material[7])
                material.push(new THREE.MeshPhongMaterial({color: colors[Math.floor(i/3)]}))
                break;
            case 3: case 4: case 5:
                // material.push(ordered_material[2])
                material.push(new THREE.MeshPhongMaterial({color: colors[Math.floor(i/3)]}))
                break;
            case 6: case 7: case 8:
                // material.push(ordered_material[5])
                material.push(new THREE.MeshPhongMaterial({color: colors[Math.floor(i/3)]}))
                break;
            case 9: case 10: case 11:
                // material.push(ordered_material[1])
                material.push(new THREE.MeshPhongMaterial({color: colors[Math.floor(i/3)]}))
                break;
            case 12: case 13: case 14:
                // material.push(ordered_material[6])
                material.push(new THREE.MeshPhongMaterial({color: colors[Math.floor(i/3)]}))
                break;
            case 15: case 16: case 17:
                // material.push(ordered_material[9])
                material.push(new THREE.MeshPhongMaterial({color: colors[Math.floor(i/3)]}))
                break;
            case 18: case 19: case 20:
                // material.push(ordered_material[8])
                material.push(new THREE.MeshPhongMaterial({color: colors[Math.floor(i/3)]}))
                break;
            case 21: case 22: case 23:
                // material.push(ordered_material[3])
                material.push(new THREE.MeshPhongMaterial({color: colors[Math.floor(i/3)]}))
                break;
            case 24: case 25: case 26:
                // material.push(ordered_material[4])
                material.push(new THREE.MeshPhongMaterial({color: colors[Math.floor(i/3)]}))
                break;
            case 27: case 28: case 29:
                // material.push(ordered_material[0])
                material.push(new THREE.MeshPhongMaterial({color: colors[Math.floor(i/3)]}))
                break;
            case 30: case 31: case 32:
                // material.push(ordered_material[0])
                material.push(new THREE.MeshPhongMaterial({color: colors[Math.floor(i/3)]}))
                break;
            case 33: case 34: case 35:
                // material.push(ordered_material[0])
                material.push(new THREE.MeshPhongMaterial({color: colors[Math.floor(i/3)]}))
                break;
            default:
                material.push(new THREE.MeshPhongMaterial({color: '#202020'}))
                break;
        }
        // mapping
        if([30, 31, 32].includes(i)){
            // geom.faceVertexUvs[0][i] = [
            //     new THREE.Vector2(0, 0),
            //     new THREE.Vector2(0.5, 0),
            //     new THREE.Vector2(0.5, 0),
            //     new THREE.Vector2(0.5, 0),
            //     new THREE.Vector2(0.5, 0),
            // ];
            // material[i] = new THREE.MeshPhongMaterial({color: 'red'})
        }else if([6, 7, 8].includes(i)){
            // material[i] = new THREE.MeshPhongMaterial({color: 'green'})
        }else if([18, 19, 20].includes(i)){
            // material[i] = new THREE.MeshPhongMaterial({color: 'blue'})
        }else{
            if([6, 7, 8, 18, 19, 20, 30, 31, 32].includes(i)) {
                // material[i] = new THREE.MeshPhongMaterial({map: texture})

            }
        }
        face.materialIndex = i
    });
    console.log(geom);

    // Assign geometry to component
    const [ref] = useConvexPolyhedron(() => ({
        args:geom,
        mass: 0,
        rotation:[Math.PI*0, Math.PI*-0.25, Math.PI*0],
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