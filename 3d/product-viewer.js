// product-viewer.js

let viewerScene, viewerCamera, viewerRenderer, viewerControls, viewerModel;

function load3DModel(modelPath) {
  const container = document.getElementById("product-3d-viewer");

  // Clear previous canvas if exists
  container.innerHTML = "";

  // Scene setup
  viewerScene = new THREE.Scene();
  viewerCamera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
  viewerCamera.position.set(0, 1.5, 3);

  viewerRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  viewerRenderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(viewerRenderer.domElement);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  viewerScene.add(ambientLight);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
  directionalLight.position.set(3, 5, 2);
  viewerScene.add(directionalLight);

  // Controls
  viewerControls = new THREE.OrbitControls(viewerCamera, viewerRenderer.domElement);
  viewerControls.enableDamping = true;

  // GLTF Loader
  const loader = new THREE.GLTFLoader();
  loader.load(
    modelPath,
    function (gltf) {
      viewerModel = gltf.scene;
      viewerModel.scale.set(1, 1, 1);
      viewerScene.add(viewerModel);
      animateViewer();
    },
    undefined,
    function (error) {
      console.error("Error loading 3D model:", error);
      container.innerHTML = "<p style='color: var(--danger);'>3D model failed to load.</p>";
    }
  );
}

function animateViewer() {
  requestAnimationFrame(animateViewer);
  if (viewerModel) viewerModel.rotation.y += 0.002; // slow rotation
  viewerControls.update();
  viewerRenderer.render(viewerScene, viewerCamera);
}
