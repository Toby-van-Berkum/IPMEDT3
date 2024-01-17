AFRAME.registerComponent("ocean-box-component", {
  schema: {
    amp: { type: "number", default: 0.25 },
    color: { type: "color", default: "#7AD2F7" },
    speed: { type: "number", default: 1 },
    frequency: { type: "number", default: 1.0 },
    size: { type: "vec3", default: { x: 10, y: 1, z: 10 } },
  },
  init: function () {
    const material = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec2 vUv;
        varying float vWaveHeight;
        uniform float time;
        uniform float speed;
        uniform float amp;
        uniform float frequency;

        void main() {
          vUv = uv;
          float lateralMotionX = position.x;
          float lateralMotionZ = position.z;
          vWaveHeight = amp * sin(speed * frequency * lateralMotionX + speed * frequency * lateralMotionZ + time);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position.x, vWaveHeight, position.z, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        varying float vWaveHeight;
        uniform float time;
        uniform float speed;
        uniform vec3 colorA;
        uniform vec3 oceanBlue;

        void main() {
          // Use the UV coordinates to create a gradient based on position
          vec3 gradientColor = mix(colorA, oceanBlue, vUv.y);
          
          // Add a wave effect using the vWaveHeight
          float gradient = abs(sin(time * speed + vWaveHeight));
          
          // Interpolate between the gradient color and the oceanBlue
          vec3 finalColor = mix(gradientColor, oceanBlue, smoothstep(0.0, 0.5, gradient));

          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
      uniforms: {
        time: { value: 0 },
        speed: { value: this.data.speed },
        amp: { value: this.data.amp },
        frequency: { value: this.data.frequency },
        colorA: { value: new THREE.Color(this.data.color) },
        oceanBlue: { value: new THREE.Color("#0077be") },
      },
      transparent: true,
      opacity: 0.8,
      receiveShadow: true
    });

    const geometry = new THREE.BoxGeometry(
      this.data.size.x,
      this.data.size.y,
      this.data.size.z,
      40,
      10,
      40
    );

    const mesh = new THREE.Mesh(geometry, material);
    this.el.setObject3D("mesh", mesh);
  },
  tick: function (time, delta) {
    this.el.getObject3D("mesh").material.uniforms.time.value += delta / 1000;
  },
  update: function (oldData) {
    if (oldData.color !== this.data.color) {
      this.el.getObject3D("mesh").material.uniforms.colorA.value.set(this.data.color);
    }

    if (oldData.amp !== this.data.amp) {
      this.el.getObject3D("mesh").material.uniforms.amp.value = this.data.amp;
    }

    if (oldData.frequency !== this.data.frequency) {
      this.el.getObject3D("mesh").material.uniforms.frequency.value = this.data.frequency;
    }

    if (oldData.speed !== this.data.speed) {
      this.el.getObject3D("mesh").material.uniforms.speed.value = this.data.speed;
    }

    if (
      oldData &&
      oldData.size &&
      this.data.size &&
      (oldData.size.x !== this.data.size.x ||
        oldData.size.y !== this.data.size.y ||
        oldData.size.z !== this.data.size.z)
    ) {
      const geometry = new THREE.BoxGeometry(
        this.data.size.x,
        this.data.size.y,
        this.data.size.z,
        40,
        10,
        40
      );
      this.el.getObject3D("mesh").geometry = geometry;
    }
  },
});
