<template>
  <div style="width: 100%; height: 100%;display: flex;justify-content: center;align-items: center">
    <canvas id="threeJsView"/>
  </div>
</template>

<script setup>
import * as THREE from 'three';
import {OrbitControls} from "three/addons/controls/OrbitControls.js";
import {onMounted} from "vue";

let threeJsView
let scene
let camera
let renderer
let geometry
let material
let torus
let gridHelper
let controls

function animate() {
  requestAnimationFrame(animate)
  // torus.rotation.x += 0.01;
  // torus.rotation.y += 0.01;
  // torus.rotation.z += 0.01;
  controls.update()
  renderer.render(scene, camera)
}
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24)
  const material = new THREE.MeshBasicMaterial({
    color: 'rgb(255, 255, 255)'
  })
  const star = new THREE.Mesh(geometry, material)
  const [x, y, z] = Array(3).fill().map(()=>THREE.MathUtils.randFloatSpread(100))
  star.position.set(x, y, z)

  scene.add(star)
}

onMounted(() => {
  threeJsView = document.getElementById('threeJsView')
  scene = new THREE.Scene;
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  renderer = new THREE.WebGLRenderer({
    canvas: threeJsView,
    // antialias: true
  })

  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight - 64)

  geometry = new THREE.TorusGeometry(10, 3, 16, 100)
  material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true
  })

  torus = new THREE.Mesh(geometry, material)
  gridHelper = new THREE.GridHelper(200, 50)
  controls = new OrbitControls(camera, renderer.domElement)

  let group = new THREE.Group()
  group.add(torus)
  scene.add(group, controls, gridHelper)

  camera.position.z = 30;
  animate()
  Array(200).fill().forEach(addStar)
})
</script>

<style scoped>
#threeJsView {
  /*height: 500px;*/
  /*width: 500px;*/
}
</style>
