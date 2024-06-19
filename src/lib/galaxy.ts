// 作者：古柳 / 微信：xiaoaizhj 备注「可视化加群」欢迎进群交流
// 「手撸一个星系，送给心爱的姑娘！（Three.js Shader 粒子系统实现）- 牛衣古柳 - 20240417」
// https://mp.weixin.qq.com/s/_vZIRze7SWO4R7gRaFukoQ
// https://juejin.cn/post/7358704808525971475

// https://actium.co.jp/
// https://codepen.io/prisoner849/pen/RwyzrVj

// import * as THREE from "https://esm.sh/three";
// import { OrbitControls } from "https://esm.sh/three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export function renderGalaxy(dom: HTMLElement) {
  let w = window.innerWidth;
  let h = window.innerHeight;

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(60, w / h, 0.001, 1000);
  camera.position.set(0, 3, 24);
  camera.lookAt(scene.position);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    // alpha: true,
  });

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(w, h);
  renderer.setClearColor(0x160016, 1);
  dom.childElementCount <= 0 && dom.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  // controls.enableDamping = true;
  // controls.enablePan = false;

  // const geometry = new THREE.SphereGeometry(1, 64, 64);
  const count1 = 50000;
  const count2 = 100000;

  const geometry = new THREE.BufferGeometry();
  const positions = [];
  const sizes = [];
  const shifts = [];
  for (let i = 0; i < count1 + count2; i++) {
    const theta = Math.random() * Math.PI * 2;
    // let phi = Math.random() * Math.PI;
    const phi = Math.acos(Math.random() * 2 - 1);
    const angle = (Math.random() * 0.9 + 0.1) * Math.PI * 0.1;
    const strength = Math.random() * 0.9 + 0.1; // 0.1-1.0
    shifts.push(theta, phi, angle, strength);

    const size = Math.random() * 1.5 + 0.5; // 0.5-2.0
    sizes.push(size);

    if (i < count1) {
      // 中心球体粒子
      // let r = 10;
      const r = Math.random() * 0.5 + 9.5;
      // let x = r * Math.sin(phi) * Math.cos(theta);
      // let y = r * Math.sin(phi) * Math.sin(theta);
      // let z = r * Math.cos(phi);
      const { x, y, z } = new THREE.Vector3()
        .randomDirection()
        .multiplyScalar(r);
      positions.push(x, y, z);
    } else {
      // 外围圆盘粒子
      const r = 10;
      const R = 40;
      const rand = Math.pow(Math.random(), 1.5);
      const radius = Math.sqrt(R * R * rand + (1 - rand) * r * r); // 通过 rand=0-1 数值去线性插值 R^2 和 r^2 大概是按圆圈面积采样粒子分布更均匀
      const { x, y, z } = new THREE.Vector3().setFromCylindricalCoords(
        radius, // 半径
        Math.random() * 2 * Math.PI, // 角度
        (Math.random() - 0.5) * 2 // 高度y -1-1
      );
      positions.push(x, y, z);
    }
  }

  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  );
  geometry.setAttribute("aSize", new THREE.Float32BufferAttribute(sizes, 1));
  geometry.setAttribute("aShift", new THREE.Float32BufferAttribute(shifts, 4));

  const vertexShader = /* GLSL */ `
    attribute float aSize;
    attribute vec4 aShift;
  
    uniform float uTime;
  
    varying vec3 vColor;
  
    const float PI = 3.141592653589793238;
  
    void main() {
        // float d = abs(position.y) / 10.0;
        float d = length(abs(position) / vec3(40., 10., 40.)); // 中间黄色、外面紫色
        d = clamp(d, 0., 1.);
        
        // rgb(227, 155, 0)
        // rgb(100, 50, 255)
        vec3 color1 = vec3(227., 155., 0.);
        vec3 color2 = vec3(100., 50., 255.);
  
        vColor = mix(color1, color2, d) / 255.;
  
        vec3 transformed = position;
  
        float theta = mod(aShift.x + aShift.z * uTime, PI * 2.);
        float phi = mod(aShift.y + aShift.z * uTime, PI * 2.);
        transformed += vec3(sin(phi) * cos(theta), cos(phi), sin(phi) * sin(theta)) * aShift.w;
        
        vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);
        gl_PointSize = aSize * 50.0 / -mvPosition.z;
        gl_Position = projectionMatrix * mvPosition;
    }
  `;

  const fragmentShader = /* GLSL */ `
    varying vec3 vColor;
  
    void main() {
      float d = length(gl_PointCoord.xy - 0.5);
      if (d > 0.5) discard;
      // gl_FragColor = vec4(vColor, step(0.5, 1.0 - d));
      gl_FragColor = vec4(vColor, smoothstep(0.5, 0.1, d));
    }
  `;

  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTime: { value: 0 },
    },
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthTest: false,
  });

  // const mesh = new THREE.Mesh(geometry, material);
  const mesh = new THREE.Points(geometry, material);
  mesh.rotation.order = "ZYX";
  mesh.rotation.z = 0.2;
  scene.add(mesh);

  // let time = 0;
  const clock = new THREE.Clock();
  function render() {
    // time += 0.05;
    const time = clock.getElapsedTime();
    mesh.rotation.y = time * 0.01;
    material.uniforms.uTime.value = time;
    renderer.render(scene, camera);
    controls.update();

    requestAnimationFrame(render);
  }

  render();

  function resize() {
    w = window.innerWidth;
    h = window.innerHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  window.addEventListener("resize", resize);
}
