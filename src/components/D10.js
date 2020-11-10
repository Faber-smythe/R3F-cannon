
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

const colors = [
    'red', 'aliceblue', 'aqua', 'cadetblue', 'fuchsia', 'chartreuse',
    'chocolate', 'darkblue', 'darkgreen', 'darkslateblue', 'lightpink',
    'red', 'aliceblue', 'aqua', 'cadetblue', 'fuchsia', 'chartreuse',
    'chocolate', 'darkblue', 'darkgreen', 'darkslateblue', 'lightpink',
    'red', 'aliceblue', 'aqua', 'cadetblue', 'fuchsia', 'chartreuse',
    'chocolate', 'darkblue', 'darkgreen', 'darkslateblue', 'lightpink',
    'red', 'aliceblue', 'aqua', 'cadetblue', 'fuchsia', 'chartreuse',
    'chocolate', 'darkblue', 'darkgreen', 'darkslateblue', 'lightpink',
    'red', 'aliceblue', 'aqua', 'cadetblue', 'fuchsia', 'chartreuse',
    'chocolate', 'darkblue', 'darkgreen', 'darkslateblue', 'lightpink',
    'red', 'aliceblue', 'aqua', 'cadetblue', 'fuchsia', 'chartreuse',
    'chocolate', 'darkblue', 'darkgreen', 'darkslateblue', 'lightpink',
    'red', 'aliceblue', 'aqua', 'cadetblue', 'fuchsia', 'chartreuse',
    'chocolate', 'darkblue', 'darkgreen', 'darkslateblue', 'lightpink',
    'red', 'aliceblue', 'aqua', 'cadetblue', 'fuchsia', 'chartreuse',
    'chocolate', 'darkblue', 'darkgreen', 'darkslateblue', 'lightpink',
]
function Get3dModel() {


    let material = create_dice_materials(former.standard_d20_dice_face_labels, 30, 1);
    // 10 lightpink D10.js:55
    // 21 lightpink D10.js:55
    // 32 lightpink D10.js:55
    // 43 lightpink D10.js:55
    // 54 lightpink D10.js:55
    // 65 lightpink

    //volatile
    const loader = new THREE.TextureLoader();
    const texture = loader.load(texture234);
    material = new THREE.MeshPhongMaterial({map:texture});

    const gltf = useLoader(GLTFLoader, D10_blender)

    let geom = new THREE.Geometry().fromBufferGeometry(gltf.scene.children[0].geometry);
    material = [];
    geom.faceVertexUvs[0].forEach(function(elem, i){
        switch(i){
            case 0:
            case 1:
                material.push(new THREE.MeshPhongMaterial({color: 'red'}))
                break;
            case 2:
            case 3:
                material.push(new THREE.MeshPhongMaterial({color: 'aliceblue'}))
                break;
            case 4:
            case 5:
                material.push(new THREE.MeshPhongMaterial({color: 'chocolate'}))
                break;
            case 6:
            case 7:
                material.push(new THREE.MeshPhongMaterial({color: 'darkgreen'}))
                break;
            case 8:
            case 9:
                material.push(new THREE.MeshPhongMaterial({color: 'fuchsia'}))
                break;
            case 10:
            case 11:
                material.push(new THREE.MeshPhongMaterial({color: 'aqua'}))
                break;
            case 12:
            case 13:
                material.push(new THREE.MeshPhongMaterial({color: 'darkslateblue'}))
                break;
            case 14:
            case 15:
                material.push(new THREE.MeshPhongMaterial({color: 'chartreuse'}))
                break;
            case 16:
            case 17:
                material.push(new THREE.MeshPhongMaterial({color: 'blue'}))
                break;
            case 74:
            case 75:
                material.push(new THREE.MeshPhongMaterial({color: 'lightpink'}))
                break;
            default:
                material.push(new THREE.MeshPhongMaterial({color: 'black'}))
                break;
        }
    if(i == 9){console.log(material[i])}
    })
    console.log(material)
    geom.faces.forEach(function(face, i){
        face.materialIndex = i
    });


    // gltf.scene.children[0].material = material

    const [ref] = useConvexPolyhedron(() => ({
        args:geom,
        mass: 10,
        position:[0.5, 2.5, 3],
        rotation:[Math.PI*-0, Math.PI*0, Math.PI*0]
    }))
    return (
        <mesh
            ref={ref}
            material={material}
            geometry={geom}>
        </mesh>
    )
    // return <primitive object={gltf.scene} position={[0, 0, 0]} />


}

export default function D10() {

    let material = create_dice_materials(former.standard_d20_dice_face_labels, 30, 1);

    let d10_structure = create_d10_geometry();
    // console.log(d10_structure);

    let geom = new THREE.PolyhedronGeometry(d10_structure.vertices, d10_structure.faces, 1, 0)
    // geom = new THREE.BoxGeometry(1)


    // let model;
    // function setModel(gltf){model = gltf}
    //
    // React.useEffect(() => {
    //     new GLTFLoader().load(
    //         D10_blender,
    //         function(gltf){setModel(gltf)}
    //     );
    // }, []);


    // const [ref] = useConvexPolyhedron(() => ({
    //     args:geom,
    //     mass: 0,
    //     rotation:[Math.PI*0.2, Math.PI*1.9, 0],
    //     position:[0, 0, 2]
    // }))
    

    return (
        <>
            {/*<mesh*/}
            {/*    ref={ref}*/}
            {/*    material={test && test.material}*/}
            {/*    geometry={test && test.geometry}>*/}
            {/*</mesh>*/}
            {/*<primitive object={model && model.scene}></primitive>*/}
            <Suspense >
                <Get3dModel />
            </Suspense>
        </>
    )
}