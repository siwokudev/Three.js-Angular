import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import * as THREE from 'three';
import { WebGL } from 'three/examples/jsm/Addons.js';

@Component({
  selector: 'app-viewport3D',
  standalone: true,
  imports: [],
  templateUrl: './viewport3d.component.html',
  styleUrl: './viewport3d.component.css'
})
export class Viewport3DComponent implements OnInit{
  wegGLSupport : boolean = true

  fieldOfView : number = 75; //value in degrees
  aspectRatio = window.innerWidth / window.innerHeight
  nearClippingPlane : number = 0.1
  farClippingPlane : number = 1000

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(this.fieldOfView, this.aspectRatio, this.nearClippingPlane, this.farClippingPlane);
  renderer = new THREE.WebGLRenderer();

  cube = new THREE.Mesh

  ngOnInit(): void {

    this.wegGLSupport = WebGL.isWebGL2Available();

    if (!this.wegGLSupport) {
      return;
    }

    let container = document.getElementById("container");
    let horizontalRenderSize = container ? container?.clientWidth : window.innerHeight
    let verticalRenderSize = horizontalRenderSize / this.aspectRatio

    this.renderer.setSize(horizontalRenderSize, verticalRenderSize);
    this.renderer.setAnimationLoop(this.animate.bind(this)); //creates a render loop using animate method

    document.body.appendChild( this.renderer.domElement ); //appends <canvas> to HTML Document

    this.cube = this.createCube()
    this.scene.add(this.cube)
    this.camera.position.z = 5; //geometry is added to coordinates 0,0,0; same as the camera, so wee need to move the camera to see the object
  }

  private animate() : void {
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;

    this.renderer.render(this.scene, this.camera);
  }

  createCube() : THREE.Mesh {
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const cube = new THREE.Mesh( geometry, material );
    return cube;
  }

}
