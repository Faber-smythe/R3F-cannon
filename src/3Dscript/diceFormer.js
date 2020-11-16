import * as THREE from 'three';
import CANNON from 'cannon';

// -----------------------
//          FORMER
// -----------------------

export default function diceFormer(){

    let diceFormer = {};

    diceFormer.material_options = {
        specular: 0x172022,
        color: 0xf0f0f0,
        shininess: 100,
        shading: THREE.FlatShading
    };
    diceFormer.label_color = '#aaaaaa';
    diceFormer.dice_color = '#202020';
    // diceFormer.ambient_light_color = 0xf0f5fb;
    // diceFormer.spot_light_color = 0xefdfd5;
    diceFormer.selector_back_colors = { color: 0x000, opacity: 0, shininess: 0 };
    // diceFormer.desk_color = 0xdfdfdf;
    // diceFormer.desk_color = 'transparent';
    diceFormer.use_shadows = true;

    diceFormer.known_types = ['d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd100'];
    diceFormer.dice_face_range = { 'd4': [1, 4], 'd6': [1, 6], 'd8': [1, 8], 'd10': [0, 9],
        'd12': [1, 12], 'd20': [1, 20], 'd100': [0, 9] };
    diceFormer.dice_mass = { 'd4': 300, 'd6': 300, 'd8': 340, 'd10': 350, 'd12': 350, 'd20': 400, 'd100': 350 };
    diceFormer.dice_inertia = { 'd4': 5, 'd6': 13, 'd8': 10, 'd10': 9, 'd12': 8, 'd20': 6, 'd100': 9 };

    diceFormer.scale = 50;

    diceFormer.copy = function(obj) {
        if (!obj) return obj;
        return diceFormer.copyTo(obj, new obj.constructor());
    }
    diceFormer.copyTo = function(obj, res) {
        if (obj == null || typeof obj !== 'object') return obj;
        if (obj instanceof Array) {
            for (let i = obj.length - 1; i >= 0; --i)
                res[i] = diceFormer.copy(obj[i]);
        }
        else {
            for (let i in obj) {
                if (obj.hasOwnProperty(i))
                    res[i] = diceFormer.copy(obj[i]);
            }
        }
        return res;
    }

// -----------------------
//      Miscellaneous
// -----------------------

    diceFormer.calc_texture_size = function(approx) {
        return Math.pow(2, Math.floor(Math.log(approx) / Math.log(2)));
    }
    diceFormer.standard_d20_dice_face_labels = ['0', '1', '2', '3', '4', '5', '6', '7', '8',
        '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];

    diceFormer.standard_d100_dice_face_labels = ['00', '10', '20', '30', '40', '50',
        '60', '70', '80', '90'];

    // trigo functions for easier degree values
    diceFormer.cos = function(deg){
        return Math.cos((deg * Math.PI)/180.0)
    }
    diceFormer.sin = function(deg){
        return Math.sin((deg * Math.PI)/180.0)
    }
    diceFormer.tan = function(deg){
        return Math.tan((deg * Math.PI)/180.0)
    }
    return diceFormer;
}

