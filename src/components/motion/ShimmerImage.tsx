"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";

/** next/image wrapper that shows a shimmer skeleton until the image finishes loading. */
export default function ShimmerImage(props: ImageProps) {
	const [loaded, setLoaded] = useState(false);

	return (
		<>
			{!loaded && (
				<div className="absolute inset-0 overflow-hidden bg-surface-container-high">
					<span
						aria-hidden="true"
						className="absolute inset-0 -translate-x-full"
						style={{
							background:
								"linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
							animation: "shimmer 1.6s ease-in-out infinite",
						}}
					/>
				</div>
			)}
			{/* eslint-disable-next-line jsx-a11y/alt-text -- alt is required by ImageProps and always supplied via spread */}
			<Image {...props} onLoad={() => setLoaded(true)} />
		</>
	);
}
