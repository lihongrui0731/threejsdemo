<template>
  <div style="width: 100%; height: 100%;display: flex;justify-content: center;align-items: center">
    <canvas id="threeJsView"/>
  </div>
</template>

<script setup>
import * as THREE from 'three';
import {OrbitControls} from "three/addons/controls/OrbitControls.js";
import {GLTFLoader} from "three/addons/loaders/GLTFLoader.js";
import {onBeforeUnmount, onMounted, watch} from "vue";
import assimpjs from "assimpjs/dist/assimpjs"
import {DRACOLoader} from "three/addons/loaders/DRACOLoader.js";
import {BufferGeometry} from "three";

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
function loadExternal() {
  // let loadingManager = new THREE.LoadingManager();
  // let textLoader = new THREE.TextureLoader();
  // let loader = new THREE.XLoader(loadingManager, textLoader);
  // let models = [];
  // loader.load(['/Terrain.X'], (object)=>{
  //   for (let i=0; i<object.models.length; i++) {
  //     models.push(object.models[i])
  //     scene.add(models[i])
  //   }
  //   object = null
  // })
  let loader = new GLTFLoader();
  let textureLoader = new THREE.TextureLoader();
  loader.load('/Terrain.glb2', (gltf) => {
    let terrainScene = gltf.scene.children[0]
    for (let i=0; i<terrainScene.children.length; i++) {
      textureLoader.load('/MODEL_R.jpg', (texture)=>{
        terrainScene.children[i].material = new THREE.MeshBasicMaterial({
          map: texture
        })
      })
    }
    scene.add(terrainScene)
  })
  loader.load('/Area sourceISO 9613.glb2', (gltf)=>{
    // let soundSourceScene = gltf.scene.children[0]
    // console.log(soundSourceScene)
    let group = new THREE.Group()
    // console.log(gltf.scene.children[0])
    let objects = generateGroupScene(gltf.scene, [])
    console.log(objects)
    let material = new THREE.MeshBasicMaterial({color: '#F15845'})
    for(let i=0; i<objects.children.length; i++) {
      objects.children[i].material = material
      // group.add(objects.children[i])
    }
    // for (let i=0; i<soundSourceScene.children.length; i++) {
    //   // console.log(soundSourceScene.children[i])
    //   soundSourceScene.children[i].material = new THREE.MeshBasicMaterial( { color: '#F15845' } )
    // }
    // console.log(soundSourceScene)
    // scene.add(soundSourceScene)
    scene.add(objects)
    material.dispose()
  })
  loader.load('/Building.glb2', (gltf) => {
    let buildingScene = gltf.scene;
    let material = new THREE.MeshBasicMaterial({color: '#F15845'})
    // console.log(buildingScene)
    // let group = new THREE.Group()
    let objectsGroup = generateGroupScene(buildingScene, [])
    for(let i=0; i<objectsGroup.children.length; i++) {
      objectsGroup.children[i].material = material
      // group.add(objects[i])
    }
    // for (let i=0; i<buildingScene.children.length; i++) {
    //   buildingScene.children[i].material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } )
    //   // buildingScene.children[i].rotation.x = 0
    // }
    scene.add(objectsGroup)
    material.dispose()
  })
  renderer.render(scene, camera)
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

  // let group = new THREE.Group()
  // group.add(torus)
  scene.add(/*group*/torus, controls, gridHelper)

  camera.position.z = 40;
  camera.position.x = 40;
  camera.position.y = 40
  animate()
  // Array(200).fill().forEach(addStar)
  loadExternal()
})
onBeforeUnmount(() => {
  geometry.dispose()
  material.dispose()

})

//////////////////////////////////////////////////////////////////////////
function generateGroupScene(rawScene, group) {
  // console.log('rawScene', rawScene)
  if(rawScene.isGroup) {
    // console.log(rawScene.children.length)
    for (let i=0; i<rawScene.children.length; i++) {
      let item = rawScene.children[i]
      if(item && item.isMesh) {
      // console.log('item.isMesh', item)
        group.push(item)
      } else if(item.isGroup) {
        // console.log('item.isGroup', item)
        generateGroupScene(item, group)
        // item.children.forEach(i => {
        //   group.push(i)
        // })
      }
    }
    // console.log('group before return', group)
    return group[0].parent
  } else {
    generateGroupScene(rawScene, group)
  }
}
</script>

<style scoped>
#threeJsView {
  /*height: 500px;*/
  /*width: 500px;*/
}
</style>
