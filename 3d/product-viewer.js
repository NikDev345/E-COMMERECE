// This is a placeholder for 3D product view
function load3DModel(modelPath) {
  const container = document.getElementById("product-3d-viewer");
  container.innerHTML = "";
  // Setup Three.js scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf9f8f6);
  const camera = new THREE.PerspectiveCamera(60, container.offsetWidth / container.offsetHeight, 0.1, 1000);
  camera.position.set(0, 1, 3);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.offsetWidth, container.offsetHeight);
  container.appendChild(renderer.domElement);

  // Light
  const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
  scene.add(light);

  // Placeholder geometry (replace with GLTFLoader for real 3D models)
  const geometry = new THREE.TorusKnotGeometry(0.7, 0.23, 120, 12);
  const material = new THREE.MeshStandardMaterial({ color: 0xb59e5f, metalness: 0.8, roughness: 0.3 });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // Orbit Controls
  const controls = new THREE.OrbitControls(camera, renderer.domElement);

  function animate() {
    mesh.rotation.y += 0.01;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();
}