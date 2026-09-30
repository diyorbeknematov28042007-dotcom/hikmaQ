export const vortexVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const vortexFragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float band(float r, float center, float width) {
    float x = (r - center) / width;
    return exp(-x * x);
  }

  void main() {
    vec2 p = (vUv - 0.5) * vec2(1.05, 1.14);
    float angle = -0.22;
    p = mat2(cos(angle), -sin(angle), sin(angle), cos(angle)) * p;
    float r = length(p);
    float a = atan(p.y, p.x);
    float t = uTime * 0.23;

    float body = band(r, 0.315, 0.105);
    float inner = band(r, 0.205, 0.022);
    float outer = band(r, 0.445, 0.073);
    float curve = a * 7.0 + r * 49.0 - t * 3.0 + sin(a * 3.0 + r * 14.0 - t) * 1.1;
    float filaments = pow(0.5 + 0.5 * sin(curve), 7.0);
    float filaments2 = pow(0.5 + 0.5 * sin(a * 12.0 - r * 63.0 + t * 2.5), 12.0);
    float streaks = (filaments * 0.85 + filaments2 * 0.48) * body;

    vec2 dustCell = floor(vec2(r * 275.0, (a + 3.14159) * 115.0));
    float dust = step(0.978, hash(dustCell)) * body * (0.65 + 0.35 * sin(t * 3.0 + hash(dustCell + 2.0) * 6.28));
    float swirl = 0.5 + 0.5 * sin(a * 3.0 + r * 22.0 - t * 1.5);
    float energy = body * (0.17 + 0.11 * swirl) + inner * 0.19 + outer * 0.10 + streaks * 0.48 + dust * 0.72;
    float halo = band(r, 0.34, 0.18) * 0.10;

    float voidMask = 1.0 - smoothstep(0.135, 0.195, r);
    float edge = 1.0 - smoothstep(0.54, 0.69, r);
    vec3 emerald = vec3(0.012, 0.50, 0.30);
    vec3 mint = vec3(0.22, 0.86, 0.54);
    vec3 color = mix(emerald, mint, clamp(streaks * 1.1 + dust, 0.0, 1.0)) * (energy + halo);
    color += vec3(0.0, 0.025, 0.016) * outer;
    color = mix(color, vec3(0.0, 0.006, 0.004), voidMask);
    float alpha = clamp((energy * 1.2 + halo * 0.7 + voidMask * 0.96) * edge, 0.0, 1.0);
    gl_FragColor = vec4(color, alpha);
  }
`;
