"use client";

import { useEffect, useRef } from "react";
import {
	AdditiveBlending,
	BufferGeometry,
	Clock,
	Color,
	Float32BufferAttribute,
	PerspectiveCamera,
	Points,
	PointsMaterial,
	Scene,
} from "three";
import { createRenderer, observeVisibility } from "@/lib/three/createRenderer";

const PARTICLE_COUNT = 1600;
const CAMERA_Z = 12;
const FOV = 60;

/** Cruising speed through the flow field (world units / second). */
const SWIM_SPEED = 0.55;
/** How quickly a particle steers back onto the flow (per second). */
const STEER = 1.4;
/** Cursor influence radius, in world units at the z=0 plane. */
const FLEE_RADIUS = 2.4;
/** Peak acceleration away from the cursor (world units / second²). */
const FLEE_FORCE = 38;

/**
 * Zero-gravity particle swarm behind the hero. Each dot swims along a slowly
 * shifting flow field, wraps around the edges, and scatters away from the
 * cursor (or finger) before drifting back into the current.
 */
export default function BootField3D({ resolved = true }: { resolved?: boolean }) {
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
		const camera = new PerspectiveCamera(FOV, 1, 0.1, 100);
		camera.position.z = CAMERA_Z;

		const renderer = createRenderer(canvas);

		// Visible half-extents of the z=0 plane; updated on resize.
		const halfH = CAMERA_Z * Math.tan(((FOV / 2) * Math.PI) / 180);
		let halfW = halfH;

		const positions = new Float32Array(PARTICLE_COUNT * 3);
		const velocities = new Float32Array(PARTICLE_COUNT * 2);
		const speedJitter = new Float32Array(PARTICLE_COUNT);

		for (let i = 0; i < PARTICLE_COUNT; i++) {
			positions[i * 3] = (Math.random() - 0.5) * 2 * halfH * 2;
			positions[i * 3 + 1] = (Math.random() - 0.5) * 2 * halfH;
			positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
			speedJitter[i] = 0.6 + Math.random() * 0.8;
		}

		const geometry = new BufferGeometry();
		geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));

		const material = new PointsMaterial({
			color: new Color(0xb2cdbb), // --color-primary
			size: 0.06,
			transparent: true,
			opacity: 0.75,
			blending: AdditiveBlending,
			depthWrite: false,
		});

		const points = new Points(geometry, material);
		scene.add(points);

		function resize() {
			if (!container) return;
			const { clientWidth, clientHeight } = container;
			camera.aspect = clientWidth / Math.max(clientHeight, 1);
			camera.updateProjectionMatrix();
			halfW = halfH * camera.aspect;
			renderer.setSize(clientWidth, clientHeight, false);
		}
		resize();
		const ro = new ResizeObserver(resize);
		ro.observe(container);

		// Pointer in world units on the z=0 plane; null when off the hero.
		let pointer: { x: number; y: number } | null = null;
		function onPointerMove(e: PointerEvent) {
			if (!canvas) return;
			const rect = canvas.getBoundingClientRect();
			const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
			const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
			if (nx < -1 || nx > 1 || ny < -1 || ny > 1) {
				pointer = null;
				return;
			}
			pointer = { x: nx * halfW, y: ny * halfH };
		}
		function onPointerLeave() {
			pointer = null;
		}
		window.addEventListener("pointermove", onPointerMove, { passive: true });
		document.addEventListener("pointerleave", onPointerLeave);

		let running = true;
		const clock = new Clock();
		let t = Math.random() * 100;

		function tick() {
			const dt = Math.min(clock.getDelta(), 0.05);
			if (!running) return;
			t += dt;

			// Slightly livelier while the boot log is still typing.
			const speed = SWIM_SPEED * (resolvedRef.current ? 1 : 1.8);
			const steer = Math.min(1, STEER * dt);
			const marginX = halfW + 1;
			const marginY = halfH + 1;

			for (let i = 0; i < PARTICLE_COUNT; i++) {
				const ix = i * 3;
				const iv = i * 2;
				const x = positions[ix];
				const y = positions[ix + 1];
				const z = positions[ix + 2];

				// Cheap smooth flow field: an angle that drifts over space and time.
				const angle =
					(Math.sin(x * 0.22 + t * 0.15) + Math.cos(y * 0.27 - t * 0.12)) * Math.PI +
					Math.sin(z * 0.5 + t * 0.1);
				const s = speed * speedJitter[i];
				let vx = velocities[iv];
				let vy = velocities[iv + 1];
				vx += (Math.cos(angle) * s - vx) * steer;
				vy += (Math.sin(angle) * s - vy) * steer;

				if (pointer) {
					// Compare in screen space: a dot at depth z appears scaled by perspective.
					const persp = CAMERA_Z / (CAMERA_Z - z);
					const dx = x * persp - pointer.x;
					const dy = y * persp - pointer.y;
					const dist = Math.hypot(dx, dy);
					if (dist < FLEE_RADIUS && dist > 1e-4) {
						const falloff = 1 - dist / FLEE_RADIUS;
						const push = FLEE_FORCE * falloff * falloff * dt;
						vx += (dx / dist) * push;
						vy += (dy / dist) * push;
					}
				}

				velocities[iv] = vx;
				velocities[iv + 1] = vy;

				let nx = x + vx * dt;
				let ny = y + vy * dt;
				if (nx > marginX) nx = -marginX;
				else if (nx < -marginX) nx = marginX;
				if (ny > marginY) ny = -marginY;
				else if (ny < -marginY) ny = marginY;

				positions[ix] = nx;
				positions[ix + 1] = ny;
				positions[ix + 2] = z + Math.sin(t * 0.4 + i) * 0.002;
			}

			const posAttr = geometry.getAttribute("position") as Float32BufferAttribute;
			posAttr.copyArray(positions);
			posAttr.needsUpdate = true;

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
			window.removeEventListener("pointermove", onPointerMove);
			document.removeEventListener("pointerleave", onPointerLeave);
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
