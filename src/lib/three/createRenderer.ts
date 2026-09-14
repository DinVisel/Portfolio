import { WebGLRenderer } from "three";

/**
 * A WebGLRenderer with the site's hygiene defaults applied: capped pixel
 * ratio, transparent background (scenes sit over the page's own surface
 * color), and antialiasing for the low particle/geometry counts we use.
 */
export function createRenderer(canvas: HTMLCanvasElement): WebGLRenderer {
	const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true });
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
	renderer.setClearColor(0x000000, 0);
	return renderer;
}

/**
 * Pauses a renderer's animation loop when the canvas leaves the viewport or
 * the tab is hidden. `onVisible` is called with the combined visible state.
 */
export function observeVisibility(
	el: Element,
	onVisible: (visible: boolean) => void
): () => void {
	let intersecting = false;

	const report = () => onVisible(intersecting && document.visibilityState === "visible");

	const io = new IntersectionObserver(
		([entry]) => {
			intersecting = entry.isIntersecting;
			report();
		},
		{ threshold: 0.05 }
	);
	io.observe(el);

	document.addEventListener("visibilitychange", report);

	return () => {
		io.disconnect();
		document.removeEventListener("visibilitychange", report);
	};
}
