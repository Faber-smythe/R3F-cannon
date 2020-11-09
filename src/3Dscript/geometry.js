// -----------------------
//        Geometry
// -----------------------
import * as THREE from "three";
import CANNON from "cannon";

function chamfer_geom(vectors, faces, chamfer) {
    let chamfer_vectors = [], chamfer_faces = [], corner_faces = new Array(vectors.length);
    for (let i = 0; i < vectors.length; ++i) corner_faces[i] = [];
    for (let i = 0; i < faces.length; ++i) {
        let ii = faces[i], fl = ii.length - 1;
        let center_point = new THREE.Vector3();
        let face = new Array(fl);
        for (let j = 0; j < fl; ++j) {
            let vv = vectors[ii[j]].clone();
            center_point.add(vv);
            corner_faces[ii[j]].push(face[j] = chamfer_vectors.push(vv) - 1);
        }
        center_point.divideScalar(fl);
        for (let j = 0; j < fl; ++j) {
            let vv = chamfer_vectors[face[j]];
            vv.subVectors(vv, center_point).multiplyScalar(chamfer).addVectors(vv, center_point);
        }
        face.push(ii[fl]);
        chamfer_faces.push(face);
    }
    for (let i = 0; i < faces.length - 1; ++i) {
        for (let j = i + 1; j < faces.length; ++j) {
            let pairs = [], lastm = -1;
            for (let m = 0; m < faces[i].length - 1; ++m) {
                let n = faces[j].indexOf(faces[i][m]);
                if (n >= 0 && n < faces[j].length - 1) {
                    if (lastm >= 0 && m != lastm + 1) pairs.unshift([i, m], [j, n]);
                    else pairs.push([i, m], [j, n]);
                    lastm = m;
                }
            }
            if (pairs.length !== 4) continue;
            chamfer_faces.push([chamfer_faces[pairs[0][0]][pairs[0][1]],
                chamfer_faces[pairs[1][0]][pairs[1][1]],
                chamfer_faces[pairs[3][0]][pairs[3][1]],
                chamfer_faces[pairs[2][0]][pairs[2][1]], -1]);
        }
    }
    for (let i = 0; i < corner_faces.length; ++i) {
        let cf = corner_faces[i], face = [cf[0]], count = cf.length - 1;
        while (count) {
            for (let m = faces.length; m < chamfer_faces.length; ++m) {
                let index = chamfer_faces[m].indexOf(face[face.length - 1]);
                if (index >= 0 && index < 4) {
                    if (--index === -1) index = 3;
                    let next_vertex = chamfer_faces[m][index];
                    if (cf.indexOf(next_vertex) >= 0) {
                        face.push(next_vertex);
                        break;
                    }
                }
            }
            --count;
        }
        face.push(-1);
        chamfer_faces.push(face);
    }
    return { vectors: chamfer_vectors, faces: chamfer_faces };
}

function make_geom(vertices, faces, radius, tab, af) {
    let geom = new THREE.Geometry();
    for (let i = 0; i < vertices.length; ++i) {
        let vertex = vertices[i].multiplyScalar(radius);
        vertex.index = geom.vertices.push(vertex) - 1;
    }
    for (let i = 0; i < faces.length; ++i) {
        let ii = faces[i], fl = ii.length - 1;
        let aa = Math.PI * 2 / fl;
        for (let j = 0; j < fl - 2; ++j) {
            geom.faces.push(new THREE.Face3(ii[0], ii[j + 1], ii[j + 2], [geom.vertices[ii[0]],
                geom.vertices[ii[j + 1]], geom.vertices[ii[j + 2]]], 0, ii[fl] + 1));
            geom.faceVertexUvs[0].push([
                new THREE.Vector2((Math.cos(af) + 1 + tab) / 2 / (1 + tab),
                    (Math.sin(af) + 1 + tab) / 2 / (1 + tab)),
                new THREE.Vector2((Math.cos(aa * (j + 1) + af) + 1 + tab) / 2 / (1 + tab),
                    (Math.sin(aa * (j + 1) + af) + 1 + tab) / 2 / (1 + tab)),
                new THREE.Vector2((Math.cos(aa * (j + 2) + af) + 1 + tab) / 2 / (1 + tab),
                    (Math.sin(aa * (j + 2) + af) + 1 + tab) / 2 / (1 + tab))]);
        }
    }
    geom.computeFaceNormals();
    geom.boundingSphere = new THREE.Sphere(new THREE.Vector3(), radius);
    return geom;
}

function create_shape(vertices, faces, radius) {
    let cv = new Array(vertices.length), cf = new Array(faces.length);
    for (let i = 0; i < vertices.length; ++i) {
        let v = vertices[i];
        cv[i] = new CANNON.Vec3(v.x * radius, v.y * radius, v.z * radius);
    }
    for (let i = 0; i < faces.length; ++i) {
        cf[i] = faces[i].slice(0, faces[i].length - 1);
    }
    return new CANNON.ConvexPolyhedron(cv, cf);
}

function create_geom(vertices, faces, radius, tab, af, chamfer) {
    let vectors = new Array(vertices.length);
    for (let i = 0; i < vertices.length; ++i) {
        vectors[i] = (new THREE.Vector3()).fromArray(vertices[i]).normalize();
    }

    let cg = chamfer_geom(vectors, faces, chamfer);

    let geom = make_geom(cg.vectors, cg.faces, radius, tab, af);
    // let geom = make_geom(vectors, faces, radius, tab, af); // Without chamfer
    geom.cannon_shape = create_shape(vectors, faces, radius);
    return geom;
}



export function create_d10_geometry(radius) {
    let a = Math.PI * 0.2 //36°
    // let k = Math.cos(a)
    let h = 0.105
    let v = -1;
    let vertices = [];
    for (let i = 0, b = 0; i < 10; ++i, b += a)
        vertices.push([Math.cos(b), Math.sin(b), h * (i % 2 ? 1 : -1)]);
    vertices.push([0, 0, -1]); vertices.push([0, 0, 1]);
    let faces = [[5, 7, 11, 0], [4, 2, 10, 1], [1, 3, 11, 2], [0, 8, 10, 3], [7, 9, 11, 4],
        [8, 6, 10, 5], [9, 1, 11, 6], [2, 0, 10, 7], [3, 5, 11, 8], [6, 4, 10, 9],
        [1, 0, 2, v], [1, 2, 3, v], [3, 2, 4, v], [3, 4, 5, v], [5, 4, 6, v],
        [5, 6, 7, v], [7, 6, 8, v], [7, 8, 9, v], [9, 8, 0, v], [9, 0, 1, v]];
    // return create_geom(vertices, faces, radius, 0, Math.PI * 6 / 5, 0.945);

    let vectors = new Array(vertices.length);
    for (let i = 0; i < vertices.length; ++i) {
        vectors[i] = (new THREE.Vector3()).fromArray(vertices[i]).normalize();
    }

    let cg = chamfer_geom(vectors, faces, 0.945);

    return {vertices : cg.vectors, faces : cg.faces}
}