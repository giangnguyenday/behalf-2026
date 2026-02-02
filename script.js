// Config
const CONFIG = {
  backgroundColor: 0x000000,
  camera: { fov: 45, near: 0.1, far: 5000 },
  renderer: {
    antialias: true,
    pixelRatio: window.devicePixelRatio || 1,
    outputEncoding: THREE.sRGBEncoding,
    physicallyCorrectLights: true,
    toneMapping: THREE.ACESFilmicToneMapping,
    toneMappingExposure: 1.5, // stronger HDR punch
  },
  lights: {
    enabled: true,
    ambient: { color: 0xffffff, intensity: 0.3 },
    key: { color: 0xffffff, intensity: 1.47, position: [1.2, 1.5, 1.8] },
    rim: { color: 0x88b7ff, intensity: 0.9, position: [-1, 0.6, -1] },
  },
  controls: {
    enableDamping: true,
    dampingFactor: 0.08,
    minDistance: 30,
    maxDistance: 2500,
    enablePan: true,
    enableZoom: false,
    autoRotate: true,
    autoRotateSpeed: 0.55,
    idleAutoRotateDelayMs: 0,
    defaultRotation: { x: -0.18, y: 0.5, z: 0 },
  },
  model: {
    extrusionDepth: 50,
    bevelEnabled: true,
    bevelThickness: 25,
    bevelSize: 25,
    bevelSegments: 20,
    alphaThreshold: 20,
    maxContourPoints: 1400,
    targetSize: 260,
    alphaTest: 0.1,
    pngAdjust: {
      front: {
        saturation: 1,
        vibrance: 0,
        brightness: 0,
        contrast: 1,
      },
      back: {
        saturation: 1,
        vibrance: 0,
        brightness: 0,
        contrast: 1,
      },
    },
    testPlane: false,
    useTexture: true,
    useBasicMaterial: false,
    basicColor: 0x66aacc,
  },
  texture: {
    flipY: true,
    encoding: THREE.sRGBEncoding,
    minFilter: THREE.LinearMipmapLinearFilter,
    magFilter: THREE.LinearFilter,
    anisotropyMax: 8,
  },
  materials: {
    useMatcap: false,
    useCrystal: true, // toggle crystal material on/off
    crystal: {
      enabled: true,
      // Refraction + reflection controls live here.
      tint: 0xff6fb8, // base surface tint
      opacity: 0.57, // overall transparency
      transmission: 1.0, // refraction strength (0-1)
      roughness: 1.0, // higher = blurrier reflections/refraction
      thickness: 44.9, // higher = stronger distortion
      ior: 1.23, // refraction index (higher bends more)
      clearcoat: 1, // reflection strength
      clearcoatRoughness: 0, // blurrier reflections on the surface
      emissive: 0xff6fb8, // glow tint
      emissiveIntensity: 37.7, // glow strength
      metalness: 0, // metallic look
      envMapIntensity: 1.84, // HDR reflection intensity
      attenuationColor: 0xff7fc8, // internal tint for refraction
      attenuationDistance: 10, // smaller = stronger tinting
      sideTintScale: 2, // side faces tint multiplier
      depthWrite: false, // false = cleaner transparency
    },
    matcap: {
      light: 0xf5f7ff,
      mid: 0x9aa8c3,
      dark: 0x2b3445,
    },
    cap: {
      side: THREE.DoubleSide,
      shininess: 35,
      specular: 0x3a3a3a,
    },
    side: {
      color: 0x101010,
      shininess: 220,
      specular: 0x2a2a2a,
    },
  },
  layers: {
    pngOffset: 0.55, // distance from crystal shell to PNG plane
    pngGap: 0.05, // separation between front/back PNG planes
    backCrystalEnabled: true, // extra crystal layer behind PNG
    backCrystalOffset: 1.25, // push back layer further away
    backCrystalScale: 1.0, // scale back layer size
    backCrystalTintScale: 0.9, // tint strength for back layer
  },
  environment: {
    enabled: true,
    hdrPath: "assets/hdr.skysunrise.hdr", // swap HDR for different reflection/refraction
    background: false,
    backgroundColor: 0x000000,
  },
  postprocessing: {
    enabled: true,
    bloom: {
      enabled: true,
      strength: 0.18,
      radius: 1.25,
      threshold: 0.74,
    },
    film: {
      enabled: false,
      noiseIntensity: 0.28,
      scanlinesIntensity: 0.42,
      scanlinesCount: 594,
      grayscale: false,
    },
    dotScreen: {
      enabled: false,
      angle: 0.06,
      scale: 0.61,
    },
    outline: {
      enabled: false,
      edgeStrength: 3.0,
      edgeGlow: 0.0,
      edgeThickness: 1.0,
      pulsePeriod: 0,
      visibleColor: 0xffffff,
      hiddenColor: 0x220000,
    },
    ssao: {
      enabled: false,
      kernelRadius: 8,
      minDistance: 0.009,
      maxDistance: 0.18,
    },
    sao: {
      enabled: false,
      saoIntensity: 0.05,
      saoScale: 132,
      saoKernelRadius: 17,
      saoMinResolution: 0,
      saoBlur: false,
      saoBlurRadius: 2,
      saoBlurStdDev: 4,
      saoBlurDepthCutoff: 0.01,
    },
    sobel: {
      enabled: false,
      scale: 1.0,
    },
    lut: {
      enabled: false,
      intensity: 1.0,
    },
    vignette: {
      enabled: true,
      offset: 2,
      darkness: 1.49,
    },
    rgbShift: {
      enabled: false,
      amount: 0.0022,
      angle: 0.0,
    },
    fxaa: {
      enabled: true,
    },
  },
  framing: { distanceMultiplier: 2.2, nearDivisor: 100, farMultiplier: 100 },
  shadows: {
    enabled: true,
    mapSize: 2048,
    bias: -0.00025,
    radius: 2,
  },
};

const MODEL_TEXTURES = {
  giang: "assets/loc.giang.png",
  jinny: "assets/loc.jinny.png",
  lam: "assets/loc.lam.png",
  nha: "assets/loc.nha.png",
  nhan: "assets/loc.nhan.png",
  phong: "assets/loc.phong.png",
};

const HDR_OPTIONS = [
  "assets/hdr.skysunrise.hdr",
  "assets/hdr.skyday.hdr",
  "assets/hdr.skymoon.hdr",
  "assets/hdr.skymoonrise.hdr",
  "assets/hdr.hill.hdr",
  "assets/hdr.spring.hdr",
  "assets/hdr.studioS.hdr",
  "assets/hdr.studioK.hdr",
];

const INITIAL_MODEL = "giang";

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(CONFIG.backgroundColor);

const camera = new THREE.PerspectiveCamera(
  CONFIG.camera.fov,
  window.innerWidth / window.innerHeight,
  CONFIG.camera.near,
  CONFIG.camera.far,
);

const renderer = new THREE.WebGLRenderer({
  antialias: CONFIG.renderer.antialias,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(CONFIG.renderer.pixelRatio);
renderer.outputEncoding = CONFIG.renderer.outputEncoding;
renderer.physicallyCorrectLights = CONFIG.renderer.physicallyCorrectLights;
renderer.toneMapping = CONFIG.renderer.toneMapping;
renderer.toneMappingExposure = CONFIG.renderer.toneMappingExposure;
renderer.shadowMap.enabled = CONFIG.shadows.enabled && CONFIG.lights.enabled;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.domElement.id = "canvas";
document.body.appendChild(renderer.domElement);

let environmentMap = null;
let composer = null;
let renderPass = null;
let bloomPass = null;
let filmPass = null;
let dotPass = null;
let outlinePass = null;
let ssaoPass = null;
let saoPass = null;
let sobelPass = null;
let lutPass = null;
let lutTexture = null;
let vignettePass = null;
let rgbShiftPass = null;
let fxaaPass = null;

function loadEnvironment() {
  if (!CONFIG.environment.enabled || !THREE.RGBELoader) return;
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();
  new THREE.RGBELoader()
    .setDataType(THREE.UnsignedByteType)
    .load(
      CONFIG.environment.hdrPath,
      (hdr) => {
        const envMap = pmremGenerator.fromEquirectangular(hdr).texture;
        environmentMap = envMap;
        applyEnvironmentSettings();
        updateAllCrystalMaterials();
        hdr.dispose();
        pmremGenerator.dispose();
      },
      undefined,
      (error) => {
        console.warn("HDR environment failed to load:", error);
        pmremGenerator.dispose();
      },
    );
}

function applyEnvironmentSettings() {
  const hasEnv = CONFIG.environment.enabled && environmentMap;
  scene.environment = hasEnv ? environmentMap : null;

  if (CONFIG.environment.background && environmentMap) {
    scene.background = environmentMap;
  } else {
    scene.background = new THREE.Color(CONFIG.environment.backgroundColor);
  }
}

function applyRendererSettings() {
  renderer.toneMappingExposure = CONFIG.renderer.toneMappingExposure;
  renderer.physicallyCorrectLights = CONFIG.renderer.physicallyCorrectLights;
  renderer.shadowMap.enabled = CONFIG.shadows.enabled && CONFIG.lights.enabled;
  applyPostProcessingSettings();
}

function setupPostProcessing() {
  if (!CONFIG.postprocessing.enabled) return;
  if (composer) return;
  if (
    !THREE.EffectComposer ||
    !THREE.RenderPass ||
    !THREE.UnrealBloomPass ||
    !THREE.ShaderPass ||
    !THREE.CopyShader ||
    !THREE.LuminosityHighPassShader
  ) {
    console.warn("Postprocessing modules not found.");
    return;
  }

  composer = new THREE.EffectComposer(renderer);
  renderPass = new THREE.RenderPass(scene, camera);
  composer.addPass(renderPass);

  if (THREE.SSAOPass && THREE.SimplexNoise) {
    ssaoPass = new THREE.SSAOPass(scene, camera, window.innerWidth, window.innerHeight);
    composer.addPass(ssaoPass);
  } else if (THREE.SSAOPass && !THREE.SimplexNoise) {
    console.warn("SSAOPass needs THREE.SimplexNoise.");
  }

  if (
    THREE.SAOPass &&
    THREE.SAOShader &&
    THREE.DepthLimitedBlurShader &&
    THREE.UnpackDepthRGBAShader
  ) {
    saoPass = new THREE.SAOPass(scene, camera, false, true);
    composer.addPass(saoPass);
  } else if (
    THREE.SAOPass &&
    (!THREE.SAOShader ||
      !THREE.DepthLimitedBlurShader ||
      !THREE.UnpackDepthRGBAShader)
  ) {
    console.warn(
      "SAOPass needs THREE.SAOShader, THREE.DepthLimitedBlurShader, and THREE.UnpackDepthRGBAShader.",
    );
  }

  bloomPass = new THREE.UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    CONFIG.postprocessing.bloom.strength,
    CONFIG.postprocessing.bloom.radius,
    CONFIG.postprocessing.bloom.threshold,
  );
  composer.addPass(bloomPass);

  if (THREE.FilmPass) {
    filmPass = new THREE.FilmPass(
      CONFIG.postprocessing.film.noiseIntensity,
      CONFIG.postprocessing.film.scanlinesIntensity,
      CONFIG.postprocessing.film.scanlinesCount,
      CONFIG.postprocessing.film.grayscale,
    );
    composer.addPass(filmPass);
  }

  if (THREE.DotScreenPass) {
    dotPass = new THREE.DotScreenPass(
      new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2),
      CONFIG.postprocessing.dotScreen.angle,
      CONFIG.postprocessing.dotScreen.scale,
    );
    composer.addPass(dotPass);
  }

  if (THREE.OutlinePass) {
    outlinePass = new THREE.OutlinePass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      scene,
      camera,
      [],
    );
    composer.addPass(outlinePass);
  }

  if (THREE.SobelOperatorShader) {
    sobelPass = new THREE.ShaderPass(THREE.SobelOperatorShader);
    composer.addPass(sobelPass);
  }

  if (THREE.LUTPass && lutTexture) {
    lutPass = new THREE.LUTPass(lutTexture, CONFIG.postprocessing.lut.intensity);
    composer.addPass(lutPass);
  }

  if (THREE.RGBShiftShader) {
    rgbShiftPass = new THREE.ShaderPass(THREE.RGBShiftShader);
    composer.addPass(rgbShiftPass);
  }

  if (THREE.VignetteShader) {
    vignettePass = new THREE.ShaderPass(THREE.VignetteShader);
    composer.addPass(vignettePass);
  }

  if (THREE.FXAAShader) {
    fxaaPass = new THREE.ShaderPass(THREE.FXAAShader);
    composer.addPass(fxaaPass);
  }

  applyPostProcessingSettings();
}

function updateFxaaResolution() {
  if (!fxaaPass) return;
  const pixelRatio = renderer.getPixelRatio();
  fxaaPass.material.uniforms.resolution.value.x = 1 / (window.innerWidth * pixelRatio);
  fxaaPass.material.uniforms.resolution.value.y = 1 / (window.innerHeight * pixelRatio);
}

function updateSobelResolution() {
  if (!sobelPass) return;
  if (!sobelPass.uniforms?.resolution) return;
  const scale = Math.max(0.01, CONFIG.postprocessing.sobel.scale || 1);
  sobelPass.uniforms.resolution.value.x = window.innerWidth / scale;
  sobelPass.uniforms.resolution.value.y = window.innerHeight / scale;
}

function updateOutlineSelection() {
  if (!outlinePass) return;
  outlinePass.selectedObjects = currentModel ? [currentModel] : [];
}

function updatePostFxResolution() {
  if (composer) composer.setSize(window.innerWidth, window.innerHeight);
  if (ssaoPass) ssaoPass.setSize(window.innerWidth, window.innerHeight);
  if (saoPass) saoPass.setSize(window.innerWidth, window.innerHeight);
  if (outlinePass) outlinePass.setSize(window.innerWidth, window.innerHeight);
  updateFxaaResolution();
  updateSobelResolution();
}

function applyPostProcessingSettings() {
  if (!CONFIG.postprocessing.enabled) return;
  if (!composer) setupPostProcessing();
  if (!composer) return;

  updatePostFxResolution();

  if (bloomPass) {
    bloomPass.enabled = CONFIG.postprocessing.bloom.enabled;
    bloomPass.strength = CONFIG.postprocessing.bloom.strength;
    bloomPass.radius = CONFIG.postprocessing.bloom.radius;
    bloomPass.threshold = CONFIG.postprocessing.bloom.threshold;
  }

  if (filmPass) {
    filmPass.enabled = CONFIG.postprocessing.film.enabled;
    filmPass.uniforms.nIntensity.value = CONFIG.postprocessing.film.noiseIntensity;
    filmPass.uniforms.sIntensity.value = CONFIG.postprocessing.film.scanlinesIntensity;
    filmPass.uniforms.sCount.value = CONFIG.postprocessing.film.scanlinesCount;
    filmPass.uniforms.grayscale.value = CONFIG.postprocessing.film.grayscale ? 1 : 0;
  }

  if (dotPass) {
    dotPass.enabled = CONFIG.postprocessing.dotScreen.enabled;
    dotPass.uniforms.angle.value = CONFIG.postprocessing.dotScreen.angle;
    dotPass.uniforms.scale.value = CONFIG.postprocessing.dotScreen.scale;
  }

  if (outlinePass) {
    outlinePass.enabled = CONFIG.postprocessing.outline.enabled;
    outlinePass.edgeStrength = CONFIG.postprocessing.outline.edgeStrength;
    outlinePass.edgeGlow = CONFIG.postprocessing.outline.edgeGlow;
    outlinePass.edgeThickness = CONFIG.postprocessing.outline.edgeThickness;
    outlinePass.pulsePeriod = CONFIG.postprocessing.outline.pulsePeriod;
    outlinePass.visibleEdgeColor.set(CONFIG.postprocessing.outline.visibleColor);
    outlinePass.hiddenEdgeColor.set(CONFIG.postprocessing.outline.hiddenColor);
    updateOutlineSelection();
  }

  if (ssaoPass) {
    ssaoPass.enabled = CONFIG.postprocessing.ssao.enabled;
    ssaoPass.kernelRadius = CONFIG.postprocessing.ssao.kernelRadius;
    ssaoPass.minDistance = CONFIG.postprocessing.ssao.minDistance;
    ssaoPass.maxDistance = CONFIG.postprocessing.ssao.maxDistance;
  }

  if (saoPass) {
    saoPass.enabled = CONFIG.postprocessing.sao.enabled;
    saoPass.params.saoIntensity = CONFIG.postprocessing.sao.saoIntensity;
    saoPass.params.saoScale = CONFIG.postprocessing.sao.saoScale;
    saoPass.params.saoKernelRadius = CONFIG.postprocessing.sao.saoKernelRadius;
    saoPass.params.saoMinResolution = CONFIG.postprocessing.sao.saoMinResolution;
    saoPass.params.saoBlur = CONFIG.postprocessing.sao.saoBlur;
    saoPass.params.saoBlurRadius = CONFIG.postprocessing.sao.saoBlurRadius;
    saoPass.params.saoBlurStdDev = CONFIG.postprocessing.sao.saoBlurStdDev;
    saoPass.params.saoBlurDepthCutoff = CONFIG.postprocessing.sao.saoBlurDepthCutoff;
  }

  if (sobelPass) {
    sobelPass.enabled = CONFIG.postprocessing.sobel.enabled;
    updateSobelResolution();
  }

  if (lutPass) {
    lutPass.enabled = CONFIG.postprocessing.lut.enabled;
    lutPass.intensity = CONFIG.postprocessing.lut.intensity;
  } else if (CONFIG.postprocessing.lut.enabled) {
    console.warn("LUT enabled but no LUT texture is loaded.");
  }

  if (rgbShiftPass) {
    rgbShiftPass.enabled = CONFIG.postprocessing.rgbShift.enabled;
    rgbShiftPass.uniforms.amount.value = CONFIG.postprocessing.rgbShift.amount;
    rgbShiftPass.uniforms.angle.value = CONFIG.postprocessing.rgbShift.angle;
  }

  if (vignettePass) {
    vignettePass.enabled = CONFIG.postprocessing.vignette.enabled;
    vignettePass.uniforms.offset.value = CONFIG.postprocessing.vignette.offset;
    vignettePass.uniforms.darkness.value = CONFIG.postprocessing.vignette.darkness;
  }

  if (fxaaPass) {
    fxaaPass.enabled = CONFIG.postprocessing.fxaa.enabled;
    updateFxaaResolution();
  }
}

function applyLightingSettings() {
  const lightsOn = CONFIG.lights.enabled;
  if (!ambientLight || !keyLight || !rimLight) return;

  ambientLight.visible = lightsOn;
  keyLight.visible = lightsOn;
  rimLight.visible = lightsOn;

  ambientLight.color.set(CONFIG.lights.ambient.color);
  ambientLight.intensity = CONFIG.lights.ambient.intensity;

  keyLight.color.set(CONFIG.lights.key.color);
  keyLight.intensity = CONFIG.lights.key.intensity;
  keyLight.position.set(...CONFIG.lights.key.position);
  keyLight.castShadow = CONFIG.shadows.enabled && lightsOn;
  keyLight.shadow.mapSize.width = CONFIG.shadows.mapSize;
  keyLight.shadow.mapSize.height = CONFIG.shadows.mapSize;
  keyLight.shadow.bias = CONFIG.shadows.bias;
  keyLight.shadow.radius = CONFIG.shadows.radius;

  rimLight.color.set(CONFIG.lights.rim.color);
  rimLight.intensity = CONFIG.lights.rim.intensity;
  rimLight.position.set(...CONFIG.lights.rim.position);

  renderer.shadowMap.enabled = CONFIG.shadows.enabled && lightsOn;
}

loadEnvironment();
applyEnvironmentSettings();

let ambientLight;
let keyLight;
let rimLight;

function setupLights() {
  ambientLight = new THREE.AmbientLight(
    CONFIG.lights.ambient.color,
    CONFIG.lights.ambient.intensity,
  );
  scene.add(ambientLight);

  keyLight = new THREE.DirectionalLight(
    CONFIG.lights.key.color,
    CONFIG.lights.key.intensity,
  );
  keyLight.position.set(...CONFIG.lights.key.position);
  keyLight.shadow.mapSize.width = CONFIG.shadows.mapSize;
  keyLight.shadow.mapSize.height = CONFIG.shadows.mapSize;
  keyLight.shadow.bias = CONFIG.shadows.bias;
  keyLight.shadow.radius = CONFIG.shadows.radius;
  keyLight.shadow.camera.near = 0.1;
  keyLight.shadow.camera.far = 2000;
  keyLight.shadow.camera.left = -600;
  keyLight.shadow.camera.right = 600;
  keyLight.shadow.camera.top = 600;
  keyLight.shadow.camera.bottom = -600;
  scene.add(keyLight);

  rimLight = new THREE.DirectionalLight(
    CONFIG.lights.rim.color,
    CONFIG.lights.rim.intensity,
  );
  rimLight.position.set(...CONFIG.lights.rim.position);
  scene.add(rimLight);

  applyLightingSettings();
}

setupLights();

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = CONFIG.controls.enableDamping;
controls.dampingFactor = CONFIG.controls.dampingFactor;
controls.minDistance = CONFIG.controls.minDistance;
controls.maxDistance = CONFIG.controls.maxDistance;
controls.enablePan = CONFIG.controls.enablePan;
controls.enableZoom = CONFIG.controls.enableZoom;
controls.autoRotate = false;
controls.autoRotateSpeed = CONFIG.controls.autoRotateSpeed;


let lastUserInteraction = performance.now();

const markInteracted = () => {
  lastUserInteraction = performance.now();
  controls.autoRotate = false;
};

renderer.domElement.addEventListener("pointerdown", markInteracted);
renderer.domElement.addEventListener("wheel", markInteracted, {
  passive: true,
});

let currentModel = null;
let currentModelName = INITIAL_MODEL;
let currentLoadId = 0;

// Image + mask
function loadImage(path) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    img.src = path;
  });
}

function buildMaskFromImage(image) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  canvas.width = image.width;
  canvas.height = image.height;
  ctx.drawImage(image, 0, 0);

  let data;
  try {
    ({ data } = ctx.getImageData(0, 0, canvas.width, canvas.height));
  } catch (error) {
    return { mask: null, width: canvas.width, height: canvas.height, error };
  }

  const width = canvas.width;
  const height = canvas.height;
  const total = width * height;
  const mask = new Uint8Array(total);

  for (let i = 0; i < total; i++) {
    const alpha = data[i * 4 + 3];
    mask[i] = alpha > CONFIG.model.alphaThreshold ? 1 : 0;
  }

  return { mask, width, height, error: null };
}

function applyPngAdjustments(image, adjust) {
  const { saturation, vibrance, brightness, contrast } = adjust;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  canvas.width = image.width;
  canvas.height = image.height;
  ctx.drawImage(image, 0, 0);

  if (
    saturation === 1 &&
    vibrance === 0 &&
    brightness === 0 &&
    contrast === 1
  ) {
    return canvas;
  }

  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    let r = data[i] / 255;
    let g = data[i + 1] / 255;
    let b = data[i + 2] / 255;

    // brightness/contrast
    r = (r - 0.5) * contrast + 0.5 + brightness;
    g = (g - 0.5) * contrast + 0.5 + brightness;
    b = (b - 0.5) * contrast + 0.5 + brightness;

    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    // saturation
    r = luma + (r - luma) * saturation;
    g = luma + (g - luma) * saturation;
    b = luma + (b - luma) * saturation;

    // vibrance boosts low-saturation colors more
    const max = Math.max(r, g, b);
    const vibFactor =
      vibrance >= 0 ? 1 + vibrance * (1 - max) : 1 + vibrance;
    r = luma + (r - luma) * vibFactor;
    g = luma + (g - luma) * vibFactor;
    b = luma + (b - luma) * vibFactor;

    data[i] = Math.max(0, Math.min(255, Math.round(r * 255)));
    data[i + 1] = Math.max(0, Math.min(255, Math.round(g * 255)));
    data[i + 2] = Math.max(0, Math.min(255, Math.round(b * 255)));
  }
  ctx.putImageData(imgData, 0, 0);
  return canvas;
}

function traceContour(mask, width, height) {
  const isSolid = (x, y) =>
    x >= 0 && y >= 0 && x < width && y < height && mask[y * width + x];
  const isBoundary = (x, y) => {
    if (!isSolid(x, y)) return false;
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) continue;
        if (!isSolid(x + dx, y + dy)) return true;
      }
    }
    return false;
  };

  let startX = -1;
  let startY = -1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (mask[y * width + x] && isBoundary(x, y)) {
        startX = x;
        startY = y;
        break;
      }
    }
    if (startX !== -1) break;
  }

  if (startX === -1) return [];

  const directions = [
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
    [-1, 0],
    [-1, -1],
    [0, -1],
    [1, -1],
  ];

  const contour = [];
  let x = startX;
  let y = startY;
  let prevDir = 6;
  let guard = 0;
  const maxSteps = width * height * 4;

  do {
    contour.push([x, y]);
    let found = false;

    for (let i = 0; i < 8; i++) {
      const dir = (prevDir + 1 + i) % 8;
      const nx = x + directions[dir][0];
      const ny = y + directions[dir][1];

      if (isSolid(nx, ny)) {
        x = nx;
        y = ny;
        prevDir = (dir + 4) % 8;
        found = true;
        break;
      }
    }

    if (!found) break;
    guard++;
    if (guard > maxSteps) break;
  } while (!(x === startX && y === startY));

  return contour;
}

function decimateContour(points) {
  if (points.length <= CONFIG.model.maxContourPoints) return points;
  const stride = Math.ceil(points.length / CONFIG.model.maxContourPoints);
  const reduced = [];
  for (let i = 0; i < points.length; i += stride) {
    reduced.push(points[i]);
  }
  return reduced;
}

function createTextureFromImage(image, adjustConfig) {
  const adjustedCanvas = applyPngAdjustments(image, adjustConfig);
  const texture = new THREE.CanvasTexture(adjustedCanvas);
  texture.needsUpdate = true;
  texture.flipY = CONFIG.texture.flipY;
  texture.encoding = CONFIG.texture.encoding;
  texture.minFilter = CONFIG.texture.minFilter;
  texture.magFilter = CONFIG.texture.magFilter;
  texture.anisotropy = Math.min(
    CONFIG.texture.anisotropyMax,
    renderer.capabilities.getMaxAnisotropy(),
  );
  return texture;
}

let cachedMatcap = null;

function hexToRgb(hex) {
  return {
    r: (hex >> 16) & 255,
    g: (hex >> 8) & 255,
    b: hex & 255,
  };
}

function rgbToCss({ r, g, b }) {
  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
}

function getMatcapTexture() {
  if (cachedMatcap) return cachedMatcap;

  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  const light = hexToRgb(CONFIG.materials.matcap.light);
  const mid = hexToRgb(CONFIG.materials.matcap.mid);
  const dark = hexToRgb(CONFIG.materials.matcap.dark);

  const gradient = ctx.createRadialGradient(
    size * 0.35,
    size * 0.35,
    size * 0.05,
    size * 0.55,
    size * 0.6,
    size * 0.75,
  );
  gradient.addColorStop(0, rgbToCss(light));
  gradient.addColorStop(0.45, rgbToCss(mid));
  gradient.addColorStop(1, rgbToCss(dark));

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.encoding = THREE.sRGBEncoding;
  cachedMatcap = texture;
  return cachedMatcap;
}

function toHex(colorValue) {
  if (typeof colorValue === "number") return colorValue;
  return new THREE.Color(colorValue).getHex();
}

function hexToCss(colorValue) {
  const hex = toHex(colorValue);
  return `#${hex.toString(16).padStart(6, "0")}`;
}

function scaleColor(hex, factor) {
  const resolved = toHex(hex);
  const r = Math.min(
    255,
    Math.max(0, Math.round(((resolved >> 16) & 255) * factor)),
  );
  const g = Math.min(
    255,
    Math.max(0, Math.round(((resolved >> 8) & 255) * factor)),
  );
  const b = Math.min(
    255,
    Math.max(0, Math.round((resolved & 255) * factor)),
  );
  return (r << 16) | (g << 8) | b;
}

function getCrystalConfig() {
  return CONFIG.materials.crystal;
}

function createCrystalMaterial(tintScale, side, role) {
  const matConfig = getCrystalConfig();
  const resolvedTint = scaleColor(matConfig.tint, tintScale ?? 1);
  const materialOptions = {
    color: resolvedTint,
    transparent: true,
    opacity: matConfig.opacity,
    transmission: matConfig.transmission,
    roughness: matConfig.roughness,
    metalness: matConfig.metalness || 0,
    thickness: matConfig.thickness,
    ior: matConfig.ior,
    emissive: matConfig.emissive || 0x000000,
    emissiveIntensity: matConfig.emissiveIntensity || 0,
    clearcoat: matConfig.clearcoat,
    clearcoatRoughness: matConfig.clearcoatRoughness,
    envMapIntensity: matConfig.envMapIntensity || 1,
    depthWrite: matConfig.depthWrite ?? false,
    side,
  };

  if (matConfig.attenuationColor !== undefined) {
    materialOptions.attenuationColor = matConfig.attenuationColor;
  }
  if (matConfig.attenuationDistance !== undefined) {
    materialOptions.attenuationDistance = matConfig.attenuationDistance;
  }

  const material = new THREE.MeshPhysicalMaterial(materialOptions);
  material.userData.tintScale = tintScale ?? 1;
  material.userData.role = role || "cap";
  return material;
}

function updateCrystalMaterial(material) {
  const config = getCrystalConfig();
  const tintScale = material.userData?.tintScale ?? 1;
  material.color.setHex(scaleColor(config.tint, tintScale));
  material.opacity = config.opacity;
  material.transmission = config.transmission;
  material.roughness = config.roughness;
  material.metalness = config.metalness;
  material.thickness = config.thickness;
  material.ior = config.ior;
  material.clearcoat = config.clearcoat;
  material.clearcoatRoughness = config.clearcoatRoughness;
  material.envMapIntensity = config.envMapIntensity;
  material.depthWrite = config.depthWrite ?? false;

  if (material.emissive) {
    material.emissive.set(config.emissive ?? 0x000000);
  }
  if (config.emissiveIntensity !== undefined) {
    material.emissiveIntensity = config.emissiveIntensity;
  }
  if (config.attenuationColor !== undefined) {
    material.attenuationColor = new THREE.Color(config.attenuationColor);
  }
  if (config.attenuationDistance !== undefined) {
    material.attenuationDistance = config.attenuationDistance;
  }

  material.needsUpdate = true;
}

function updateAllCrystalMaterials() {
  if (!currentModel) return;
  const crystalConfig = getCrystalConfig();
  const backScale = CONFIG.layers.backCrystalTintScale;
  currentModel.traverse((child) => {
    if (!child.isMesh) return;
    const materials = Array.isArray(child.material)
      ? child.material
      : [child.material];
    materials.forEach((mat) => {
      if (mat && mat.isMeshPhysicalMaterial) {
        if (mat.userData?.role === "side") {
          mat.userData.tintScale = crystalConfig.sideTintScale ?? 0.85;
        } else if (mat.userData?.role === "backCap") {
          mat.userData.tintScale = backScale;
        } else if (mat.userData?.role === "backSide") {
          mat.userData.tintScale = backScale * 0.9;
        }
        updateCrystalMaterial(mat);
      }
    });
  });
}

function updatePngMaterials() {
  if (!currentModel) return;
  currentModel.traverse((child) => {
    if (!child.isMesh) return;
    const materials = Array.isArray(child.material)
      ? child.material
      : [child.material];
    materials.forEach((mat) => {
      if (mat && mat.isMeshBasicMaterial && mat.map) {
        mat.alphaTest = CONFIG.model.alphaTest;
        mat.needsUpdate = true;
      }
    });
  });
}

function setupSettingsToggle(targetPanel) {
  if (document.getElementById("settings-toggle")) return;
  const button = document.createElement("button");
  button.id = "settings-toggle";
  button.type = "button";
  button.textContent = "Hide Settings";
  Object.assign(button.style, {
    position: "fixed",
    top: "16px",
    right: "16px",
    zIndex: "1000",
    padding: "6px 10px",
    borderRadius: "999px",
    border: "1px solid rgba(255,255,255,0.2)",
    background: "rgba(0,0,0,0.6)",
    color: "#e6f0ff",
    fontFamily: "Space Grotesk, Segoe UI, sans-serif",
    fontSize: "11px",
    letterSpacing: "1px",
    textTransform: "uppercase",
    cursor: "pointer",
  });

  const panel = targetPanel;
  const updateLabel = () => {
    const isHidden = panel.style.display === "none";
    button.textContent = isHidden ? "Show Settings" : "Hide Settings";
    button.style.right = isHidden ? "16px" : "16px";
  };

  button.addEventListener("click", () => {
    const isHidden = panel.style.display === "none";
    panel.style.display = isHidden ? "" : "none";
    updateLabel();
  });

  document.body.appendChild(button);
  updateLabel();
}

const SETTINGS_TEMPLATE = {
  renderer: {
    toneMappingExposure: true,
    physicallyCorrectLights: true,
  },
  environment: {
    enabled: true,
    background: true,
    backgroundColor: true,
    hdrPath: true,
  },
  postprocessing: {
    enabled: true,
    bloom: { enabled: true, strength: true, radius: true, threshold: true },
    film: {
      enabled: true,
      noiseIntensity: true,
      scanlinesIntensity: true,
      scanlinesCount: true,
      grayscale: true,
    },
    dotScreen: { enabled: true, angle: true, scale: true },
    outline: {
      enabled: true,
      edgeStrength: true,
      edgeGlow: true,
      edgeThickness: true,
      pulsePeriod: true,
      visibleColor: true,
      hiddenColor: true,
    },
    ssao: { enabled: true, kernelRadius: true, minDistance: true, maxDistance: true },
    sao: {
      enabled: true,
      saoIntensity: true,
      saoScale: true,
      saoKernelRadius: true,
      saoMinResolution: true,
      saoBlur: true,
      saoBlurRadius: true,
      saoBlurStdDev: true,
      saoBlurDepthCutoff: true,
    },
    sobel: { enabled: true, scale: true },
    lut: { enabled: true, intensity: true },
    vignette: { enabled: true, offset: true, darkness: true },
    rgbShift: { enabled: true, amount: true, angle: true },
    fxaa: { enabled: true },
  },
  lights: {
    enabled: true,
    ambient: { color: true, intensity: true },
    key: { color: true, intensity: true, position: [] },
    rim: { color: true, intensity: true, position: [] },
  },
  shadows: {
    enabled: true,
    mapSize: true,
    bias: true,
    radius: true,
  },
  materials: {
    useCrystal: true,
    crystal: {
      enabled: true,
      tint: true,
      opacity: true,
      transmission: true,
      roughness: true,
      thickness: true,
      ior: true,
      clearcoat: true,
      clearcoatRoughness: true,
      emissive: true,
      emissiveIntensity: true,
      metalness: true,
      envMapIntensity: true,
      attenuationColor: true,
      attenuationDistance: true,
      sideTintScale: true,
      depthWrite: true,
    },
  },
  layers: {
    pngOffset: true,
    pngGap: true,
    backCrystalEnabled: true,
    backCrystalOffset: true,
    backCrystalScale: true,
    backCrystalTintScale: true,
  },
  model: {
    extrusionDepth: true,
    bevelEnabled: true,
    bevelThickness: true,
    bevelSize: true,
    bevelSegments: true,
    alphaThreshold: true,
    maxContourPoints: true,
    targetSize: true,
    alphaTest: true,
    pngAdjust: {
      front: {
        saturation: true,
        vibrance: true,
        brightness: true,
        contrast: true,
      },
      back: {
        saturation: true,
        vibrance: true,
        brightness: true,
        contrast: true,
      },
    },
  },
};

function collectSettings(source, template) {
  const output = {};
  Object.keys(template).forEach((key) => {
    const tmpl = template[key];
    const value = source[key];
    if (Array.isArray(tmpl)) {
      output[key] = Array.isArray(value) ? value.slice() : [];
    } else if (tmpl && typeof tmpl === "object") {
      output[key] = collectSettings(value || {}, tmpl);
    } else {
      output[key] = value;
    }
  });
  return output;
}

function mergeSettings(target, source, template) {
  if (!source) return;
  Object.keys(template).forEach((key) => {
    const tmpl = template[key];
    const value = source[key];
    if (value === undefined) return;

    if (Array.isArray(tmpl)) {
      if (!Array.isArray(value)) return;
      target[key] = value.slice(0, 3).map((item) => Number(item));
    } else if (tmpl && typeof tmpl === "object") {
      if (!target[key] || typeof target[key] !== "object") {
        target[key] = {};
      }
      mergeSettings(target[key], value, tmpl);
    } else {
      target[key] = value;
    }
  });
}

function applySettings(settings) {
  mergeSettings(CONFIG, settings, SETTINGS_TEMPLATE);
  if (CONFIG.environment.enabled) loadEnvironment();
  applyRendererSettings();
  applyEnvironmentSettings();
  applyLightingSettings();
  updateAllCrystalMaterials();
  updatePngMaterials();
  loadModel(currentModelName);
}

function downloadSettings() {
  const payload = {
    version: 1,
    savedAt: new Date().toISOString(),
    settings: collectSettings(CONFIG, SETTINGS_TEMPLATE),
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "crystal-settings.json";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

let settingsFileInput;
function uploadSettings() {
  if (!settingsFileInput) {
    settingsFileInput = document.createElement("input");
    settingsFileInput.type = "file";
    settingsFileInput.accept = "application/json";
    settingsFileInput.style.display = "none";
    settingsFileInput.addEventListener("change", async (event) => {
      const file = event.target.files?.[0];
      if (!file) return;
      try {
        const text = await file.text();
        const data = JSON.parse(text);
        const settings = data.settings ?? data;
        applySettings(settings);
      } catch (error) {
        console.error("Failed to load settings:", error);
      } finally {
        settingsFileInput.value = "";
      }
    });
    document.body.appendChild(settingsFileInput);
  }
  settingsFileInput.click();
}

function buildFlatImageMesh(image) {
  const width = image.width || 1;
  const height = image.height || 1;
  const useTexture = CONFIG.model.useTexture;
  const texture = useTexture
    ? createTextureFromImage(image, CONFIG.model.pngAdjust.front)
    : null;
  const color = useTexture ? 0xffffff : CONFIG.model.basicColor;
  const useMatcap = CONFIG.materials.useMatcap;
  const crystalConfig = getCrystalConfig();
  const useCrystalMaterial =
    CONFIG.materials.useCrystal && crystalConfig.enabled && !useTexture && !useMatcap;
  const useBasic = CONFIG.model.useBasicMaterial && !useMatcap && !useCrystalMaterial;

  const geometry = new THREE.PlaneGeometry(width, height);
  geometry.center();

  const material = useTexture
    ? new THREE.MeshBasicMaterial({
        color,
        map: texture,
        transparent: true,
        alphaTest: CONFIG.model.alphaTest,
        side: THREE.DoubleSide,
      })
    : useCrystalMaterial
      ? createCrystalMaterial(1, THREE.DoubleSide, "cap")
      : useMatcap
        ? new THREE.MeshMatcapMaterial({
            color,
            matcap: getMatcapTexture(),
            side: THREE.DoubleSide,
          })
        : useBasic
          ? new THREE.MeshBasicMaterial({
              color,
              side: THREE.DoubleSide,
            })
          : new THREE.MeshPhongMaterial({
              color,
              side: THREE.DoubleSide,
              shininess: CONFIG.materials.cap.shininess,
              specular: CONFIG.materials.cap.specular,
            });

  const mesh = new THREE.Mesh(geometry, material);
  const scale = CONFIG.model.targetSize / Math.max(width, height);
  mesh.scale.set(scale, scale, scale);

  return mesh;
}

function createUVGenerator(width, height) {
  const minX = -width / 2;
  const minY = -height / 2;
  const rangeX = width || 1;
  const rangeY = height || 1;
  const depth = CONFIG.model.extrusionDepth || 1;

  const generateSide = (geometry, vertices, indexA, indexB, indexC, indexD) => {
    const az = vertices[indexA].z / depth;
    const bz = vertices[indexB].z / depth;
    const cz = vertices[indexC].z / depth;
    const dz = vertices[indexD].z / depth;

    return [
      new THREE.Vector2(0, az),
      new THREE.Vector2(1, bz),
      new THREE.Vector2(1, cz),
      new THREE.Vector2(0, dz),
    ];
  };

  return {
    generateTopUV: (geometry, vertices, indexA, indexB, indexC) => {
      const ax = (vertices[indexA].x - minX) / rangeX;
      const ay = (vertices[indexA].y - minY) / rangeY;
      const bx = (vertices[indexB].x - minX) / rangeX;
      const by = (vertices[indexB].y - minY) / rangeY;
      const cx = (vertices[indexC].x - minX) / rangeX;
      const cy = (vertices[indexC].y - minY) / rangeY;

      return [
        new THREE.Vector2(ax, ay),
        new THREE.Vector2(bx, by),
        new THREE.Vector2(cx, cy),
      ];
    },
    generateSideUV: generateSide,
    generateSideWallUV: generateSide,
  };
}

function buildExtrudedMeshFromImage(image) {
  if (CONFIG.model.testPlane) return buildFlatImageMesh(image);
  const maskData = buildMaskFromImage(image);
  if (!maskData.mask) {
    console.warn(
      "Mask read failed; showing flat PNG. Try a local server instead of file://",
    );
    return buildFlatImageMesh(image);
  }

  const { mask, width, height } = maskData;
  const contour = traceContour(mask, width, height);
  if (contour.length < 8) return buildFlatImageMesh(image);

  const reduced = decimateContour(contour);
  const centerX = width / 2;
  const centerY = height / 2;
  const points = reduced.map(
    ([x, y]) => new THREE.Vector2(x - centerX, height - y - centerY),
  );

  if (!THREE.ShapeUtils.isClockWise(points)) points.reverse();

  const geometry = new THREE.ExtrudeGeometry(new THREE.Shape(points), {
    depth: CONFIG.model.extrusionDepth,
    bevelEnabled: CONFIG.model.bevelEnabled,
    bevelThickness: CONFIG.model.bevelThickness,
    bevelSize: CONFIG.model.bevelSize,
    bevelSegments: CONFIG.model.bevelSegments,
    UVGenerator: createUVGenerator(width, height),
  });

  geometry.computeVertexNormals();
  geometry.center();

  const useTexture = CONFIG.model.useTexture;
  const useMatcap = CONFIG.materials.useMatcap;
  const crystalConfig = getCrystalConfig();
  const useCrystalMaterial =
    CONFIG.materials.useCrystal && crystalConfig.enabled && !useMatcap;
  const useOverlay = useTexture && useMatcap;
  const useBasic = CONFIG.model.useBasicMaterial && !useMatcap && !useCrystalMaterial;
  const texture = useTexture
    ? createTextureFromImage(image, CONFIG.model.pngAdjust.front)
    : null;
  const capColor = useTexture ? 0xffffff : CONFIG.model.basicColor;

  const capMaterial = useCrystalMaterial
    ? createCrystalMaterial(1, CONFIG.materials.cap.side, "cap")
    : useOverlay
      ? new THREE.MeshMatcapMaterial({
          color: CONFIG.model.basicColor,
          matcap: getMatcapTexture(),
          side: CONFIG.materials.cap.side,
        })
      : useTexture
        ? new THREE.MeshBasicMaterial({
            color: capColor,
            map: texture,
            transparent: true,
            alphaTest: CONFIG.model.alphaTest,
            side: CONFIG.materials.cap.side,
          })
        : useMatcap
          ? new THREE.MeshMatcapMaterial({
              color: capColor,
              matcap: getMatcapTexture(),
              side: CONFIG.materials.cap.side,
            })
          : useBasic
            ? new THREE.MeshBasicMaterial({
                color: capColor,
                side: CONFIG.materials.cap.side,
              })
            : new THREE.MeshPhongMaterial({
                color: capColor,
                side: CONFIG.materials.cap.side,
                shininess: CONFIG.materials.cap.shininess,
                specular: CONFIG.materials.cap.specular,
              });

  const sideMaterial = useCrystalMaterial
    ? createCrystalMaterial(
        crystalConfig.sideTintScale ?? 0.85,
        THREE.FrontSide,
        "side",
      )
    : useMatcap
      ? new THREE.MeshMatcapMaterial({
          color: CONFIG.model.basicColor,
          matcap: getMatcapTexture(),
        })
      : useBasic
        ? new THREE.MeshBasicMaterial({
            color: CONFIG.model.basicColor,
          })
        : new THREE.MeshPhongMaterial({
            color: CONFIG.materials.side.color,
            shininess: CONFIG.materials.side.shininess,
            specular: CONFIG.materials.side.specular,
          });

  const mesh = new THREE.Mesh(geometry, [capMaterial, sideMaterial]);
  mesh.castShadow = CONFIG.shadows.enabled && CONFIG.lights.enabled;
  mesh.receiveShadow = CONFIG.shadows.enabled && CONFIG.lights.enabled;

  if (useCrystalMaterial && useTexture) {
    const backingGeo = new THREE.PlaneGeometry(width, height);
    backingGeo.center();
    const backGeo = backingGeo.clone();
    const backUv = backGeo.attributes.uv;
    for (let i = 0; i < backUv.count; i++) {
      backUv.setX(i, 1 - backUv.getX(i));
    }
    backUv.needsUpdate = true;
    const frontTexture = createTextureFromImage(
      image,
      CONFIG.model.pngAdjust.front,
    );
    const backTexture = createTextureFromImage(
      image,
      CONFIG.model.pngAdjust.back,
    );
    const backingFrontMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      map: frontTexture,
      transparent: false,
      alphaTest: CONFIG.model.alphaTest,
      side: THREE.FrontSide,
      depthWrite: true,
    });
    const backingBackMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      map: backTexture,
      transparent: false,
      alphaTest: CONFIG.model.alphaTest,
      side: THREE.FrontSide,
      depthWrite: true,
    });
    backingFrontMat.alphaToCoverage = renderer.capabilities.isWebGL2;
    backingBackMat.alphaToCoverage = renderer.capabilities.isWebGL2;
    const backingFront = new THREE.Mesh(backingGeo, backingFrontMat);
    const backingBack = new THREE.Mesh(backGeo, backingBackMat);
    const backingZ = -CONFIG.model.extrusionDepth / 2 - CONFIG.layers.pngOffset;
    backingFront.position.z = backingZ;
    backingBack.position.z = backingZ - CONFIG.layers.pngGap;
    backingBack.rotation.y = Math.PI;
    backingFront.castShadow = false;
    backingFront.receiveShadow = false;
    backingBack.castShadow = false;
    backingBack.receiveShadow = false;
    backingFront.renderOrder = 0;
    backingBack.renderOrder = 0;
    mesh.renderOrder = 2;

    const group = new THREE.Group();
    if (CONFIG.layers.backCrystalEnabled) {
      const backGeometry = geometry.clone();
      const backCapMat = createCrystalMaterial(
        CONFIG.layers.backCrystalTintScale,
        CONFIG.materials.cap.side,
        "backCap",
      );
      const backSideMat = createCrystalMaterial(
        CONFIG.layers.backCrystalTintScale * 0.9,
        THREE.FrontSide,
        "backSide",
      );
      const crystalBack = new THREE.Mesh(backGeometry, [
        backCapMat,
        backSideMat,
      ]);
      crystalBack.position.z = -CONFIG.layers.backCrystalOffset;
      crystalBack.scale.set(
        CONFIG.layers.backCrystalScale,
        CONFIG.layers.backCrystalScale,
        1,
      );
      crystalBack.castShadow = false;
      crystalBack.receiveShadow = false;
      crystalBack.renderOrder = 0;
      group.add(crystalBack);
    }
    group.add(backingFront);
    group.add(backingBack);
    group.add(mesh);

    const scale = CONFIG.model.targetSize / Math.max(width, height);
    group.scale.set(scale, scale, scale);
    return group;
  }

  const scale = CONFIG.model.targetSize / Math.max(width, height);
  mesh.scale.set(scale, scale, scale);

  return mesh;
}

function replaceModel(mesh) {
  if (currentModel) {
    scene.remove(currentModel);
    disposeObject(currentModel);
  }
  currentModel = mesh;
  currentModel.traverse?.((child) => {
    if (child.isMesh) {
      child.castShadow = CONFIG.shadows.enabled && CONFIG.lights.enabled;
      child.receiveShadow = CONFIG.shadows.enabled && CONFIG.lights.enabled;
    }
  });
  scene.add(currentModel);
  updateOutlineSelection();
  frameObject(currentModel);
}

function disposeObject(object) {
  object.traverse((child) => {
    if (child.isMesh) {
      if (child.geometry) child.geometry.dispose();
      if (Array.isArray(child.material)) {
        child.material.forEach((mat) => {
          if (mat.map) mat.map.dispose();
          if (mat.matcap && mat.matcap !== cachedMatcap) mat.matcap.dispose();
          mat.dispose();
        });
      } else if (child.material) {
        if (child.material.map) child.material.map.dispose();
        if (child.material.matcap && child.material.matcap !== cachedMatcap) {
          child.material.matcap.dispose();
        }
        child.material.dispose();
      }
    }
  });
}

function frameObject(object) {
  const box = new THREE.Box3().setFromObject(object);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  const maxDim = Math.max(size.x, size.y, size.z);
  const distance = maxDim * CONFIG.framing.distanceMultiplier;

  camera.position.set(center.x, center.y, center.z + distance);
  camera.near = Math.max(0.1, distance / CONFIG.framing.nearDivisor);
  camera.far = distance * CONFIG.framing.farMultiplier;
  camera.updateProjectionMatrix();

  controls.target.copy(center);
  controls.update();

  object.rotation.set(
    CONFIG.controls.defaultRotation.x,
    CONFIG.controls.defaultRotation.y,
    CONFIG.controls.defaultRotation.z,
  );
}

async function loadModel(modelName) {
  currentModelName = modelName;
  const loadId = ++currentLoadId;
  const texturePath =
    MODEL_TEXTURES[modelName] || `assets/loc.${modelName}.png`;

  try {
    const image = await loadImage(texturePath);
    if (loadId !== currentLoadId) return;
    const mesh = buildExtrudedMeshFromImage(image);
    if (loadId !== currentLoadId) return;
    replaceModel(mesh);
  } catch (error) {
    console.error(`Failed to load model: ${modelName}`, error);
  }
}

function setupGui() {
  const GUIClass = window.lil?.GUI || window.GUI;
  if (!GUIClass) {
    console.warn("GUI library not found. Falling back to basic HTML controls.");
    setupFallbackGui();
    return;
  }

  const gui = new GUIClass({
    title: "Crystal Controls",
    width: 320,
    autoPlace: false,
  });
  document.body.appendChild(gui.domElement);
  gui.domElement.style.position = "fixed";
  gui.domElement.style.top = "16px";
  gui.domElement.style.right = "16px";
  gui.domElement.style.zIndex = "999";
  setupSettingsToggle(gui.domElement);

  const rendererFolder = gui.addFolder("Renderer");
  rendererFolder
    .add(CONFIG.renderer, "toneMappingExposure", 0.5, 3, 0.01)
    .onChange(applyRendererSettings);
  rendererFolder
    .add(CONFIG.renderer, "physicallyCorrectLights")
    .onChange(applyRendererSettings);

  const environmentFolder = gui.addFolder("Environment");
  const hdrOptions = {};
  HDR_OPTIONS.forEach((path) => {
    const name = path.replace("assets/", "").replace(".hdr", "");
    hdrOptions[name] = path;
  });
  environmentFolder
    .add(CONFIG.environment, "hdrPath", hdrOptions)
    .name("HDR")
    .onChange(() => {
      if (CONFIG.environment.enabled) loadEnvironment();
    });
  environmentFolder.add(CONFIG.environment, "enabled").onChange(() => {
    if (CONFIG.environment.enabled && !environmentMap) {
      loadEnvironment();
    }
    applyEnvironmentSettings();
    updateAllCrystalMaterials();
  });
  environmentFolder.add(CONFIG.environment, "background").onChange(() => {
    applyEnvironmentSettings();
  });
  environmentFolder
    .addColor(CONFIG.environment, "backgroundColor")
    .onChange(() => {
      applyEnvironmentSettings();
    });
  const environmentActions = {
    reloadHDR: () => {
      if (environmentMap) {
        environmentMap.dispose();
        environmentMap = null;
      }
      loadEnvironment();
    },
  };
  environmentFolder.add(environmentActions, "reloadHDR");

  const settingsFolder = gui.addFolder("Settings");
  settingsFolder.add({ download: downloadSettings }, "download");
  settingsFolder.add({ upload: uploadSettings }, "upload");

  const lightsFolder = gui.addFolder("Lights");
  lightsFolder.add(CONFIG.lights, "enabled").onChange(applyLightingSettings);

  const ambientFolder = lightsFolder.addFolder("Ambient");
  ambientFolder.addColor(CONFIG.lights.ambient, "color").onChange(() => {
    applyLightingSettings();
  });
  ambientFolder
    .add(CONFIG.lights.ambient, "intensity", 0, 5, 0.01)
    .onChange(applyLightingSettings);

  const keyFolder = lightsFolder.addFolder("Key");
  const keyPosition = {
    x: CONFIG.lights.key.position[0],
    y: CONFIG.lights.key.position[1],
    z: CONFIG.lights.key.position[2],
  };
  keyFolder.addColor(CONFIG.lights.key, "color").onChange(applyLightingSettings);
  keyFolder
    .add(CONFIG.lights.key, "intensity", 0, 10, 0.01)
    .onChange(applyLightingSettings);
  keyFolder.add(keyPosition, "x", -5, 5, 0.01).onChange((value) => {
    CONFIG.lights.key.position[0] = value;
    applyLightingSettings();
  });
  keyFolder.add(keyPosition, "y", -5, 5, 0.01).onChange((value) => {
    CONFIG.lights.key.position[1] = value;
    applyLightingSettings();
  });
  keyFolder.add(keyPosition, "z", -5, 5, 0.01).onChange((value) => {
    CONFIG.lights.key.position[2] = value;
    applyLightingSettings();
  });

  const rimFolder = lightsFolder.addFolder("Rim");
  const rimPosition = {
    x: CONFIG.lights.rim.position[0],
    y: CONFIG.lights.rim.position[1],
    z: CONFIG.lights.rim.position[2],
  };
  rimFolder.addColor(CONFIG.lights.rim, "color").onChange(applyLightingSettings);
  rimFolder
    .add(CONFIG.lights.rim, "intensity", 0, 10, 0.01)
    .onChange(applyLightingSettings);
  rimFolder.add(rimPosition, "x", -5, 5, 0.01).onChange((value) => {
    CONFIG.lights.rim.position[0] = value;
    applyLightingSettings();
  });
  rimFolder.add(rimPosition, "y", -5, 5, 0.01).onChange((value) => {
    CONFIG.lights.rim.position[1] = value;
    applyLightingSettings();
  });
  rimFolder.add(rimPosition, "z", -5, 5, 0.01).onChange((value) => {
    CONFIG.lights.rim.position[2] = value;
    applyLightingSettings();
  });

  const shadowFolder = gui.addFolder("Shadows");
  shadowFolder.add(CONFIG.shadows, "enabled").onChange(applyLightingSettings);
  shadowFolder
    .add(CONFIG.shadows, "mapSize", 256, 4096, 256)
    .onChange(applyLightingSettings);
  shadowFolder
    .add(CONFIG.shadows, "bias", -0.01, 0.01, 0.00001)
    .onChange(applyLightingSettings);
  shadowFolder
    .add(CONFIG.shadows, "radius", 0, 10, 0.1)
    .onChange(applyLightingSettings);


  const materialFolder = gui.addFolder("Crystal Material");
  materialFolder.addColor(CONFIG.materials.crystal, "tint").onChange(() => {
    updateAllCrystalMaterials();
  });
  materialFolder
    .add(CONFIG.materials.crystal, "opacity", 0, 1, 0.01)
    .onChange(updateAllCrystalMaterials);
  materialFolder
    .add(CONFIG.materials.crystal, "transmission", 0, 1, 0.01)
    .onChange(updateAllCrystalMaterials);
  materialFolder
    .add(CONFIG.materials.crystal, "roughness", 0, 1, 0.01)
    .onChange(updateAllCrystalMaterials);
  materialFolder
    .add(CONFIG.materials.crystal, "thickness", 0, 100, 0.1)
    .onChange(updateAllCrystalMaterials);
  materialFolder
    .add(CONFIG.materials.crystal, "ior", 1, 2.6, 0.01)
    .onChange(updateAllCrystalMaterials);
  materialFolder
    .add(CONFIG.materials.crystal, "clearcoat", 0, 1, 0.01)
    .onChange(updateAllCrystalMaterials);
  materialFolder
    .add(CONFIG.materials.crystal, "clearcoatRoughness", 0, 1, 0.01)
    .onChange(updateAllCrystalMaterials);
  materialFolder
    .add(CONFIG.materials.crystal, "envMapIntensity", 0, 5, 0.01)
    .onChange(updateAllCrystalMaterials);
  materialFolder
    .addColor(CONFIG.materials.crystal, "attenuationColor")
    .onChange(updateAllCrystalMaterials);
  materialFolder
    .add(CONFIG.materials.crystal, "attenuationDistance", 1, 200, 1)
    .onChange(updateAllCrystalMaterials);
  materialFolder
    .addColor(CONFIG.materials.crystal, "emissive")
    .onChange(updateAllCrystalMaterials);
  materialFolder
    .add(CONFIG.materials.crystal, "emissiveIntensity", 0, 50, 0.1)
    .onChange(updateAllCrystalMaterials);
  materialFolder
    .add(CONFIG.materials.crystal, "metalness", 0, 1, 0.01)
    .onChange(updateAllCrystalMaterials);
  materialFolder
    .add(CONFIG.materials.crystal, "sideTintScale", 0, 2, 0.01)
    .onChange(updateAllCrystalMaterials);
  materialFolder
    .add(CONFIG.materials.crystal, "depthWrite")
    .onChange(updateAllCrystalMaterials);


  const bevelFolder = gui.addFolder("Bevel & Geometry");
  bevelFolder.add(CONFIG.model, "extrusionDepth", 1, 200, 1).onChange(() => {
    loadModel(currentModelName);
  });
  bevelFolder.add(CONFIG.model, "bevelEnabled").onChange(() => {
    loadModel(currentModelName);
  });
  bevelFolder.add(CONFIG.model, "bevelThickness", 0, 100, 0.1).onChange(() => {
    loadModel(currentModelName);
  });
  bevelFolder.add(CONFIG.model, "bevelSize", 0, 100, 0.1).onChange(() => {
    loadModel(currentModelName);
  });
  bevelFolder.add(CONFIG.model, "bevelSegments", 1, 50, 1).onChange(() => {
    loadModel(currentModelName);
  });
  bevelFolder.add(CONFIG.model, "maxContourPoints", 50, 3000, 10).onChange(() => {
    loadModel(currentModelName);
  });
  bevelFolder.add(CONFIG.model, "alphaThreshold", 0, 255, 1).onChange(() => {
    loadModel(currentModelName);
  });
  bevelFolder.add(CONFIG.model, "targetSize", 50, 600, 1).onChange(() => {
    loadModel(currentModelName);
  });

  const layerFolder = gui.addFolder("PNG Layers");
  layerFolder
    .add(CONFIG.model, "alphaTest", 0, 1, 0.01)
    .onChange(updatePngMaterials);
  layerFolder
    .add(CONFIG.layers, "pngOffset", 0, 5, 0.01)
    .onChange(() => loadModel(currentModelName));
  layerFolder
    .add(CONFIG.layers, "pngGap", 0, 2, 0.01)
    .onChange(() => loadModel(currentModelName));
  layerFolder.add(CONFIG.layers, "backCrystalEnabled").onChange(() => {
    loadModel(currentModelName);
  });
  layerFolder
    .add(CONFIG.layers, "backCrystalOffset", 0, 5, 0.01)
    .onChange(() => loadModel(currentModelName));
  layerFolder
    .add(CONFIG.layers, "backCrystalScale", 0.5, 2, 0.01)
    .onChange(() => loadModel(currentModelName));
  layerFolder
    .add(CONFIG.layers, "backCrystalTintScale", 0, 1, 0.01)
    .onChange(updateAllCrystalMaterials);

  const pngAdjustFolder = gui.addFolder("PNG Adjust");
  const pngFrontFolder = pngAdjustFolder.addFolder("Front");
  pngFrontFolder
    .add(CONFIG.model.pngAdjust.front, "saturation", 0, 2, 0.01)
    .onChange(() => loadModel(currentModelName));
  pngFrontFolder
    .add(CONFIG.model.pngAdjust.front, "vibrance", -1, 1, 0.01)
    .onChange(() => loadModel(currentModelName));
  pngFrontFolder
    .add(CONFIG.model.pngAdjust.front, "brightness", -1, 1, 0.01)
    .onChange(() => loadModel(currentModelName));
  pngFrontFolder
    .add(CONFIG.model.pngAdjust.front, "contrast", 0, 2, 0.01)
    .onChange(() => loadModel(currentModelName));

  const pngBackFolder = pngAdjustFolder.addFolder("Back");
  pngBackFolder
    .add(CONFIG.model.pngAdjust.back, "saturation", 0, 2, 0.01)
    .onChange(() => loadModel(currentModelName));
  pngBackFolder
    .add(CONFIG.model.pngAdjust.back, "vibrance", -1, 1, 0.01)
    .onChange(() => loadModel(currentModelName));
  pngBackFolder
    .add(CONFIG.model.pngAdjust.back, "brightness", -1, 1, 0.01)
    .onChange(() => loadModel(currentModelName));
  pngBackFolder
    .add(CONFIG.model.pngAdjust.back, "contrast", 0, 2, 0.01)
    .onChange(() => loadModel(currentModelName));

  const postFolder = gui.addFolder("Post FX");
  postFolder.add(CONFIG.postprocessing, "enabled").onChange(() => {
    applyPostProcessingSettings();
  });
  const bloomFolder = postFolder.addFolder("Bloom");
  bloomFolder.add(CONFIG.postprocessing.bloom, "enabled").onChange(applyPostProcessingSettings);
  bloomFolder
    .add(CONFIG.postprocessing.bloom, "strength", 0, 3, 0.01)
    .onChange(applyPostProcessingSettings);
  bloomFolder
    .add(CONFIG.postprocessing.bloom, "radius", 0, 2, 0.01)
    .onChange(applyPostProcessingSettings);
  bloomFolder
    .add(CONFIG.postprocessing.bloom, "threshold", 0, 1, 0.01)
    .onChange(applyPostProcessingSettings);

  const vignetteFolder = postFolder.addFolder("Vignette");
  vignetteFolder.add(CONFIG.postprocessing.vignette, "enabled").onChange(applyPostProcessingSettings);
  vignetteFolder
    .add(CONFIG.postprocessing.vignette, "offset", 0, 2, 0.01)
    .onChange(applyPostProcessingSettings);
  vignetteFolder
    .add(CONFIG.postprocessing.vignette, "darkness", 0, 2, 0.01)
    .onChange(applyPostProcessingSettings);

  const filmFolder = postFolder.addFolder("Film");
  filmFolder.add(CONFIG.postprocessing.film, "enabled").onChange(applyPostProcessingSettings);
  filmFolder
    .add(CONFIG.postprocessing.film, "noiseIntensity", 0, 1, 0.01)
    .onChange(applyPostProcessingSettings);
  filmFolder
    .add(CONFIG.postprocessing.film, "scanlinesIntensity", 0, 1, 0.01)
    .onChange(applyPostProcessingSettings);
  filmFolder
    .add(CONFIG.postprocessing.film, "scanlinesCount", 0, 2048, 1)
    .onChange(applyPostProcessingSettings);
  filmFolder
    .add(CONFIG.postprocessing.film, "grayscale")
    .onChange(applyPostProcessingSettings);

  const dotFolder = postFolder.addFolder("Dot Screen");
  dotFolder.add(CONFIG.postprocessing.dotScreen, "enabled").onChange(applyPostProcessingSettings);
  dotFolder
    .add(CONFIG.postprocessing.dotScreen, "angle", 0, Math.PI * 2, 0.01)
    .onChange(applyPostProcessingSettings);
  dotFolder
    .add(CONFIG.postprocessing.dotScreen, "scale", 0.1, 5, 0.01)
    .onChange(applyPostProcessingSettings);

  const outlineFolder = postFolder.addFolder("Outline");
  outlineFolder.add(CONFIG.postprocessing.outline, "enabled").onChange(applyPostProcessingSettings);
  outlineFolder
    .add(CONFIG.postprocessing.outline, "edgeStrength", 0, 10, 0.01)
    .onChange(applyPostProcessingSettings);
  outlineFolder
    .add(CONFIG.postprocessing.outline, "edgeGlow", 0, 5, 0.01)
    .onChange(applyPostProcessingSettings);
  outlineFolder
    .add(CONFIG.postprocessing.outline, "edgeThickness", 0, 5, 0.01)
    .onChange(applyPostProcessingSettings);
  outlineFolder
    .add(CONFIG.postprocessing.outline, "pulsePeriod", 0, 5, 0.01)
    .onChange(applyPostProcessingSettings);
  outlineFolder
    .addColor(CONFIG.postprocessing.outline, "visibleColor")
    .onChange(applyPostProcessingSettings);
  outlineFolder
    .addColor(CONFIG.postprocessing.outline, "hiddenColor")
    .onChange(applyPostProcessingSettings);

  const ssaoFolder = postFolder.addFolder("SSAO");
  ssaoFolder.add(CONFIG.postprocessing.ssao, "enabled").onChange(applyPostProcessingSettings);
  ssaoFolder
    .add(CONFIG.postprocessing.ssao, "kernelRadius", 0, 32, 1)
    .onChange(applyPostProcessingSettings);
  ssaoFolder
    .add(CONFIG.postprocessing.ssao, "minDistance", 0, 0.1, 0.001)
    .onChange(applyPostProcessingSettings);
  ssaoFolder
    .add(CONFIG.postprocessing.ssao, "maxDistance", 0, 1, 0.01)
    .onChange(applyPostProcessingSettings);

  const saoFolder = postFolder.addFolder("SAO");
  saoFolder.add(CONFIG.postprocessing.sao, "enabled").onChange(applyPostProcessingSettings);
  saoFolder
    .add(CONFIG.postprocessing.sao, "saoIntensity", 0, 1, 0.01)
    .onChange(applyPostProcessingSettings);
  saoFolder
    .add(CONFIG.postprocessing.sao, "saoScale", 1, 500, 1)
    .onChange(applyPostProcessingSettings);
  saoFolder
    .add(CONFIG.postprocessing.sao, "saoKernelRadius", 0, 100, 1)
    .onChange(applyPostProcessingSettings);
  saoFolder
    .add(CONFIG.postprocessing.sao, "saoMinResolution", 0, 1, 0.01)
    .onChange(applyPostProcessingSettings);
  saoFolder
    .add(CONFIG.postprocessing.sao, "saoBlur")
    .onChange(applyPostProcessingSettings);
  saoFolder
    .add(CONFIG.postprocessing.sao, "saoBlurRadius", 0, 32, 1)
    .onChange(applyPostProcessingSettings);
  saoFolder
    .add(CONFIG.postprocessing.sao, "saoBlurStdDev", 0, 20, 0.1)
    .onChange(applyPostProcessingSettings);
  saoFolder
    .add(CONFIG.postprocessing.sao, "saoBlurDepthCutoff", 0, 1, 0.001)
    .onChange(applyPostProcessingSettings);

  const sobelFolder = postFolder.addFolder("Sobel");
  sobelFolder.add(CONFIG.postprocessing.sobel, "enabled").onChange(applyPostProcessingSettings);
  sobelFolder
    .add(CONFIG.postprocessing.sobel, "scale", 0, 5, 0.01)
    .onChange(applyPostProcessingSettings);

  const lutFolder = postFolder.addFolder("LUT");
  lutFolder.add(CONFIG.postprocessing.lut, "enabled").onChange(() => {
    console.warn("LUT enabled but no LUT texture is loaded.");
    applyPostProcessingSettings();
  });
  lutFolder
    .add(CONFIG.postprocessing.lut, "intensity", 0, 1, 0.01)
    .onChange(applyPostProcessingSettings);

  const rgbFolder = postFolder.addFolder("RGB Shift");
  rgbFolder.add(CONFIG.postprocessing.rgbShift, "enabled").onChange(applyPostProcessingSettings);
  rgbFolder
    .add(CONFIG.postprocessing.rgbShift, "amount", 0, 0.02, 0.0001)
    .onChange(applyPostProcessingSettings);
  rgbFolder
    .add(CONFIG.postprocessing.rgbShift, "angle", -Math.PI, Math.PI, 0.01)
    .onChange(applyPostProcessingSettings);

  const fxaaFolder = postFolder.addFolder("FXAA");
  fxaaFolder.add(CONFIG.postprocessing.fxaa, "enabled").onChange(applyPostProcessingSettings);
}

function setupFallbackGui() {
  const panel = document.createElement("div");
  panel.id = "fallback-gui";
  Object.assign(panel.style, {
    position: "fixed",
    top: "16px",
    right: "16px",
    width: "320px",
    maxHeight: "90vh",
    overflow: "auto",
    padding: "14px 14px 18px",
    background: "rgba(0,0,0,0.7)",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: "12px",
    color: "#e6f0ff",
    fontFamily: "Space Grotesk, Segoe UI, sans-serif",
    fontSize: "12px",
    letterSpacing: "0.2px",
    zIndex: "999",
  });

  const title = document.createElement("div");
  title.textContent = "Crystal Controls";
  title.style.fontWeight = "600";
  title.style.marginBottom = "10px";
  panel.appendChild(title);
  setupSettingsToggle(panel);

  const addSection = (label) => {
    const section = document.createElement("div");
    section.style.margin = "10px 0 6px";
    section.style.fontSize = "11px";
    section.style.textTransform = "uppercase";
    section.style.letterSpacing = "1px";
    section.style.color = "#8bbfff";
    section.textContent = label;
    panel.appendChild(section);
  };

  const addRow = (label, input) => {
    const row = document.createElement("div");
    row.style.display = "flex";
    row.style.alignItems = "center";
    row.style.justifyContent = "space-between";
    row.style.gap = "8px";
    row.style.margin = "6px 0";
    const text = document.createElement("div");
    text.textContent = label;
    text.style.flex = "1";
    row.appendChild(text);
    row.appendChild(input);
    panel.appendChild(row);
  };

  const addCheckbox = (label, obj, key, onChange) => {
    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = Boolean(obj[key]);
    input.addEventListener("change", () => {
      obj[key] = input.checked;
      onChange?.(input.checked);
    });
    addRow(label, input);
  };

  const addColor = (label, obj, key, onChange) => {
    const input = document.createElement("input");
    input.type = "color";
    input.value = hexToCss(obj[key]);
    input.addEventListener("input", () => {
      obj[key] = parseInt(input.value.slice(1), 16);
      onChange?.(obj[key]);
    });
    addRow(label, input);
  };

  const addRange = (label, obj, key, min, max, step, onChange) => {
    const wrapper = document.createElement("div");
    wrapper.style.display = "flex";
    wrapper.style.alignItems = "center";
    wrapper.style.gap = "6px";
    const range = document.createElement("input");
    range.type = "range";
    range.min = min;
    range.max = max;
    range.step = step;
    range.value = obj[key];
    range.style.flex = "1";
    const number = document.createElement("input");
    number.type = "number";
    number.min = min;
    number.max = max;
    number.step = step;
    number.value = obj[key];
    number.style.width = "64px";
    const update = (value) => {
      obj[key] = parseFloat(value);
      range.value = obj[key];
      number.value = obj[key];
      onChange?.(obj[key]);
    };
    range.addEventListener("input", () => update(range.value));
    number.addEventListener("change", () => update(number.value));
    wrapper.appendChild(range);
    wrapper.appendChild(number);
    addRow(label, wrapper);
  };

  const addSelect = (label, options, value, onChange) => {
    const select = document.createElement("select");
    select.style.width = "100%";
    Object.entries(options).forEach(([name, optionValue]) => {
      const option = document.createElement("option");
      option.value = optionValue;
      option.textContent = name;
      if (String(optionValue) === String(value)) option.selected = true;
      select.appendChild(option);
    });
    select.addEventListener("change", () => {
      onChange?.(select.value);
    });
    addRow(label, select);
  };

  const addVector3 = (label, arrayRef, min, max, step, onChange) => {
    addSection(label);
    ["x", "y", "z"].forEach((axis, index) => {
      addRange(
        axis.toUpperCase(),
        { value: arrayRef[index] },
        "value",
        min,
        max,
        step,
        (value) => {
          arrayRef[index] = value;
          onChange?.(arrayRef);
        },
      );
    });
  };

  const addButton = (label, onClick) => {
    const button = document.createElement("button");
    button.textContent = label;
    Object.assign(button.style, {
      width: "100%",
      padding: "6px 8px",
      background: "rgba(94, 208, 255, 0.15)",
      border: "1px solid rgba(94, 208, 255, 0.4)",
      color: "#5ed0ff",
      borderRadius: "6px",
      cursor: "pointer",
      marginTop: "6px",
    });
    button.addEventListener("click", onClick);
    panel.appendChild(button);
  };

  addSection("Renderer");
  addRange("Exposure", CONFIG.renderer, "toneMappingExposure", 0.5, 3, 0.01, () =>
    applyRendererSettings(),
  );
  addCheckbox("Physically Correct", CONFIG.renderer, "physicallyCorrectLights", () =>
    applyRendererSettings(),
  );

  addSection("Environment");
  const hdrOptions = {};
  HDR_OPTIONS.forEach((path) => {
    const name = path.replace("assets/", "").replace(".hdr", "");
    hdrOptions[name] = path;
  });
  addSelect("HDR", hdrOptions, CONFIG.environment.hdrPath, (value) => {
    CONFIG.environment.hdrPath = value;
    if (CONFIG.environment.enabled) loadEnvironment();
  });
  addCheckbox("Enable HDR", CONFIG.environment, "enabled", () => {
    if (CONFIG.environment.enabled && !environmentMap) loadEnvironment();
    applyEnvironmentSettings();
    updateAllCrystalMaterials();
  });
  addCheckbox("Use HDR Background", CONFIG.environment, "background", () =>
    applyEnvironmentSettings(),
  );
  addColor("Background Color", CONFIG.environment, "backgroundColor", () =>
    applyEnvironmentSettings(),
  );
  addButton("Reload HDR", () => {
    if (environmentMap) {
      environmentMap.dispose();
      environmentMap = null;
    }
    loadEnvironment();
  });

  addSection("Settings");
  addButton("Download Settings", downloadSettings);
  addButton("Upload Settings", uploadSettings);

  addSection("Lights");
  addCheckbox("Lights Enabled", CONFIG.lights, "enabled", () =>
    applyLightingSettings(),
  );
  addColor("Ambient Color", CONFIG.lights.ambient, "color", () =>
    applyLightingSettings(),
  );
  addRange("Ambient Intensity", CONFIG.lights.ambient, "intensity", 0, 5, 0.01, () =>
    applyLightingSettings(),
  );
  addColor("Key Color", CONFIG.lights.key, "color", () => applyLightingSettings());
  addRange("Key Intensity", CONFIG.lights.key, "intensity", 0, 10, 0.01, () =>
    applyLightingSettings(),
  );
  addVector3("Key Position", CONFIG.lights.key.position, -5, 5, 0.01, () =>
    applyLightingSettings(),
  );
  addColor("Rim Color", CONFIG.lights.rim, "color", () => applyLightingSettings());
  addRange("Rim Intensity", CONFIG.lights.rim, "intensity", 0, 10, 0.01, () =>
    applyLightingSettings(),
  );
  addVector3("Rim Position", CONFIG.lights.rim.position, -5, 5, 0.01, () =>
    applyLightingSettings(),
  );

  addSection("Shadows");
  addCheckbox("Shadows Enabled", CONFIG.shadows, "enabled", () =>
    applyLightingSettings(),
  );
  addRange("Shadow Map", CONFIG.shadows, "mapSize", 256, 4096, 256, () =>
    applyLightingSettings(),
  );
  addRange("Shadow Bias", CONFIG.shadows, "bias", -0.01, 0.01, 0.00001, () =>
    applyLightingSettings(),
  );
  addRange("Shadow Radius", CONFIG.shadows, "radius", 0, 10, 0.1, () =>
    applyLightingSettings(),
  );

  addSection("Crystal");
  addColor("Tint", CONFIG.materials.crystal, "tint", updateAllCrystalMaterials);
  addRange("Opacity", CONFIG.materials.crystal, "opacity", 0, 1, 0.01, updateAllCrystalMaterials);
  addRange("Transmission", CONFIG.materials.crystal, "transmission", 0, 1, 0.01, updateAllCrystalMaterials);
  addRange("Roughness", CONFIG.materials.crystal, "roughness", 0, 1, 0.01, updateAllCrystalMaterials);
  addRange("Thickness", CONFIG.materials.crystal, "thickness", 0, 100, 0.1, updateAllCrystalMaterials);
  addRange("IOR", CONFIG.materials.crystal, "ior", 1, 2.6, 0.01, updateAllCrystalMaterials);
  addRange("Clearcoat", CONFIG.materials.crystal, "clearcoat", 0, 1, 0.01, updateAllCrystalMaterials);
  addRange(
    "Clearcoat Rough",
    CONFIG.materials.crystal,
    "clearcoatRoughness",
    0,
    1,
    0.01,
    updateAllCrystalMaterials,
  );
  addRange("Env Intensity", CONFIG.materials.crystal, "envMapIntensity", 0, 5, 0.01, updateAllCrystalMaterials);
  addColor("Attenuation Color", CONFIG.materials.crystal, "attenuationColor", updateAllCrystalMaterials);
  addRange(
    "Attenuation Dist",
    CONFIG.materials.crystal,
    "attenuationDistance",
    1,
    200,
    1,
    updateAllCrystalMaterials,
  );
  addColor("Emissive", CONFIG.materials.crystal, "emissive", updateAllCrystalMaterials);
  addRange(
    "Emissive Int",
    CONFIG.materials.crystal,
    "emissiveIntensity",
    0,
    50,
    0.1,
    updateAllCrystalMaterials,
  );
  addRange("Metalness", CONFIG.materials.crystal, "metalness", 0, 1, 0.01, updateAllCrystalMaterials);
  addRange("Side Tint", CONFIG.materials.crystal, "sideTintScale", 0, 2, 0.01, updateAllCrystalMaterials);
  addCheckbox("Depth Write", CONFIG.materials.crystal, "depthWrite", updateAllCrystalMaterials);

  addSection("Bevel & Geometry");
  addRange(
    "Extrusion Depth",
    CONFIG.model,
    "extrusionDepth",
    1,
    200,
    1,
    () => loadModel(currentModelName),
  );
  addCheckbox("Bevel Enabled", CONFIG.model, "bevelEnabled", () =>
    loadModel(currentModelName),
  );
  addRange(
    "Bevel Thickness",
    CONFIG.model,
    "bevelThickness",
    0,
    100,
    0.1,
    () => loadModel(currentModelName),
  );
  addRange(
    "Bevel Size",
    CONFIG.model,
    "bevelSize",
    0,
    100,
    0.1,
    () => loadModel(currentModelName),
  );
  addRange(
    "Bevel Segments",
    CONFIG.model,
    "bevelSegments",
    1,
    50,
    1,
    () => loadModel(currentModelName),
  );
  addRange(
    "Contour Points",
    CONFIG.model,
    "maxContourPoints",
    50,
    3000,
    10,
    () => loadModel(currentModelName),
  );
  addRange(
    "Alpha Threshold",
    CONFIG.model,
    "alphaThreshold",
    0,
    255,
    1,
    () => loadModel(currentModelName),
  );
  addRange(
    "Target Size",
    CONFIG.model,
    "targetSize",
    50,
    600,
    1,
    () => loadModel(currentModelName),
  );

  addSection("PNG Layers");
  addRange("Alpha Cutoff", CONFIG.model, "alphaTest", 0, 1, 0.01, updatePngMaterials);
  addRange("PNG Offset", CONFIG.layers, "pngOffset", 0, 5, 0.01, () =>
    loadModel(currentModelName),
  );
  addRange("PNG Gap", CONFIG.layers, "pngGap", 0, 2, 0.01, () =>
    loadModel(currentModelName),
  );
  addCheckbox("Back Crystal", CONFIG.layers, "backCrystalEnabled", () =>
    loadModel(currentModelName),
  );
  addRange(
    "Back Offset",
    CONFIG.layers,
    "backCrystalOffset",
    0,
    5,
    0.01,
    () => loadModel(currentModelName),
  );
  addRange(
    "Back Scale",
    CONFIG.layers,
    "backCrystalScale",
    0.5,
    2,
    0.01,
    () => loadModel(currentModelName),
  );
  addRange(
    "Back Tint",
    CONFIG.layers,
    "backCrystalTintScale",
    0,
    1,
    0.01,
    updateAllCrystalMaterials,
  );

  addSection("PNG Adjust (Front)");
  addRange(
    "Saturation",
    CONFIG.model.pngAdjust.front,
    "saturation",
    0,
    2,
    0.01,
    () => loadModel(currentModelName),
  );
  addRange(
    "Vibrance",
    CONFIG.model.pngAdjust.front,
    "vibrance",
    -1,
    1,
    0.01,
    () => loadModel(currentModelName),
  );
  addRange(
    "Brightness",
    CONFIG.model.pngAdjust.front,
    "brightness",
    -1,
    1,
    0.01,
    () => loadModel(currentModelName),
  );
  addRange(
    "Contrast",
    CONFIG.model.pngAdjust.front,
    "contrast",
    0,
    2,
    0.01,
    () => loadModel(currentModelName),
  );

  addSection("PNG Adjust (Back)");
  addRange(
    "Saturation",
    CONFIG.model.pngAdjust.back,
    "saturation",
    0,
    2,
    0.01,
    () => loadModel(currentModelName),
  );
  addRange(
    "Vibrance",
    CONFIG.model.pngAdjust.back,
    "vibrance",
    -1,
    1,
    0.01,
    () => loadModel(currentModelName),
  );
  addRange(
    "Brightness",
    CONFIG.model.pngAdjust.back,
    "brightness",
    -1,
    1,
    0.01,
    () => loadModel(currentModelName),
  );
  addRange(
    "Contrast",
    CONFIG.model.pngAdjust.back,
    "contrast",
    0,
    2,
    0.01,
    () => loadModel(currentModelName),
  );

  addSection("Post FX");
  addCheckbox("Post FX Enabled", CONFIG.postprocessing, "enabled", applyPostProcessingSettings);
  addCheckbox("Bloom", CONFIG.postprocessing.bloom, "enabled", applyPostProcessingSettings);
  addRange(
    "Bloom Strength",
    CONFIG.postprocessing.bloom,
    "strength",
    0,
    3,
    0.01,
    applyPostProcessingSettings,
  );
  addRange(
    "Bloom Radius",
    CONFIG.postprocessing.bloom,
    "radius",
    0,
    2,
    0.01,
    applyPostProcessingSettings,
  );
  addRange(
    "Bloom Threshold",
    CONFIG.postprocessing.bloom,
    "threshold",
    0,
    1,
    0.01,
    applyPostProcessingSettings,
  );
  addCheckbox("Film", CONFIG.postprocessing.film, "enabled", applyPostProcessingSettings);
  addRange(
    "Film Noise",
    CONFIG.postprocessing.film,
    "noiseIntensity",
    0,
    1,
    0.01,
    applyPostProcessingSettings,
  );
  addRange(
    "Film Scanlines",
    CONFIG.postprocessing.film,
    "scanlinesIntensity",
    0,
    1,
    0.01,
    applyPostProcessingSettings,
  );
  addRange(
    "Film Count",
    CONFIG.postprocessing.film,
    "scanlinesCount",
    0,
    2048,
    1,
    applyPostProcessingSettings,
  );
  addCheckbox(
    "Film Grayscale",
    CONFIG.postprocessing.film,
    "grayscale",
    applyPostProcessingSettings,
  );

  addCheckbox("Dot Screen", CONFIG.postprocessing.dotScreen, "enabled", applyPostProcessingSettings);
  addRange(
    "Dot Angle",
    CONFIG.postprocessing.dotScreen,
    "angle",
    0,
    Math.PI * 2,
    0.01,
    applyPostProcessingSettings,
  );
  addRange(
    "Dot Scale",
    CONFIG.postprocessing.dotScreen,
    "scale",
    0.1,
    5,
    0.01,
    applyPostProcessingSettings,
  );

  addCheckbox("Outline", CONFIG.postprocessing.outline, "enabled", applyPostProcessingSettings);
  addRange(
    "Outline Strength",
    CONFIG.postprocessing.outline,
    "edgeStrength",
    0,
    10,
    0.01,
    applyPostProcessingSettings,
  );
  addRange(
    "Outline Glow",
    CONFIG.postprocessing.outline,
    "edgeGlow",
    0,
    5,
    0.01,
    applyPostProcessingSettings,
  );
  addRange(
    "Outline Thick",
    CONFIG.postprocessing.outline,
    "edgeThickness",
    0,
    5,
    0.01,
    applyPostProcessingSettings,
  );
  addRange(
    "Outline Pulse",
    CONFIG.postprocessing.outline,
    "pulsePeriod",
    0,
    5,
    0.01,
    applyPostProcessingSettings,
  );
  addColor("Outline Visible", CONFIG.postprocessing.outline, "visibleColor", applyPostProcessingSettings);
  addColor("Outline Hidden", CONFIG.postprocessing.outline, "hiddenColor", applyPostProcessingSettings);

  addCheckbox("SSAO", CONFIG.postprocessing.ssao, "enabled", applyPostProcessingSettings);
  addRange(
    "SSAO Radius",
    CONFIG.postprocessing.ssao,
    "kernelRadius",
    0,
    32,
    1,
    applyPostProcessingSettings,
  );
  addRange(
    "SSAO MinDist",
    CONFIG.postprocessing.ssao,
    "minDistance",
    0,
    0.1,
    0.001,
    applyPostProcessingSettings,
  );
  addRange(
    "SSAO MaxDist",
    CONFIG.postprocessing.ssao,
    "maxDistance",
    0,
    1,
    0.01,
    applyPostProcessingSettings,
  );

  addCheckbox("SAO", CONFIG.postprocessing.sao, "enabled", applyPostProcessingSettings);
  addRange(
    "SAO Intensity",
    CONFIG.postprocessing.sao,
    "saoIntensity",
    0,
    1,
    0.01,
    applyPostProcessingSettings,
  );
  addRange(
    "SAO Scale",
    CONFIG.postprocessing.sao,
    "saoScale",
    1,
    500,
    1,
    applyPostProcessingSettings,
  );
  addRange(
    "SAO Kernel",
    CONFIG.postprocessing.sao,
    "saoKernelRadius",
    0,
    100,
    1,
    applyPostProcessingSettings,
  );
  addRange(
    "SAO MinRes",
    CONFIG.postprocessing.sao,
    "saoMinResolution",
    0,
    1,
    0.01,
    applyPostProcessingSettings,
  );
  addCheckbox("SAO Blur", CONFIG.postprocessing.sao, "saoBlur", applyPostProcessingSettings);
  addRange(
    "SAO BlurRadius",
    CONFIG.postprocessing.sao,
    "saoBlurRadius",
    0,
    32,
    1,
    applyPostProcessingSettings,
  );
  addRange(
    "SAO BlurStd",
    CONFIG.postprocessing.sao,
    "saoBlurStdDev",
    0,
    20,
    0.1,
    applyPostProcessingSettings,
  );
  addRange(
    "SAO DepthCut",
    CONFIG.postprocessing.sao,
    "saoBlurDepthCutoff",
    0,
    1,
    0.001,
    applyPostProcessingSettings,
  );

  addCheckbox("Sobel", CONFIG.postprocessing.sobel, "enabled", applyPostProcessingSettings);
  addRange(
    "Sobel Scale",
    CONFIG.postprocessing.sobel,
    "scale",
    0,
    5,
    0.01,
    applyPostProcessingSettings,
  );

  addCheckbox("LUT", CONFIG.postprocessing.lut, "enabled", () => {
    console.warn("LUT enabled but no LUT texture is loaded.");
    applyPostProcessingSettings();
  });
  addRange(
    "LUT Intensity",
    CONFIG.postprocessing.lut,
    "intensity",
    0,
    1,
    0.01,
    applyPostProcessingSettings,
  );

  addCheckbox("Vignette", CONFIG.postprocessing.vignette, "enabled", applyPostProcessingSettings);
  addRange(
    "Vignette Offset",
    CONFIG.postprocessing.vignette,
    "offset",
    0,
    2,
    0.01,
    applyPostProcessingSettings,
  );
  addRange(
    "Vignette Darkness",
    CONFIG.postprocessing.vignette,
    "darkness",
    0,
    2,
    0.01,
    applyPostProcessingSettings,
  );
  addCheckbox("RGB Shift", CONFIG.postprocessing.rgbShift, "enabled", applyPostProcessingSettings);
  addRange(
    "RGB Amount",
    CONFIG.postprocessing.rgbShift,
    "amount",
    0,
    0.02,
    0.0001,
    applyPostProcessingSettings,
  );
  addRange(
    "RGB Angle",
    CONFIG.postprocessing.rgbShift,
    "angle",
    -Math.PI,
    Math.PI,
    0.01,
    applyPostProcessingSettings,
  );
  addCheckbox("FXAA", CONFIG.postprocessing.fxaa, "enabled", applyPostProcessingSettings);

  document.body.appendChild(panel);
}

// UI
const buttons = document.querySelectorAll(".model-btn");
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    buttons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const modelName = btn.getAttribute("data-model");
    loadModel(modelName);
  });
});

setupGui();
setupPostProcessing();
loadModel(INITIAL_MODEL);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  updatePostFxResolution();
});

function animate() {
  requestAnimationFrame(animate);
  if (CONFIG.controls.autoRotate) {
    const now = performance.now();
    const idleTime = now - lastUserInteraction;
    controls.autoRotate = idleTime >= CONFIG.controls.idleAutoRotateDelayMs;
  }
  controls.update();
  if (CONFIG.postprocessing.enabled && composer) {
    composer.render();
  } else {
    renderer.render(scene, camera);
  }
}

animate();
