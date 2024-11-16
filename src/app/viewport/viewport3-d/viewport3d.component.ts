import { Component, OnInit } from '@angular/core';

import * as THREE from 'three';
import {GLTFLoader, OrbitControls, WebGL } from 'three/examples/jsm/Addons.js';

@Component({
  selector: 'app-viewport3D',
  standalone: true,
  imports: [],
  templateUrl: './viewport3d.component.html',
  styleUrl: './viewport3d.component.css'
})
export class Viewport3DComponent implements OnInit{
  wegGLSupport : boolean = true

  fieldOfView : number = 110; //value in degrees
  aspectRatio = window.innerWidth / window.innerHeight
  nearClippingPlane : number = 0.1
  farClippingPlane : number = 1000

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(this.fieldOfView, this.aspectRatio, this.nearClippingPlane, this.farClippingPlane);
  renderer = new THREE.WebGLRenderer();

  controls = new OrbitControls(this.camera, this.renderer.domElement)

  gltfModel = new THREE.Group

  ngOnInit(): void {

    this.wegGLSupport = WebGL.isWebGL2Available();

    if (!this.wegGLSupport) {
      return;
    }

    this.setRenderSize()
    this.renderer.setAnimationLoop(this.animate.bind(this)); //creates a render loop using animate method

    document.body.appendChild( this.renderer.domElement ); //appends <canvas> to HTML Document

    this.loadGLTFModel();
    this.setUpScene();
    this.moveCameraTo(0, 2, 30); //geometry is added to coordinates 0,0,0; same as the camera, so wee need to move the camera to see the object
    this.setUpControls();
  }

  private setUpControls() : void {
    this.controls.target.set( 0, 2.2, 0);
		this.controls.update();
		this.controls.enablePan = false;
		this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.5
  }

  private setUpScene() : void {
    this.scene.background = new THREE.Color( 0xbfe3dd );
    //this.createDirectionalLight();
    this.createAmbienLight();
  }

  private moveCameraTo(x : number = 0, y: number = 0, z : number = 0) : void {
    this.camera.setFocalLength(55)

    this.camera.position.x = x
    this.camera.position.y = y
    this.camera.position.z = z
  }

  private setRenderSize() : void {
    let container = document.getElementById("container");
    let horizontalRenderSize = container ? container?.clientWidth : window.innerHeight
    let verticalRenderSize = horizontalRenderSize / this.aspectRatio

    this.renderer.setSize(horizontalRenderSize, verticalRenderSize);
  }

  private animate() : void {
    //this.rotateModel();
    this.renderer.render(this.scene, this.camera);
  }

  private rotateModel(xRotationSpeed : number = 0, yRotationSpeed: number = 0.002, zRotationSpeed : number = 0) : void {
    this.gltfModel.rotation.x += xRotationSpeed;
    this.gltfModel.rotation.y += yRotationSpeed;
    this.gltfModel.rotation.z += zRotationSpeed;
  }

  private loadGLTFModel() : void {
    const loader = new GLTFLoader();
    loader.load("assets/3DModels/loomis_head/scene.gltf", (model) => {
      this.gltfModel = model.scene
      this.scene.add(model.scene)
    }
      , undefined
      , (error) => {
        console.log("erro loaging model:");
        console.log(error)
    }
    );
  }

  private createAmbienLight(color: number =  0x404040, intensity : number = 100) { // soft white light
    const light = new THREE.AmbientLight(color, intensity); 
    this.scene.add(light)
  }

  private createDirectionalLight(color: number =  0x404040, intensity : number = 10) : void {
    const light = new THREE.DirectionalLight(color, intensity)
    light.position.set(1, 0, 1)
    this.scene.add(light);
  }

}
