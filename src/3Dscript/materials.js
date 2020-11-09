// -------------------------
//          materials
// -------------------------
import * as THREE from "three";
import diceFormer from "./diceFormer.js";

let former = diceFormer();



// ------------------------
//       D4 MATERIALS
// ------------------------
let d4_labels = [
    [[2, 4, 3], [3, 1, 2], [2, 1, 4], [4, 1, 3]],
    [[2, 3, 4], [3, 1, 4], [2, 4, 1], [3, 2, 1]],
    [[4, 3, 2], [3, 4, 1], [4, 2, 1], [3, 1, 2]],
    [[4, 2, 3], [1, 4, 3], [4, 1, 2], [1, 3, 2]]
];

function create_d4_materials(size, margin, labels) {
    function create_d4_text(index, text, color, back_color) {
        let canvas = document.createElement("canvas");
        let context = canvas.getContext("2d");
        let ts = former.calc_texture_size(size + margin) * 10;
        canvas.width = canvas.height = ts;
        context.font = (ts - margin) / 4 + "pt Impact";
        context.fillStyle = back_color;
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillStyle = color;

        //correct the positions by a sixth turn
        context.translate(canvas.width*0.68, -canvas.height/5.4);
        context.rotate(Math.PI / 3 );

        // write each face
        for (let i in text) {
            // context.rotate(Math.PI * 1 / 3);
            context.fillText(text[i], canvas.width / 2,
                canvas.height / 2 - ts * 0.3);
            context.translate(canvas.width / 2, canvas.height / 2);
            context.rotate(Math.PI * 2 / 3);
            context.translate(-canvas.width / 2, -canvas.height / 2);
        }

        let texture = new THREE.Texture(canvas);

        texture.needsUpdate = true;
        return texture;
    }
    let materials = [];

    for (let i = 0; i < labels.length; ++i)
        materials.push(new THREE.MeshPhongMaterial({
            map: create_d4_text(i, labels[i], former.label_color, former.dice_color)
        }))
    return materials;
}

export function get_d4_materials(size, margin){
    return create_d4_materials(former.scale / 2 * size, former.scale * 2 * margin, d4_labels[0])
}

// ---------------------------------------
//       OTHER DICE MATERIALS
// ---------------------------------------

export function create_dice_materials(face_labels, size, margin) {
    function create_text_texture(text, color, back_color) {
        if (text == undefined) return null;
        let canvas = document.createElement("canvas");
        let context = canvas.getContext("2d");
        let ts = former.calc_texture_size(size + size * 2 * margin) * 2;
        canvas.width = canvas.height = ts;
        context.font = ts / (1 + 2 * margin) + "pt Impact";
        context.fillStyle = back_color;
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillStyle = color;
        context.fillText(text, canvas.width / 2, canvas.height / 2);
        if (text === '6' || text === '9') {
            context.fillText('    .', canvas.width / 2, canvas.height / 2);
        }
        let texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        return texture;
    }
    let materials = [];
    for (let i = 0; i < face_labels.length; ++i)
        materials.push(new THREE.MeshPhongMaterial(former.copyTo(former.material_options,
            { map: create_text_texture(face_labels[i], former.label_color, former.dice_color) })));
    return materials;
}