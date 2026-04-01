const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x000011, 0.002);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
camera.position.set(0, 100, 800);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x0a0a1a);
document.body.appendChild(renderer.domElement);

// Controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.minDistance = 100;
controls.maxDistance = 2500;

// Enhanced Lighting
const ambient = new THREE.AmbientLight(0x404040, 0.4);
scene.add(ambient);
const directional = new THREE.DirectionalLight(0xffffff, 0.8);
directional.position.set(1, 1, 0.5);
scene.add(directional);
const pointLight = new THREE.PointLight(0xff0040, 1.5, 3000);
pointLight.position.set(0, 500, 0);
scene.add(pointLight);

// Tree Data Structure
const treeData = {
  root: {
    name: "Career Universe",
    color: 0xffffff,
    children: [
      {
        name: "Tech/IT",
        color: 0xff0040,
        jobs: ["AI Engineer ₹25L+", "Cloud Architect ₹30L+", "Cybersecurity ₹22L+"],
        children: [
          { name: "AI/ML", color: 0xcc0033, jobs: ["NLP Specialist ₹28L+", "MLOps Engineer ₹26L+"] },
          { name: "Cloud/DevOps", color: 0xff3366, jobs: ["Kubernetes Expert ₹24L+", "SRE ₹25L+"] }
        ]
      },
      {
        name: "Finance",
        color: 0xff6600,
        jobs: ["Investment Banker ₹40L+", "Quant ₹35L+"],
        children: [
          { name: "Trading", color: 0xff9900, jobs: ["Algo Trader ₹45L+", "HFT Dev ₹50L+"] },
          { name: "Risk", color: 0xcc5500, jobs: ["Credit Risk ₹28L+", "Compliance ₹24L+"] }
        ]
      },
      {
        name: "Healthcare",
        color: 0x00ffcc,
        jobs: ["Surgeon ₹50L+", "Pharma Mgr ₹28L+"],
        children: [
          { name: "Surgery", color: 0x00cc99, jobs: ["Cardiologist ₹60L+", "Neuro ₹55L+"] },
          { name: "Biotech", color: 0x00ff99, jobs: ["CRISPR Eng ₹35L+", "Genomics ₹30L+"] }
        ]
      },
      {
        name: "Engineering",
        color: 0xffff00,
        jobs: ["Petroleum ₹25L+", "Aerospace ₹28L+"],
        children: [
          { name: "Energy", color: 0xcccc00, jobs: ["Fusion Eng ₹40L+", "Hydrogen ₹32L+"] },
          { name: "Civil", color: 0xffff66, jobs: ["Smart City ₹26L+", "Infra ₹24L+"] }
        ]
      },
      {
        name: "Futuristic",
        color: 0x9966ff,
        jobs: ["Quantum Eng ₹40L+", "Space Analyst ₹30L+"],
        children: [
          { name: "Space", color: 0x6633cc, jobs: ["Satellite Eng ₹35L+", "Orbital ₹32L+"] },
          { name: "Quantum", color: 0x9933ff, jobs: ["Qubit Designer ₹45L+", "Error Correction ₹38L+"] }
        ]
      }
    ]
  }
};

// Create Tree Branches & Nodes
const nodes = [];
const branches = [];
let expandedNodes = new Set();

function createTreeNode(data, parentPos = new THREE.Vector3(0, 200, 0), depth = 0) {
  const geometry = new THREE.CylinderGeometry(3 - depth * 0.5, 8 - depth * 1, 1, 8);
  const material = new THREE.MeshStandardMaterial({
    color: data.color,
    emissive: data.color,
    emissiveIntensity: 0.4 + depth * 0.1,
    metalness: 0.4,
    roughness: 0.3
  });
  const node = new THREE.Mesh(geometry, material);
  node.position.copy(parentPos);
  node.position.y -= 150 * (depth + 1);
  node.userData = data;
  scene.add(node);
  nodes.push(node);

  // Branch to parent
  if (depth > 0) {
    const branchGeo = new THREE.CylinderGeometry(1, 2, 150, 8);
    const branchMat = new THREE.MeshStandardMaterial({ 
      color: 0x444466,
      transparent: true,
      opacity: 0.6
    });
    const branch = new THREE.Mesh(branchGeo, branchMat);
    branch.position.lerpVectors(parentPos, node.position, 0.5);
    branch.rotation.z = Math.atan2(
      node.position.x - parentPos.x,
      node.position.z - parentPos.z
    );
    scene.add(branch);
    branches.push(branch);
  }

  return node.position;
}

createTreeNode(treeData.root);

// UI Elements
const bg = document.getElementById('bg');
const tooltip = document.getElementById('tooltip');
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Interactions
window.addEventListener('mousemove', (e) => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(nodes);
  
  if (intersects.length > 0) {
    const data = intersects[0].object.userData;
    tooltip.innerHTML = `<strong>${data.name}</strong><br>${data.jobs?.join('<br>') || 'Root Sector'}`;
    tooltip.style.display = 'block';
    tooltip.style.left = e.clientX + 15 + 'px';
    tooltip.style.top = e.clientY + 15 + 'px';
    updateBackground(data);
    intersects[0].object.material.emissiveIntensity = 0.9;
    intersects[0].object.scale.set(1.3, 1.3, 1.3);
  } else {
    tooltip.style.display = 'none';
    nodes.forEach(n => {
      n.material.emissiveIntensity = 0.4;
      n.scale.set(1, 1, 1);
    });
  }
});

window.addEventListener('click', (e) => {
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(nodes);
  if (intersects.length > 0) {
    const node = intersects[0].object;
    const data = node.userData;
    if (data.children) {
      if (expandedNodes.has(data.name)) {
        // Collapse
        expandedNodes.delete(data.name);
        node.scale.set(1,1,1);
      } else {
        // Expand - Create children dynamically
        expandedNodes.add(data.name);
        data.children.forEach(child => {
          const childPos = createTreeNode(child, node.position, nodes.length * 0.1);
        });
        node.scale.set(1.5,1.5,1.5);
      }
    } else {
      alert(`${data.name} Jobs:\n${data.jobs?.join('\n') || 'Explore parent sectors!'}`);
    }
  }
});

function updateBackground(data) {
  bg.style.opacity = 0;
  setTimeout(() => {
    bg.src = 'https://images.unsplash.com/photo-1558494949-ef0d38d3ab97?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'; // Default tree bg
    bg.style.opacity = 0.3;
  }, 600);
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  
  nodes.forEach((node, i) => {
    node.rotation.y += 0.005 + i * 0.001;
    node.rotation.z += 0.002;
    node.position.x += Math.sin(Date.now() * 0.0005 + i) * 0.3;
  });
  
  branches.forEach(b => {
    b.rotation.z += 0.002;
  });
  
  controls.update();
  renderer.render(scene, camera);
}
animate();

// Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
