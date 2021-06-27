const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer({ alpha: true }); // adds canvas transparency
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const white = new THREE.Color( 0xffffff );
const black = new THREE.Color( 0x000000 );
const red = new THREE.Color( 0xff0000 );
const green = new THREE.Color( 0x00ff00 );
const blue = new THREE.Color( 0x0000ff );

let cubeColor = black;
scene.background = white;

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial();
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

window.addEventListener("keyup", event => {
  switch(event.code) {
    case "KeyR":
      cubeColor = red;
      break;
    case "KeyG":
      cubeColor = green;
      break;
    case "KeyB":
      cubeColor = blue;
      break;
  }
}, true);


const animate = () => {
  requestAnimationFrame( animate );
  cube.material.color.set(cubeColor);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render( scene, camera );
};

animate();
