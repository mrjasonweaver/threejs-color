const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
scene.background = new THREE.Color( 0xffffff ); // white
const renderer = new THREE.WebGLRenderer({ alpha: true }); // adds canvas transparency
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
let color = 0x000000; // black
scene.add( cube );

camera.position.z = 5;

window.addEventListener("keyup", event => {
  switch(event.code) {
    case "KeyR":
      color = 0xFF0000; // red
      break;
    case "KeyG":
      color = 0x00FF00; // green
      break;
    case "KeyB":
      color = 0x0000FF; // blue
      break;
  }
}, true);


const animate = () => {
  requestAnimationFrame( animate );
  cube.material.color.set(color);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render( scene, camera );
};

animate();
