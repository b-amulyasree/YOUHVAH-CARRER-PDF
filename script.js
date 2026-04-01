const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 5000);
camera.position.z = 400;

const renderer = new THREE.WebGLRenderer({ antialias:true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// CONTROLS (ZOOM FIX 🔥)
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableZoom = true;
controls.zoomSpeed = 1.2;
controls.minDistance = 50;
controls.maxDistance = 2000;

// LIGHT
const light = new THREE.PointLight(0xff0040, 2, 2000);
light.position.set(0,0,500);
scene.add(light);

// DATA
const sectors = [
  { name:"Tech", color:0xff0040, img:"images/tech.jpg" },
  { name:"Finance", color:0xff6600, img:"images/finance.jpg" },
  { name:"Medical", color:0x00ffcc, img:"images/medical.jpg" },
  { name:"Law", color:0x9966ff, img:"images/law.jpg" },
  { name:"Engineering", color:0xffff00, img:"images/engineering.jpg" },
  { name:"Creative", color:0xff00ff, img:"images/creative.jpg" },
  { name:"Media", color:0x00ffff, img:"images/media.jpg" },
  { name:"Hospitality", color:0xff3300, img:"images/hospitality.jpg" },
  { name:"Futuristic", color:0xffffff, img:"images/futuristic.jpg" }
];

const nodes = [];

// CREATE TREE
sectors.forEach((sector, i) => {
  const geometry = new THREE.SphereGeometry(12, 32, 32);

  const material = new THREE.MeshStandardMaterial({
    color: sector.color,
    emissive: sector.color,
    emissiveIntensity: 0.8
  });

  const sphere = new THREE.Mesh(geometry, material);

  sphere.position.y = i * -120 + 400;
  sphere.userData = sector;

  scene.add(sphere);
  nodes.push(sphere);
});

// BACKGROUND IMAGE FADE
const bg = document.getElementById("bg");

function updateBackground(y) {
  let index = Math.floor(Math.abs(y)/120);
  index = Math.min(index, sectors.length - 1);

  const newImg = sectors[index].img;

  if (bg.src !== newImg) {
    bg.style.opacity = 0;
    setTimeout(() => {
      bg.src = newImg;
      bg.style.opacity = 0.4;
    }, 700);
  }
}

// CLICK INTERACTION
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener("click", (event) => {
  mouse.x = (event.clientX/window.innerWidth)*2 -1;
  mouse.y = -(event.clientY/window.innerHeight)*2 +1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(nodes);

  if (intersects.length > 0) {
    const obj = intersects[0].object;

    // EXPAND EFFECT
    obj.scale.set(2,2,2);

    setTimeout(() => {
      obj.scale.set(1,1,1);
    }, 500);

    alert("Jobs in " + obj.userData.name);
  }
});

// ANIMATION LOOP
function animate() {
  requestAnimationFrame(animate);

  nodes.forEach(n => {
    n.rotation.y += 0.01;
  });

  updateBackground(camera.position.y);

  renderer.render(scene, camera);
}

animate();

// RESIZE FIX
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
