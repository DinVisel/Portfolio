"use client";

import { useEffect, useRef } from "react";
import {
	Color,
	Mesh,
	MeshBasicMaterial,
	PerspectiveCamera,
	PlaneGeometry,
	Scene,
	Texture,
} from "three";
import { createRenderer, observeVisibility } from "@/lib/three/createRenderer";

const MAX_TILT = 0.18; // radians

/**
 * The project's own cover image, loaded as a texture onto a floating plane
 * that tracks the pointer with a subtle tilt. Only mounted when the project
 * has a real `image` — no texture, no 3D, StagePoster stays the whole story.
 */
export default function ProjectStage3D({
	imageSrc,
	accentHex,
}: {
	imageSrc: string;
	accentHex: string;
}) {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const container = canvas?.parentElement;
		if (!canvas || !container) return;

		const scene = new Scene();
		const camera = new PerspectiveCamera(45, 1, 0.1, 20);
		camera.position.z = 3;

		const renderer = createRenderer(canvas);

		const geometry = new PlaneGeometry(3.2, 2, 1, 1);
		const material = new MeshBasicMaterial({ color: new Color(accentHex), transparent: true });
		const plane = new Mesh(geometry, material);
		scene.add(plane);

		let disposed = false;
		const img = new Image();
		img.crossOrigin = "anonymous";
		img.onload = () => {
			if (disposed) return;
			const texture = new Texture(img);
			texture.needsUpdate = true;
			material.map = texture;
			material.color.set(0xffffff);
			material.needsUpdate = true;
		};
		img.src = imageSrc;

		let running = true;
		let targetX = 0;
		let targetY = 0;

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

		function onPointerMove(e: PointerEvent) {
			const rect = container!.getBoundingClientRect();
			targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
			targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
		}
		container.addEventListener("pointermove", onPointerMove);

		function tick() {
			if (!running) return;
			plane.rotation.y += (targetX * MAX_TILT - plane.rotation.y) * 0.08;
			plane.rotation.x += (-targetY * MAX_TILT - plane.rotation.x) * 0.08;
			renderer.render(scene, camera);
		}
		renderer.setAnimationLoop(tick);

		const stopVisibility = observeVisibility(container, (visible) => {
			running = visible;
		});

		return () => {
			disposed = true;
			renderer.setAnimationLoop(null);
			stopVisibility();
			ro.disconnect();
			container.removeEventListener("pointermove", onPointerMove);
			geometry.dispose();
			material.map?.dispose();
			material.dispose();
			renderer.dispose();
		};
	}, [imageSrc, accentHex]);

	return (
		<canvas
			ref={canvasRef}
			aria-hidden="true"
			className="absolute inset-0 w-full h-full pointer-events-none"
		/>
	);
}
