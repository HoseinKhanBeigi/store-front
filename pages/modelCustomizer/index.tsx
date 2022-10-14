import clsx from "clsx";
import { PrimaryLayout } from "../../components/primaryLayout";
import styles from "../../styles/modelCustomizer.module.scss";
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import GLTFLoader from "three/examples/js/loaders/GLTFLoader";
import { useEffect } from "react";

const ModelCustomizer = () => {
    const init = () => {
        const TRAY: any = document.getElementById('js-tray-slide');
        const DRAG_NOTICE: any = document.getElementById('js-drag-notice');

        var theModel: any;

        const MODEL_PATH = "/chair.glb";

        var activeOption = 'legs';
        var loaded = false;

        const colors = [
            {
                texture: '/img3d/wood_.jpg',
                size: [2, 2, 2],
                shininess: 60
            },

            {
                texture: '/img3d/fabric_.jpg',
                size: [4, 4, 4],
                shininess: 0
            },

            {
                texture: '/img3d/pattern_.jpg',
                size: [8, 8, 8],
                shininess: 10
            },

            {
                texture: '/img3d/denim_.jpg',
                size: [3, 3, 3],
                shininess: 0
            },

            {
                texture: '/img3d/quilt_.jpg',
                size: [6, 6, 6],
                shininess: 0
            },

            {
                color: '131417'
            },

            {
                color: '374047'
            },

            {
                color: '5f6e78'
            },

            {
                color: '7f8a93'
            },

            {
                color: '97a1a7'
            },

            {
                color: 'acb4b9'
            },

            {
                color: 'DF9998'
            },

            {
                color: '7C6862'
            },

            {
                color: 'A3AB84'
            },

            {
                color: 'D6CCB1'
            },

            {
                color: 'F8D5C4'
            },

            {
                color: 'A3AE99'
            },

            {
                color: 'EFF2F2'
            },

            {
                color: 'B0C5C1'
            },

            {
                color: '8B8C8C'
            },

            {
                color: '565F59'
            },

            {
                color: 'CB304A'
            },

            {
                color: 'FED7C8'
            },

            {
                color: 'C7BDBD'
            },

            {
                color: '3DCBBE'
            },

            {
                color: '264B4F'
            },

            {
                color: '389389'
            },

            {
                color: '85BEAE'
            },

            {
                color: 'F2DABA'
            },

            {
                color: 'F2A97F'
            },

            {
                color: 'D85F52'
            },

            {
                color: 'D92E37'
            },

            {
                color: 'FC9736'
            },

            {
                color: 'F7BD69'
            },

            {
                color: 'A4D09C'
            },

            {
                color: '4C8A67'
            },

            {
                color: '25608A'
            },

            {
                color: '75C8C6'
            },

            {
                color: 'F5E4B7'
            },

            {
                color: 'E69041'
            },

            {
                color: 'E56013'
            },

            {
                color: '11101D'
            },

            {
                color: '630609'
            },

            {
                color: 'C9240E'
            },

            {
                color: 'EC4B17'
            },

            {
                color: '281A1C'
            },

            {
                color: '4F556F'
            },

            {
                color: '64739B'
            },

            {
                color: 'CDBAC7'
            },

            {
                color: '946F43'
            },

            {
                color: '66533C'
            },

            {
                color: '173A2F'
            },

            {
                color: '153944'
            },

            {
                color: '27548D'
            },

            {
                color: '438AAC'
            }];




        const BACKGROUND_COLOR = 0xf1f1f1;
        // Init the scene
        const scene = new THREE.Scene();
        // Set background
        scene.background = new THREE.Color(BACKGROUND_COLOR);
        scene.fog = new THREE.Fog(BACKGROUND_COLOR, 20, 100);

        const canvas: any = document.querySelector('#c');

        // Init the renderer
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

        renderer.shadowMap.enabled = true;
        renderer.setPixelRatio(window.devicePixelRatio);

        var cameraFar = 5;

        document.body.appendChild(renderer.domElement);

        // Add a camerra
        var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = cameraFar;
        camera.position.x = 0;

        // Initial material
        const INITIAL_MTL = new THREE.MeshPhongMaterial({ color: 0xf1f1f1, shininess: 10 });

        const INITIAL_MAP = [
            { childID: "back", mtl: INITIAL_MTL },
            { childID: "base", mtl: INITIAL_MTL },
            { childID: "cushions", mtl: INITIAL_MTL },
            { childID: "legs", mtl: INITIAL_MTL },
            { childID: "supports", mtl: INITIAL_MTL }];


        // Init the object loader
        var loader = new GLTFLoader();

        loader.load(MODEL_PATH, function (gltf: any) {
            theModel = gltf.scene;

            theModel.traverse((o: any) => {
                if (o.isMesh) {
                    o.castShadow = true;
                    o.receiveShadow = true;
                }
            });

            // Set the models initial scale   
            theModel.scale.set(2, 2, 2);
            theModel.rotation.y = Math.PI;

            // Offset the y position a bit
            theModel.position.y = -1;

            // Set initial textures
            for (let object of INITIAL_MAP) {
                initColor(theModel, object.childID, object.mtl);
            }

            // Add the model to the scene
            scene.add(theModel);


        }, undefined, function (error: any) {
            console.error(error);
        });

        // Function - Add the textures to the models
        function initColor(parent: any, type: any, mtl: any) {
            parent.traverse((o: any) => {
                if (o.isMesh) {
                    if (o.name.includes(type)) {
                        o.material = mtl;
                        o.nameID = type; // Set a new property to identify this object
                    }
                }
            });
        }

        // Add lights
        var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.61);
        hemiLight.position.set(0, 50, 0);
        // Add hemisphere light to scene   
        scene.add(hemiLight);

        var dirLight = new THREE.DirectionalLight(0xffffff, 0.54);
        dirLight.position.set(-8, 12, 8);
        dirLight.castShadow = true;
        dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
        // Add directional Light to scene    
        scene.add(dirLight);

        // Floor
        var floorGeometry = new THREE.PlaneGeometry(5000, 5000, 1, 1);
        var floorMaterial = new THREE.MeshPhongMaterial({
            color: 0xeeeeee,
            shininess: 0
        });


        var floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -0.5 * Math.PI;
        floor.receiveShadow = true;
        floor.position.y = -1;
        scene.add(floor);

        // Add controls
        var controls = new OrbitControls(camera, renderer.domElement);
        controls.maxPolarAngle = Math.PI / 2;
        controls.minPolarAngle = Math.PI / 3;
        controls.enableDamping = true;
        controls.enablePan = false;
        controls.dampingFactor = 0.1;
        controls.autoRotate = false; // Toggle this if you'd like the chair to automatically rotate
        controls.autoRotateSpeed = 0.2; // 30

        function animate() {

            controls.update();
            renderer.render(scene, camera);
            requestAnimationFrame(animate);

            if (resizeRendererToDisplaySize(renderer)) {
                const canvas = renderer.domElement;
                camera.aspect = canvas.clientWidth / canvas.clientHeight;
                camera.updateProjectionMatrix();
            }

            if (theModel != null) {
                initialRotation();
                DRAG_NOTICE.classList.add(`${styles.start}`);
            }
        }

        animate();

        // Function - New resizing method
        function resizeRendererToDisplaySize(renderer: any) {
            const canvas = renderer.domElement;
            var width = window.innerWidth;
            var height = window.innerHeight;
            var canvasPixelWidth = canvas.width / window.devicePixelRatio;
            var canvasPixelHeight = canvas.height / window.devicePixelRatio;

            const needResize = canvasPixelWidth !== width || canvasPixelHeight !== height;
            if (needResize) {

                renderer.setSize(width, height, false);
            }
            return needResize;
        }

        // Function - Build Colors

        function buildColors(colors: any) {
            for (let [i, color] of colors.entries()) {
                let swatch = document.createElement('div');
                swatch.classList.add(`${styles.tray__swatch}`);

                if (color.texture) {
                    swatch.style.backgroundImage = "url(" + color.texture + ")";
                } else {
                    swatch.style.background = "#" + color.color;
                }

                swatch.setAttribute('data-key', i);
                TRAY.append(swatch);
            }
        }

        buildColors(colors);

        // Select Option
        const options: any = document.querySelectorAll(`.${styles.option}`);

        for (const option of options) {
            option.addEventListener('click', selectOption);
        }

        function selectOption(e: any) {
            let option = e.target;
            activeOption = e.target.dataset.option;
            for (const otherOption of options) {
                otherOption.classList.remove(`${styles.isactive}`);
            }
            option.classList.add(`${styles.isactive}`);
        }

        // Swatches
        const swatches: any = document.querySelectorAll(`.${styles.tray__swatch}`);

        for (const swatch of swatches) {
            swatch.addEventListener('click', selectSwatch);
        }

        function selectSwatch(e: any) {
            let color: any = colors[parseInt(e.target.dataset.key)];
            let new_mtl;

            if (color.texture) {

                let txt: any = new THREE.TextureLoader().load(color.texture);

                txt.repeat.set(color.size[0], color.size[1], color.size[2]);
                txt.wrapS = THREE.RepeatWrapping;
                txt.wrapT = THREE.RepeatWrapping;

                new_mtl = new THREE.MeshPhongMaterial({
                    map: txt,
                    shininess: color.shininess ? color.shininess : 10
                });

            } else {
                new_mtl = new THREE.MeshPhongMaterial({
                    color: parseInt('0x' + color.color),
                    shininess: color.shininess ? color.shininess : 10
                });


            }

            setMaterial(theModel, activeOption, new_mtl);
        }

        function setMaterial(parent: any, type: any, mtl: any) {
            parent.traverse((o: any) => {
                if (o.isMesh && o.nameID != null) {
                    if (o.nameID == type) {
                        o.material = mtl;
                    }
                }
            });
        }

        // Function - Opening rotate
        let initRotate = 0;

        function initialRotation() {
            initRotate++;
            if (initRotate <= 120) {
                theModel.rotation.y += Math.PI / 60;
            } else {
                loaded = true;
            }
        }

        var slider: any = document.getElementById('js-tray'),
            sliderItems: any = document.getElementById('js-tray-slide'),
            difference: any;


        function slide(wrapper: any, items: any) {
            console.log(items);

            var posX1 = 0,
                posX2 = 0,
                posInitial: any,
                threshold = 20,
                posFinal;

            // Mouse events
            items.onmousedown = dragStart;

            // Touch events
            items.addEventListener('touchstart', dragStart);
            items.addEventListener('touchend', dragEnd);
            items.addEventListener('touchmove', dragAction);


            function dragStart(e: any) {
                e = e || window.event;
                posInitial = items.offsetLeft;
                difference = sliderItems.offsetWidth - slider.offsetWidth;
                difference = difference * -1;

                if (e.type == 'touchstart') {
                    posX1 = e.touches[0].clientX;
                } else {
                    posX1 = e.clientX;
                    document.onmouseup = dragEnd;
                    document.onmousemove = dragAction;
                }

            }

            function dragAction(e: any) {
                e = e || window.event;

                if (e.type == 'touchmove') {
                    posX2 = posX1 - e.touches[0].clientX;
                    posX1 = e.touches[0].clientX;
                } else {
                    posX2 = posX1 - e.clientX;
                    posX1 = e.clientX;
                }

                if (items.offsetLeft - posX2 <= 0 && items.offsetLeft - posX2 >= difference) {
                    items.style.left = items.offsetLeft - posX2 + "px";
                }
            }

            function dragEnd() {
                posFinal = items.offsetLeft;
                if (posFinal - posInitial < -threshold) {

                } else if (posFinal - posInitial > threshold) {

                } else {
                    items.style.left = posInitial + "px";
                }

                document.onmouseup = null;
                document.onmousemove = null;
            }

        }

        slide(slider, sliderItems);
    }

    useEffect(() => {
        init()
    }, [])

    return (

        <PrimaryLayout >
            <span className={clsx(styles.dragnotice)} id="js-drag-notice">Drag to rotate 360&#176;</span>
            <div className={clsx(styles.wrapper)}>
                <div className={clsx(styles.options)}>
                    <div className={clsx(styles.option, styles.isactive)} data-option="legs">
                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1376484/legs.svg" alt="" />
                    </div>
                    <div className={clsx(styles.option)} data-option="cushions">
                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1376484/cushions.svg" alt="" />
                    </div>
                    <div className={clsx(styles.option)} data-option="base">
                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1376484/base.svg" alt="" />
                    </div>
                    <div className={clsx(styles.option)} data-option="supports">
                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1376484/supports.svg" alt="" />
                    </div>
                    <div className={clsx(styles.option)} data-option="back">
                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1376484/back.svg" alt="" />
                    </div>
                </div>
            </div>
            <canvas id="c"></canvas>
            <div className={clsx(styles.controls)}>
                <div className={clsx(styles.info)}>
                    <div className={clsx(styles.info__message)}>
                        <p><strong>&nbsp;Grab&nbsp;</strong> {"to rotate chair."} <strong>&nbsp;{"Scroll"}&nbsp;</strong> {"to zoom."} <strong>&nbsp;{"Drag"}&nbsp;</strong> {"swatches to view more."}</p>
                    </div>
                </div>

                <div id="js-tray" className={clsx(styles.tray)}>
                    <div id="js-tray-slide" className={clsx(styles.tray__slide)}></div>
                </div>
            </div>
        </PrimaryLayout>

    )
}
export default ModelCustomizer