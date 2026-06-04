import { cn } from '../../lib/utils';
import React, { useEffect, useRef } from 'react'; 
import * as THREE from 'three'; 

type DottedSurfaceProps = Omit<React.ComponentProps<'div'>, 'ref'>; 

export function DottedSurface({ className, ...props }: DottedSurfaceProps) { 
	 const containerRef = useRef<HTMLDivElement>(null); 
	 const sceneRef = useRef<{ 
	 	 scene: THREE.Scene; 
	 	 camera: THREE.PerspectiveCamera; 
	 	 renderer: THREE.WebGLRenderer; 
	 	 particles: THREE.Points[]; 
	 	 animationId: number; 
	 	 count: number; 
	 } | null>(null); 

	 useEffect(() => { 
	 	 if (!containerRef.current) return; 

	 	 const SEPARATION = 100; 
	 	 const AMOUNTX = 60; 
	 	 const AMOUNTY = 60; 

	 	 // Scene setup 
	 	 const scene = new THREE.Scene(); 
	 	 
	 	 const camera = new THREE.PerspectiveCamera( 
	 	 	 75, 
	 	 	 window.innerWidth / window.innerHeight, 
	 	 	 1, 
	 	 	 10000, 
	 	 ); 
	 	 // Lower camera and tilt it more for better perspective on the waves
	 	 camera.position.set(0, 400, 1200); 
	 	 camera.lookAt(0, 0, 0);

	 	 const renderer = new THREE.WebGLRenderer({ 
	 	 	 alpha: true, 
	 	 	 antialias: true, 
	 	 }); 
	 	 renderer.setPixelRatio(window.devicePixelRatio); 
	 	 renderer.setSize(window.innerWidth, window.innerHeight); 
	 	 renderer.setClearColor(0x000000, 0); 

	 	 containerRef.current.appendChild(renderer.domElement); 

	 	 // Create particles 
	 	 const positions: number[] = []; 
	 	 const colors: number[] = []; 

	 	 // Create geometry for all particles 
	 	 const geometry = new THREE.BufferGeometry(); 

	 	 for (let ix = 0; ix < AMOUNTX; ix++) { 
	 	 	 for (let iy = 0; iy < AMOUNTY; iy++) { 
	 	 	 	 const x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2; 
	 	 	 	 const y = 0; 
	 	 	 	 const z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2; 

	 	 	 	 positions.push(x, y, z); 
	 	 	 	 colors.push(0.5, 0.5, 0.5); // Fixed Grey
	 	 	 } 
	 	 } 

	 	 geometry.setAttribute( 
	 	 	 'position', 
	 	 	 new THREE.Float32BufferAttribute(positions, 3), 
	 	 ); 
	 	 geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3)); 

	 	 // Create material 
	 	 const material = new THREE.PointsMaterial({ 
	 	 	 size: 6.0, // Slightly larger dots
	 	 	 vertexColors: true, 
	 	 	 transparent: true, 
	 	 	 opacity: 0.8, 
	 	 	 sizeAttenuation: true, 
	 	 }); 

	 	 const points = new THREE.Points(geometry, material); 
	 	 scene.add(points); 

	 	 const clock = new THREE.Clock();
	 	 let animationId: number = 0; 

	 	 // Animation function 
	 	 const animate = () => { 
	 	 	 animationId = requestAnimationFrame(animate); 
			 const elapsedTime = clock.getElapsedTime();

	 	 	 const positionAttribute = geometry.attributes.position; 
	 	 	 const positionsArray = positionAttribute.array as Float32Array; 

	 	 	 for (let ix = 0; ix < AMOUNTX; ix++) { 
	 	 	 	 for (let iy = 0; iy < AMOUNTY; iy++) { 
	 	 	 	 	 const index = ix * AMOUNTY + iy;
					 
	 	 	 	 	 // More aggressive wave math
	 	 	 	 	 const xWave = Math.sin((ix * 0.3) + (elapsedTime * 1.5)) * 60;
	 	 	 	 	 const yWave = Math.sin((iy * 0.4) + (elapsedTime * 1.2)) * 60;
	 	 	 	 	 const interference = Math.sin((ix + iy) * 0.2 + (elapsedTime * 0.8)) * 40;
	 	 	 	 	 
	 	 	 	 	 positionsArray[index * 3 + 1] = xWave + yWave + interference; 
	 	 	 	 } 
	 	 	 } 

	 	 	 positionAttribute.needsUpdate = true; 
			 geometry.computeBoundingSphere(); // Ensure culling doesn't hide it

	 	 	 renderer.render(scene, camera); 
	 	 }; 

	 	 // Handle window resize 
	 	 const handleResize = () => { 
	 	 	 camera.aspect = window.innerWidth / window.innerHeight; 
	 	 	 camera.updateProjectionMatrix(); 
	 	 	 renderer.setSize(window.innerWidth, window.innerHeight); 
	 	 }; 

	 	 window.addEventListener('resize', handleResize); 

	 	 // Start animation 
	 	 animate(); 

	 	 // Store references 
	 	 sceneRef.current = { 
	 	 	 scene, 
	 	 	 camera, 
	 	 	 renderer, 
	 	 	 particles: [points], 
	 	 	 animationId, 
	 	 	 count: 0, 
	 	 }; 

	 	 // Cleanup function 
	 	 return () => { 
	 	 	 window.removeEventListener('resize', handleResize); 

	 	 	 if (sceneRef.current) { 
	 	 	 	 cancelAnimationFrame(sceneRef.current.animationId); 

	 	 	 	 // Clean up Three.js objects 
	 	 	 	 sceneRef.current.scene.traverse((object) => { 
	 	 	 	 	 if (object instanceof THREE.Points) { 
	 	 	 	 	 	 object.geometry.dispose(); 
	 	 	 	 	 	 if (Array.isArray(object.material)) { 
	 	 	 	 	 	 	 object.material.forEach((material) => material.dispose()); 
	 	 	 	 	 	 } else { 
	 	 	 	 	 	 	 object.material.dispose(); 
	 	 	 	 	 	 } 
	 	 	 	 	 } 
	 	 	 	 }); 

	 	 	 	 sceneRef.current.renderer.dispose(); 

	 	 	 	 if (containerRef.current && sceneRef.current.renderer.domElement) { 
	 	 	 	 	 containerRef.current.removeChild( 
	 	 	 	 	 	 sceneRef.current.renderer.domElement, 
	 	 	 	 	 ); 
	 	 	 	 } 
	 	 	 } 
	 	 }; 
	 }, []); 

	 return ( 
	 	 <div 
	 	 	 ref={containerRef} 
	 	 	 className={cn('pointer-events-none fixed inset-0', className)} 
	 	 	 style={{ zIndex: -1, ...props.style }}
	 	 	 {...props} 
	 	 /> 
	 ); 
 } 
