import React from "react";
import * as THREE from "three"

let camera, scene, renderer, group;
const controllers = [];
const box = new THREE.Box3();
//const oscillators = [];

export function Num(props) {
    console.log("estoy en num", props);

    return (
        <div>
            {
                Init(props)}
        </div>
    )
}

function Init(l) {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x505050)

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 10);
    camera.position.z = 5

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    const floorGeometry = new THREE.PlaneGeometry(4, 4);
    const floorMaterial = new THREE.MeshStandardMaterial({
        color: 0xeeeeee,
        roughness: 1.0,
        metalness: 0.0
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = - Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    scene.add(new THREE.HemisphereLight(0x808080, 0x606060));

    const light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 6, 0);
    light.castShadow = true;
    light.shadow.camera.top = 2;
    light.shadow.camera.bottom = - 2;
    light.shadow.camera.right = 2;
    light.shadow.camera.left = - 2;
    light.shadow.mapSize.set(4096, 4096);
    scene.add(light);

    group = new THREE.Group();
    group.position.z = - 0.5;
    scene.add(group);


    for (let i = 0; i < l.length; i++) {

        const intensity = (i + 1) / l.length;
        const w = 0.1;
        const h = 0.1;
        const minH = 1;
        const geometry = new THREE.BoxGeometry(w, h * l[i] + minH, 0.5);
        const material = new THREE.MeshStandardMaterial({
            color: new THREE.Color(intensity, 0.1, 0.1),
            roughness: 0.7,
            metalness: 0.0
        });

        const object = new THREE.Mesh(geometry, material);
        object.position.x = (i - 5) * (w + 0.05);
        object.castShadow = true;
        object.receiveShadow = true;
        object.userData = {
            index: i + 1,
            intensity: intensity
        };

        group.add(object);

    }

    animate()

}
function animate() {

    renderer.setAnimationLoop(render);

}

function handleCollisions() {

    for (let i = 0; i < group.children.length; i++) {

        group.children[i].collided = false;

    }

    for (let g = 0; g < controllers.length; g++) {

        const controller = controllers[g];
        controller.colliding = false;

        const { grip, gamepad } = controller;
        const sphere = {
            radius: 0.03,
            center: grip.position
        };

        const supportHaptic = 'hapticActuators' in gamepad && gamepad.hapticActuators != null && gamepad.hapticActuators.length > 0;

        for (let i = 0; i < group.children.length; i++) {

            const child = group.children[i];
            box.setFromObject(child);
            if (box.intersectsSphere(sphere)) {

                child.material.emissive.b = 1;
                const intensity = child.userData.index / group.children.length;
                child.scale.setScalar(1 + Math.random() * 0.1 * intensity);

                if (supportHaptic) {

                    gamepad.hapticActuators[0].pulse(intensity, 100);

                }

                // const musicInterval = musicScale[child.userData.index % musicScale.length] + 12 * Math.floor(child.userData.index / musicScale.length);
                // oscillators[g].frequency.value = 110 * Math.pow(2, musicInterval / 12);
                // controller.colliding = true;
                // group.children[i].collided = true;

            }

        }



        // if (controller.colliding) {

        //     if (!controller.playing) {

        //         controller.playing = true;
        //         oscillators[g].connect(audioCtx.destination);

        //     }

        // } else {

        //     if (controller.playing) {

        //         controller.playing = false;
        //         oscillators[g].disconnect(audioCtx.destination);

        //     }

        // }

    }

    for (let i = 0; i < group.children.length; i++) {

        let child = group.children[i];
        if (!child.collided) {

            // reset uncollided boxes
            child.material.emissive.b = 0;
            child.scale.setScalar(1);

        }

    }

}

function render() {
    handleCollisions();
    renderer.render(scene, camera);
}
