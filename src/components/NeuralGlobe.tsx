"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type Edge = { a: THREE.Vector3; b: THREE.Vector3 };

export default function NeuralGlobe() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight || 420;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 4.2;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const root = new THREE.Group();
    scene.add(root);

    const globe = new THREE.Group();
    root.add(globe);

    const radius = 1.35;
    const sphereGeo = new THREE.IcosahedronGeometry(radius, 2);
    const wire = new THREE.WireframeGeometry(sphereGeo);
    const wireMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    globe.add(new THREE.LineSegments(wire, wireMat));

    const nodes: THREE.Vector3[] = [];
    const nodeCount = 52;
    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;
      nodes.push(
        new THREE.Vector3(
          radius * Math.cos(theta) * Math.sin(phi),
          radius * Math.sin(theta) * Math.sin(phi),
          radius * Math.cos(phi),
        ),
      );
    }

    const nodeGeo = new THREE.BufferGeometry().setFromPoints(nodes);
    const nodeMat = new THREE.PointsMaterial({
      color: 0x22d3ee,
      size: 0.055,
      transparent: true,
      opacity: 0.95,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    globe.add(new THREE.Points(nodeGeo, nodeMat));

    const edges: Edge[] = [];
    const linePositions: number[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 0.92) {
          edges.push({ a: nodes[i], b: nodes[j] });
          linePositions.push(
            nodes[i].x,
            nodes[i].y,
            nodes[i].z,
            nodes[j].x,
            nodes[j].y,
            nodes[j].z,
          );
        }
      }
    }
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(linePositions, 3),
    );
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x818cf8,
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    globe.add(new THREE.LineSegments(lineGeo, lineMat));

    // Signal pulses traveling along edges
    const pulseCount = Math.min(18, edges.length);
    const pulsePos = new Float32Array(pulseCount * 3);
    const pulseProgress = new Float32Array(pulseCount);
    const pulseEdges: number[] = [];
    for (let i = 0; i < pulseCount; i++) {
      pulseEdges.push(Math.floor(Math.random() * edges.length));
      pulseProgress[i] = Math.random();
    }
    const pulseGeo = new THREE.BufferGeometry();
    pulseGeo.setAttribute("position", new THREE.BufferAttribute(pulsePos, 3));
    const pulseMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.08,
      transparent: true,
      opacity: 1,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const pulses = new THREE.Points(pulseGeo, pulseMat);
    globe.add(pulses);

    // Outer orbital ring
    const ringGeo = new THREE.TorusGeometry(1.85, 0.008, 8, 128);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.6;
    ring.rotation.y = 0.35;
    root.add(ring);

    const ring2Geo = new THREE.TorusGeometry(2.05, 0.004, 8, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI / 3.2;
    ring2.rotation.z = 0.4;
    root.add(ring2);

    const ambientGeo = new THREE.BufferGeometry();
    const ambientCount = 80;
    const aPos = new Float32Array(ambientCount * 3);
    for (let i = 0; i < ambientCount; i++) {
      const r = 1.7 + Math.random() * 0.7;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      aPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      aPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      aPos[i * 3 + 2] = r * Math.cos(phi);
    }
    ambientGeo.setAttribute("position", new THREE.BufferAttribute(aPos, 3));
    globe.add(
      new THREE.Points(
        ambientGeo,
        new THREE.PointsMaterial({
          color: 0x38bdf8,
          size: 0.02,
          transparent: true,
          opacity: 0.5,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
      ),
    );

    const mouse = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    const scroll = { y: 0, target: 0 };

    const onPointerMove = (e: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };

    const onScroll = () => {
      const rect = mount.getBoundingClientRect();
      const viewH = window.innerHeight || 1;
      scroll.target = Math.max(-1, Math.min(1, 1 - rect.top / viewH));
    };

    mount.addEventListener("pointermove", onPointerMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    let frame = 0;
    let raf = 0;
    const tmp = new THREE.Vector3();

    const animate = () => {
      frame += 0.0032;
      target.x += (mouse.x - target.x) * 0.06;
      target.y += (mouse.y - target.y) * 0.06;
      scroll.y += (scroll.target - scroll.y) * 0.05;

      globe.rotation.y = frame + target.x * 0.35;
      globe.rotation.x = 0.18 + target.y * 0.32 + scroll.y * 0.15;
      globe.rotation.z = target.x * 0.1;
      root.scale.setScalar(1 + scroll.y * 0.06);

      ring.rotation.z -= 0.004;
      ring2.rotation.z += 0.0025;

      for (let i = 0; i < pulseCount; i++) {
        pulseProgress[i] += 0.008 + (i % 3) * 0.002;
        if (pulseProgress[i] > 1) {
          pulseProgress[i] = 0;
          pulseEdges[i] = Math.floor(Math.random() * edges.length);
        }
        const edge = edges[pulseEdges[i]];
        tmp.copy(edge.a).lerp(edge.b, pulseProgress[i]);
        pulsePos[i * 3] = tmp.x;
        pulsePos[i * 3 + 1] = tmp.y;
        pulsePos[i * 3 + 2] = tmp.z;
      }
      pulseGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight || 420;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      mount.removeEventListener("pointermove", onPointerMove);
      renderer.dispose();
      sphereGeo.dispose();
      wire.dispose();
      wireMat.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      pulseGeo.dispose();
      pulseMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      ambientGeo.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="relative h-[320px] w-full sm:h-[400px] lg:h-[440px]"
      aria-hidden
    />
  );
}
