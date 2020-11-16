
import React, {Suspense, useMemo} from 'react'
import * as THREE from "three";
import {useConvexPolyhedron} from '@react-three/cannon'
import { useLoader } from 'react-three-fiber'


import {create_dice_materials} from "../3Dscript/materials.js";
import {create_d10_geometry} from "../3Dscript/geometry.js";

import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import D10_blender from "../D10_blender.glb";


import diceFormer from "../3Dscript/diceFormer.js";
import texture234 from "../texture234.png";
let former = diceFormer();

function Get3dModel() {

    let ordered_material = create_dice_materials(former.standard_d100_dice_face_labels, 30, 1.4, 100);


    const gltf = useLoader(GLTFLoader, D10_blender)

    let geom = new THREE.Geometry().fromBufferGeometry(gltf.scene.children[0].geometry);
    let faceIds_smalls = [1, 5, 7, 11, 15, 2, 8, 12, 16, 74]
    let faceIds_larges = [0, 4, 6, 10, 14, 3, 9, 13, 17, 75]
    let material = [];
    // ------------------------------------
    // TEXTURE MATERIALS
    geom.faceVertexUvs[0].forEach(function(elem, i){
        switch(i){
            case 0:
            case 1:
                material.push(ordered_material[7])
                break;
            case 3:
            case 2:
                material.push(ordered_material[2])
                break;
            case 4:
            case 5:
                material.push(ordered_material[5])
                break;
            case 6:
            case 7:
                material.push(ordered_material[1])
                break;
            case 9:
            case 8:
                material.push(ordered_material[6])
                break;
            case 10:
            case 11:
                material.push(ordered_material[9])
                break;
            case 13:
            case 12:
                material.push(ordered_material[8])
                break;
            case 14:
            case 15:
                material.push(ordered_material[3])
                break;
            case 17:
            case 16:
                material.push(ordered_material[4])
                break;
            case 75:
            case 74:
                material.push(ordered_material[0])
                break;
            default:
                material.push(new THREE.MeshPhongMaterial({color: '#202020'}))
                break;
        }
    })
    geom.faces.forEach(function(face, i){
        face.materialIndex = i
    });

    // ------------------------------------
    // TEXTURE MAPPINGS
    let point_x = former.sin(64)*former.cos(64)*(1-former.tan(64)/2+former.tan(26)/2)

    faceIds_smalls.forEach(function(faceId){
        if([1, 7].includes(faceId)){
            geom.faceVertexUvs[0][faceId] = [
                new THREE.Vector2(
                    1-point_x,
                    (0.5-point_x)*former.tan(26)
                ),
                new THREE.Vector2(
                    point_x,
                    (0.5-point_x)*former.tan(26)
                ),
                new THREE.Vector2(0.5, 0),
            ]
        }else if([5, 11, 15].includes(faceId)){

            geom.faceVertexUvs[0][faceId] = [
                new THREE.Vector2(0.5, 0),
                new THREE.Vector2(
                    1-point_x,
                    (0.5-point_x)*former.tan(26)
                ),
                new THREE.Vector2(
                    point_x,
                    (0.5-point_x)*former.tan(26)
                ),
            ]
        }else{
            geom.faceVertexUvs[0][faceId] = [
                new THREE.Vector2(
                    point_x,
                    (0.5-point_x)*former.tan(26)
                ),
                new THREE.Vector2(0.5, 0),
                new THREE.Vector2(
                    1-point_x,
                    (0.5-point_x)*former.tan(26)
                )
            ]
        }
    })
    faceIds_larges.forEach(function(faceId){
        if([3, 13, 17].includes(faceId)){
            geom.faceVertexUvs[0][faceId] = [
                new THREE.Vector2(0.5,1),
                new THREE.Vector2(
                    point_x,
                    (0.5-point_x)*former.tan(26)
                ),
                new THREE.Vector2(
                    1-point_x,
                    (0.5-point_x)*former.tan(26)
                )
            ]
        }else if([9, 75].includes(faceId)){
            geom.faceVertexUvs[0][faceId] = [
                new THREE.Vector2(
                    point_x,
                    (0.5-point_x)*former.tan(26)
                ),
                new THREE.Vector2(
                    1-point_x,
                    (0.5-point_x)*former.tan(26)
                ),
                new THREE.Vector2(0.5,1),
            ]
        }else{
            geom.faceVertexUvs[0][faceId] = [
                new THREE.Vector2(
                    1-point_x,
                    (0.5-point_x)*former.tan(26)
                ),
                new THREE.Vector2(0.5,1),
                new THREE.Vector2(
                    point_x,
                    (0.5-point_x)*former.tan(26)
                ),
            ]
        }
    })

    const [ref] = useConvexPolyhedron(() => ({
        args: geom,
        mass: 10,
        position: [3, -1, 3.5],
        rotation: [Math.PI*-0.4, Math.PI*0, Math.PI*0]
    }))
    return (
        <mesh
            ref={ref}
            material={material}
            geometry={geom}>
        </mesh>
    )
}

export default function D100() {
    return (
        <>
            <Suspense >
                <Get3dModel />
            </Suspense>
        </>
    )
}