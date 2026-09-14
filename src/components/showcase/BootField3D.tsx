"use client";

import { useEffect, useRef } from "react";
import {
	AdditiveBlending,
	BufferGeometry,
	Color,
	Float32BufferAttribute,
	PerspectiveCamera,
	Points,
	PointsMaterial,
	Scene,
} from "three";
import { createRenderer, observeVisibility } from "@/lib/three/createRenderer";

const PARTICLE_COUNT = 2000;

/**
 * Particle field that resolves from noise into a stable grid as the boot log
 * completes. Cheap (points only, additive blending) — sets the tone before
 * anything else has loaded.
 */
export default function BootField3D({ resolved }: { resolved: boolean }) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const resolvedRef = useRef(resolved);

	useEffect(() => {
		resolvedRef.current = resolved;
	}, [resolved]);

	useEffect(() => {
		const canvas = canvasRef.current;
		const container = canvas?.parentElement;
		if (!canvas || !container) return;

		const scene = new Scene();
		const camera = new PerspectiveCamera(60, 1, 0.1, 100);
		camera.position.z = 12;

		const renderer = createRenderer(canvas);

		const noisePositions = new Float32Array(PARTICLE_COUNT * 3);
		const gridPositions = new Float32Array(PARTICLE_COUNT * 3);
		const cols = Math.ceil(Math.sqrt(PARTICLE_COUNT));

		for (let i = 0; i < PARTICLE_COUNT; i++) {
			noisePositions[i * 3] = (Math.random() - 0.5) * 20;
			noisePositions[i * 3 + 1] = (Math.random() - 0.5) * 12;
			noisePositions[i * 3 + 2] = (Math.random() - 0.5) * 10;

			const col = i % cols;
			const row = Math.floor(i / cols);
			gridPositions[i * 3] = (col / cols - 0.5) * 16;
			gridPositions[i * 3 + 1] = (row / cols - 0.5) * 9;
			gridPositions[i * 3 + 2] = 0;
		}

		const positions = Float32Array.from(noisePositions);
		const geometry = new BufferGeometry();
		geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));

		const material = new PointsMaterial({
			color: new Color(0xb2cdbb), // --color-primary
			size: 0.05,
			transparent: true,
			opacity: 0.7,
			blending: AdditiveBlending,
			depthWrite: false,
		});

		const points = new Points(geometry, material);
		scene.add(points);

		let running = true;
		let progress = 0; // 0 = noise, 1 = resolved grid
		let t = 0;

		function resize() {
			if (!container) return;
			const { clientWidth, clientHeight } = container;
			camera.aspect = clientWidth / Math.max(clientHeight, 1);
			camera.updateProjectionMatrix();
			renderer.setSize(clientWidth, clientHeight, false);
		}
		resize();
		const ro = new ResizeObserver(resize);
		ro.observe(container);

		function tick() {
			if (!running) return;
			t += 0.005;
			if (resolvedRef.current && progress < 1) progress = Math.min(1, progress + 0.02);

			const posAttr = geometry.getAttribute("position") as Float32BufferAttribute;
			for (let i = 0; i < PARTICLE_COUNT; i++) {
				const ix = i * 3;
				const drift = Math.sin(t + i) * 0.15 * (1 - progress);
				posAttr.array[ix] =
					noisePositions[ix] * (1 - progress) + gridPositions[ix] * progress + drift;
				posAttr.array[ix + 1] =
					noisePositions[ix + 1] * (1 - progress) +
					gridPositions[ix + 1] * progress +
					drift;
				posAttr.array[ix + 2] = noisePositions[ix + 2] * (1 - progress) + gridPositions[ix + 2] * progress;
			}
			posAttr.needsUpdate = true;
			points.rotation.y = t * 0.05 * (1 - progress);

			renderer.render(scene, camera);
		}

		renderer.setAnimationLoop(tick);

		const stopVisibility = observeVisibility(container, (visible) => {
			running = visible;
		});

		return () => {
			renderer.setAnimationLoop(null);
			stopVisibility();
			ro.disconnect();
			geometry.dispose();
			material.dispose();
			renderer.dispose();
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			aria-hidden="true"
			className="absolute inset-0 w-full h-full pointer-events-none"
		/>
	);
}
