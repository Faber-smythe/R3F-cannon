
import './App.css';
import * as CANNON from 'cannon'

import {Canvas, useFrame} from "react-three-fiber";
import React, {Component, useRef} from "react";
import * as THREE from 'three';

import { Physics, useBox, useConvexPolyhedron} from '@react-three/cannon'

import D4 from './components/D4.js';
import D6 from './components/D6.js';
import D8 from './components/D8.js';
import D10 from './components/D10.js';
import Desk from './components/Desk.js';

import {create_dice_materials} from "./3Dscript/materials.js";
import diceFormer from "./3Dscript/diceFormer";


let former = diceFormer();
export default class extends Component{

    constructor(props){
        super(props);
        this.state = {
        }
    }


    componentDidMount() {
        let section = document.createElement('section');
        {create_dice_materials(former.standard_d20_dice_face_labels, 30, 1).map((mat)=>{
            section.append(mat.map.image);
        })}
        let hey = document.getElementById('hey');
        if(document.getElementById('hey') && typeof(document.getElementById('hey')) !== "undefined"){
            document.getElementById('hey').innerHTML = '';
            document.getElementById('hey').append(section);
            console.log(section);
            console.log(hey);
        }else{
            hey = document.createElement('div');
            hey.id = 'hey';
            hey.append(section);
            document.getElementById('root').append(hey);
            console.log(section);
            console.log(hey);
        }
    }

    render(){
        // canvas preview





        return(
            <>
                <Canvas id="myCanvas">
                    <Physics gravity ={[0, 0, -30]}>
                        {/*<ambientLight />*/}
                        <pointLight position={[5, 5, 10]}  />
                        {/*<spotLight position={[5, 5, 5]} angle={0.3} penumbra={1} intensity={2} castShadow shadow-mapSize-width={1028} shadow-mapSize-height={1028} />*/}

                        <Desk />
                        <D4/>
                        <D6 />
                        <D8 />
                        <D10 />

                    </Physics>
                </Canvas>
                <button onClick={this.spin}> spin </button>
                <div id="hey"></div>

            </>
        )

    }
};
