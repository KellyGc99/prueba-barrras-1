import { useRef, useEffect } from "react";
import * as THREE from "three"
import { cloneUniformsGroups } from "three";




import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const Grafica = (props) => {
    const mountRef = useRef(null);
    var len = Object.keys(props).length
    console.log(len)
    useEffect(() => {
        const currentRef = mountRef.current
        const { clientWidth: width, clientHeight: height } = currentRef

        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(25, width / height, 0.1, 1000)
        scene.add(camera)
        camera.position.set(0, 1, 5)

        const renderer = new THREE.WebGLRenderer()
        renderer.setSize(width, height)
        currentRef.appendChild(renderer.domElement)

        //
        const controls = new OrbitControls(camera, renderer.domElement);
        //
        const floorGeometry = new THREE.PlaneGeometry(4, 4);
        const floorMaterial = new THREE.MeshStandardMaterial({
            color: 0xeeeeee,
            roughness: 1.0,
            metalness: 0.0
        })
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = - Math.PI / 2;
        floor.receiveShadow = true;
        scene.add(floor);

        //
        scene.add(new THREE.HemisphereLight(0x808080, 0x606060));

        const light = new THREE.DirectionalLight(0xffffff);
        light.position.set(0, 6, 0);
        light.castShadow = true;
        light.shadow.camera.top = 2;
        light.shadow.camera.bottom = -2;
        light.shadow.camera.right = 2;
        light.shadow.camera.left = -2;
        light.shadow.mapSize.set(4096, 4096);
        scene.add(light)

        const group = new THREE.Group();
        group.position.z = -0.5;
        group.position.y = -0.5;
        scene.add(group)


        for (let i = 0; i < len; i++) {
            const intensity = (i + 1) / len;
            const w = 0.1;
            const h = 0.1;
            const minH = 1;
            const geometry = new THREE.BoxGeometry(w, h * props[i] + minH, w);
            const material = new THREE.MeshBasicMaterial({ color: 0x0f2c64 })


            const cube = new THREE.Mesh(geometry, material);
            cube.position.x = (i - 5) * (w + 0.05);
            cube.translateY(props[i] * 0.05)
            cube.castShadow = true;
            cube.receiveShadow = true;
            cube.userData = {
                index: i + 1,
                intensity: intensity
            };

            group.add(cube);

        }

        const animate = () => {
            renderer.render(scene, camera)
            requestAnimationFrame(animate)
        }
        animate()

        //

        renderer.render(scene, camera)

        return () => {
            currentRef.removeChild(renderer.domElement)
        }
    })


    return <div ref={mountRef} style={{ width: "100%", height: "100vh" }}></div>
}

export default Grafica;