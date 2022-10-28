import { OrbitControls} from 'three/addons/controls/OrbitControls';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import * as THREE from 'three';

export default class ViewObject{
    constructor(canvasRef) {
        this.renderer = new THREE.WebGLRenderer({
            canvas: canvasRef,
            antialias: false,
            alpha: true,
        });
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 75, 1, 0.1, 100 );
        this.camera.position.set(1.25, 1.25, 0.75);
        this.scene.add(this.camera);

        const loader = new GLTFLoader();

        loader.load('\\Objects\\from_the_chubby_kitchen.glb', ( object ) => {
            
            this.scene.add(object.scene);

        }, undefined, function (error) {
            console.error(error);
        });

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        ambientLight.castShadow = true;
        this.scene.add(ambientLight);

        const spotLight = new THREE.SpotLight(0xffffff, 1);
        spotLight.castShadow = true;
        spotLight.position.set(32, 64, 32);
        this.scene.add(spotLight);
        
        this.controls = new OrbitControls(this.camera,this.renderer.domElement);
        this.controls.dispose();

        this.renderer.setSize(window.innerWidth/2, window.innerHeight*0.99);

    

        this.update();
    }

    // ******************* PUBLIC EVENTS ******************* //
    updateValue(value) {
      // Whatever you need to do with React props
    }

    onMouseMove(event) {
      // Mouse moves
      this.camera.position.set( Math.abs(1-(event.clientX/window.innerWidth))+0.75, (event.clientY/window.innerHeight)+0.75, 0.75 );
      this.controls.update();
    }

    onWindowResize(vpW, vpH) {
        // this.renderer.setSize(vpW, vpH);
    }

    // ******************* RENDER LOOP ******************* //
    update(t) {
        this.renderer.render(this.scene, this.camera);

        requestAnimationFrame(this.update.bind(this));
    }
}