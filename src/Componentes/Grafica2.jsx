import { useRef, useEffect } from "react";
import * as THREE from "three"

const Grafica = (props) => {
    const mountRef = useRef(null)

    useEffect(() => {
        const currentRef = mountRef.current
        const { clientWidth: width, clientHeight: height } = currentRef

        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(25, width / height, 0.1, 1000)
        scene.add(camera)
        camera.position.z=1

        const renderer = new THREE.WebGLRenderer()
        renderer.setSize(width, height)
        currentRef.appendChild(renderer.domElement)

        //
        const group = new THREE.Group();
        //group.position.z = -0.5;

        const BOXES = 10;

        for (let i = 0; i < BOXES; i++) {
            const i = 0;
            const intensity = (i + 1) / BOXES;
            const w = 0.1;
            const h = 0.1;
            const minH = 1;
            const geometry = new THREE.BoxGeometry(w, h, w);
            const material = new THREE.MeshBasicMaterial({color: 0x0f2c64})


            const cube = new THREE.Mesh(geometry, material);
            cube.position.z = (i - 5) * (w + 0.05);
            cube.castShadow = true;
            cube.receiveShadow = true;
            cube.userData = {
                index: i + 1,
                intensity: intensity
            };

            group.add(cube);

        }

        scene.add(group);
        //

        renderer.render(scene, camera)

        return () => {
            currentRef.removeChild(renderer.domElement)
        }
    }, [])


    return <div ref={mountRef} style={{ width: "100%", height: "100vh" }}></div>
}

export default Grafica;