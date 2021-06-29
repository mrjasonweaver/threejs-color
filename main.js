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

scene.background = white;

let state = {
  cubeColor: black,
  previousTweenColor: black,
  nextTweenColor: black,
  alphaUnit: 0,
  isTweenRunning: false
}

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial();
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );
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
    alphaUnit: 0,
    isTweenRunning: true
  }
}

const animate = () => {
  requestAnimationFrame( animate );
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  if (state.isTweenRunning && !state.previousTweenColor.equals(state.nextTweenColor) ) {
    state.alphaUnit = +(state.alphaUnit + 0.01).toFixed(2);
    state.cubeColor = state.cubeColor.lerpColors(state.previousTweenColor, state.nextTweenColor, state.alphaUnit);
    cube.material.color.set(state.cubeColor);
  } else {
    state.isTweenRunning = false;
  }

  renderer.render( scene, camera );
};

animate();
