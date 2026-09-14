"use client";

import { useEffect, useRef } from "react";
import {
	CanvasTexture,
	Group,
	PerspectiveCamera,
	Raycaster,
	Scene,
	Sprite,
	SpriteMaterial,
	Vector2,
} from "three";
import { createRenderer, observeVisibility } from "@/lib/three/createRenderer";
import type { Tech } from "@/content/portfolio";

const RADIUS = 3.2;

function labelTexture(text: string): CanvasTexture {
	const canvas = document.createElement("canvas");
	canvas.width = 256;
	canvas.height = 96;
	const ctx = canvas.getContext("2d")!;
	ctx.fillStyle = "rgba(42, 42, 42, 0.92)";
	ctx.beginPath();
	ctx.roundRect(4, 24, canvas.width - 8, 48, 16);
	ctx.fill();
	ctx.fillStyle = "#e5e2e1";
	ctx.font = "600 28px Inter, sans-serif";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillText(text, canvas.width / 2, canvas.height / 2 + 2);
	const texture = new CanvasTexture(canvas);
	texture.needsUpdate = true;
	return texture;
}

export default function StackOrbit3D({
	items,
	onHoverChange,
}: {
	items: Tech[];
	onHoverChange: (tech: Tech | null) => void;
}) {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const container = canvas?.parentElement;
		if (!canvas || !container) return;

		const scene = new Scene();
		const camera = new PerspectiveCamera(50, 1, 0.1, 20);
		camera.position.z = 7;

		const renderer = createRenderer(canvas);

		const group = new Group();
		const sprites: Sprite[] = [];
		const textures: CanvasTexture[] = [];

		items.forEach((tech, i) => {
			const angle = (i / items.length) * Math.PI * 2;
			const texture = labelTexture(tech.name);
			textures.push(texture);
			const material = new SpriteMaterial({ map: texture, transparent: true });
			const sprite = new Sprite(material);
			sprite.scale.set(1.6, 0.6, 1);
			sprite.position.set(Math.cos(angle) * RADIUS, Math.sin(angle * 1.3) * 0.8, Math.sin(angle) * RADIUS);
			sprite.userData.tech = tech;
			group.add(sprite);
			sprites.push(sprite);
		});
		scene.add(group);

		let running = true;
		let paused = false;
		let hovered: Sprite | null = null;

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

		const raycaster = new Raycaster();
		const pointer = new Vector2(2, 2); // off-screen until first move

		function onPointerMove(e: PointerEvent) {
			const rect = container!.getBoundingClientRect();
			pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
			pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
		}
		function onPointerLeave() {
			pointer.set(2, 2);
		}
		container.addEventListener("pointermove", onPointerMove);
		container.addEventListener("pointerleave", onPointerLeave);

		function tick() {
			if (!running) return;

			raycaster.setFromCamera(pointer, camera);
			const hits = raycaster.intersectObjects(sprites);
			const next = (hits[0]?.object as Sprite | undefined) ?? null;
			if (next !== hovered) {
				hovered = next;
				paused = !!hovered;
				onHoverChange((hovered?.userData.tech as Tech) ?? null);
			}

			if (!paused) group.rotation.y += 0.004;
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
			container.removeEventListener("pointermove", onPointerMove);
			container.removeEventListener("pointerleave", onPointerLeave);
			sprites.forEach((s) => s.material.dispose());
			textures.forEach((t) => t.dispose());
			renderer.dispose();
			onHoverChange(null);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps -- items is content, effectively static per mount
	}, []);

	return (
		<canvas
			ref={canvasRef}
			aria-hidden="true"
			className="absolute inset-0 w-full h-full"
		/>
	);
}
