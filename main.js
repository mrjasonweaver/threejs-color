const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer({ alpha: true }); // adds canvas transparency
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const white = new THREE.Color( 0xffffff );
const grey = new THREE.Color( 0xdddddd );
const red = new THREE.Color( 0xff0000 );
const green = new THREE.Color( 0x00ff00 );
const blue = new THREE.Color( 0x0000ff );

scene.background = white;

let state = {
  cubeColor: grey,
  previousTweenColor: grey,
  nextTweenColor: grey,
  alphaUnit: 0
}

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial();
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

const directionalLight = new THREE.DirectionalLight( 0xffffff );
directionalLight.position.y = 0;
directionalLight.position.z = 1;
scene.add( directionalLight );

cube.material.color.set(state.cubeColor);
camera.position.z = 5;

window.addEventListener("keyup", event => {
  switch(event.code) {
    case "KeyR":
      tweenColors(red);
      break;
    case "KeyG":
      tweenColors(green);
      break;
    case "KeyB":
      tweenColors(blue);
      break;
  }
}, true);

const tweenColors = color => {
  state = {
    ...state,
    previousTweenColor: state.cubeColor,
    nextTweenColor: color,
    alphaUnit: 0
  }
}

const animate = () => {
  requestAnimationFrame( animate );
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  if (!state.previousTweenColor.equals(state.nextTweenColor) ) {
    state.alphaUnit = +(state.alphaUnit + 0.01).toFixed(2);
    state.cubeColor = state.cubeColor.lerpColors(state.previousTweenColor, state.nextTweenColor, state.alphaUnit);
    cube.material.color.set(state.cubeColor);
  }

  renderer.render( scene, camera );
};

animate();
