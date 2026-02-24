'use client'
import { Card, CardDescription, CardHeader, CardTitle   } from "@/components/ui/card"
import "./checkoutStyle.css"
import * as THREE from "three"
import { useEffect, useRef } from "react"  




function CheckoutWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <div className="checkoutWrapper">
            {children}
        </div>
    )
}


function SoleModelDisplayer() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
    if (typeof window !== 'undefined') {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        containerRef.current?.appendChild(renderer.domElement);
        
        camera.position.z = 5;
        
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        const aspect = 2;
        scene.add(cube);

        renderer.render(scene, camera);


        const renderScene = () => {
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            camera.aspect = aspect;
            camera.updateProjectionMatrix()

            let parentWidth = renderer.domElement.parentElement?.clientWidth || 100;
            let height = parentWidth / aspect;

            renderer.render(scene, camera);
            renderer.setSize(parentWidth, height);
            requestAnimationFrame(renderScene);
        };

        renderScene();

    }}, []);

    

            //<div className="canvasStyle" ref={containerRef} />
    
    return (
        <Card ref={containerRef}>
            <CardHeader>
                <CardTitle>Sole Model</CardTitle>
                <CardDescription></CardDescription>
            </CardHeader>
        </Card>
    )
}


export default function Home() {
  return (
    <CheckoutWrapper>
        <SoleModelDisplayer />
    </CheckoutWrapper>
  )
}