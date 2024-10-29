import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';

import image1 from './assets/Moon/indigo_ft.jpg'
import image2 from './assets/Moon/indigo_bk.jpg'
import image3 from './assets/Moon/indigo_up.jpg'
import image4 from './assets/Moon/indigo_dn.jpg'
import image5 from './assets/Moon/indigo_rt.jpg'
import image6 from './assets/Moon/indigo_lf.jpg'

const App = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    let scene, camera, renderer;

    const init = () => {
      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setAnimationLoop(animate);
      renderer.xr.enabled = true;
      renderer.xr.setReferenceSpaceType('local-floor'); // Usar 'local-floor' en lugar de 'local'
      mountRef.current.appendChild(renderer.domElement);

      document.body.appendChild(VRButton.createButton(renderer));

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 45, 30000);
      camera.position.set(0, 0, 0);

      let controls = new OrbitControls(camera, renderer.domElement);
      controls.minDistance = 500;
      controls.maxDistance = 3000;

      let materialArray = [];
      let texture_ft = new THREE.TextureLoader().load(image1);
      let texture_bk = new THREE.TextureLoader().load(image2);
      let texture_up = new THREE.TextureLoader().load(image3);
      let texture_dn = new THREE.TextureLoader().load(image4);
      let texture_rt = new THREE.TextureLoader().load(image5);
      let texture_lf = new THREE.TextureLoader().load(image6);

      materialArray.push(new THREE.MeshBasicMaterial({ map: texture_ft }));
      materialArray.push(new THREE.MeshBasicMaterial({ map: texture_bk }));
      materialArray.push(new THREE.MeshBasicMaterial({ map: texture_up }));
      materialArray.push(new THREE.MeshBasicMaterial({ map: texture_dn }));
      materialArray.push(new THREE.MeshBasicMaterial({ map: texture_rt }));
      materialArray.push(new THREE.MeshBasicMaterial({ map: texture_lf }));

      for (let i = 0; i < 6; i++) {
        materialArray[i].side = THREE.BackSide;
      }

      let skyboxmoon = new THREE.BoxGeometry(10000, 10000, 10000);
      let skybox = new THREE.Mesh(skyboxmoon, materialArray);
      scene.add(skybox);
    };

    const animate = () => {
      renderer.render(scene, camera);
    };

    init();

    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef}></div>;
};

export default App;