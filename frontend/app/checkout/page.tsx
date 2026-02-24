'use client'
import { Card, CardDescription, CardHeader, CardTitle   } from "@/components/ui/card"
import "./checkoutStyle.css"
import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/Addons.js"
import { useEffect, useRef, useState } from "react"  
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"




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
        
        const aspect = 2;

        camera.zoom = 2;
        
        camera.position.z = 5;
        
        //const geometry = new THREE.BoxGeometry(1, 1, 1);
        //const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        //const cube = new THREE.Mesh(geometry, material);
        //scene.add(cube);

        const loader = new GLTFLoader()
        loader.load('./test.glb', function(gltf) {
            const obj = gltf.scene
            scene.add(obj);
        
            const renderScene = () => {
                obj.rotation.x += 0.003;
                obj.rotation.y += 0.01;
                camera.aspect = aspect;
                camera.updateProjectionMatrix()

                let parentWidth = renderer.domElement.parentElement?.clientWidth || 100;
                let height = parentWidth / aspect;

                renderer.render(scene, camera);
                renderer.setSize(parentWidth, height);
                requestAnimationFrame(renderScene);
            };

            renderScene();
        
        
        
        
        
        
        }, undefined, function(error) {
            console.log(error);
        }) 

        renderer.render(scene, camera);


        

    }}, []);
    
    return (
        <Card ref={containerRef} className="soleDisplayCardWrapper">
            <CardHeader>
                <CardTitle>Sole Model</CardTitle>
                <CardDescription></CardDescription>
            </CardHeader>
        </Card>
    )
}


export default function Home() {

    const [extraHeight, setExtraHeight] = useState([0]);

  return (

    <div className="checkoutPageWrapper">
        <SoleModelDisplayer />
        <FieldGroup>
            <FieldSet>
                <FieldLegend>Item information</FieldLegend>
                <FieldDescription>Options to customize your order</FieldDescription>
                <Field>
                    <FieldLabel>Shoe Size</FieldLabel>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Choose Shoe Size" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="w5">Women's size 5</SelectItem>
                                <SelectItem value="m5">Men's size 5</SelectItem>
                                <SelectItem value="w6">Women's size 6</SelectItem>
                                <SelectItem value="m6">Men's size 6</SelectItem>
                                <SelectItem value="w7">Women's size 7</SelectItem>
                                <SelectItem value="m7">Men's size 7</SelectItem>
                                <SelectItem value="w8">Women's size 8</SelectItem>
                                <SelectItem value="m8">Men's size 8</SelectItem>
                                <SelectItem value="w9">Women's size 9</SelectItem>
                                <SelectItem value="m9">Men's size 9</SelectItem>
                                <SelectItem value="w10">Women's size 10</SelectItem>
                                <SelectItem value="m10">Men's size 10</SelectItem>
                                <SelectItem value="w11">Women's size 11</SelectItem>
                                <SelectItem value="m11">Men's size 11</SelectItem>
                                <SelectItem value="w12">Women's size 12</SelectItem>
                                <SelectItem value="m12">Men's size 12</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </Field>
                <Field>
                    <FieldLabel>Additional Height</FieldLabel>
                    <FieldDescription>Set additional height preferences (0in - 3in)</FieldDescription>
                    <FieldContent>{extraHeight} in</FieldContent>
                    <Slider
                        value={extraHeight}
                        onValueChange={(height) => setExtraHeight(height)}
                        max={3}
                        step={0.5}
                    >

                    </Slider>
                </Field>
            </FieldSet>
            <FieldSeparator />
            <FieldSet>
                <FieldLegend>Address Information</FieldLegend>
                <FieldDescription>Location to deliver your order to</FieldDescription>
                <Field>
                    <FieldLabel>Street Address</FieldLabel>
                    <Input id="street" type="text" placeholder="123 Street St" />
                </Field>
                <div className="cityPostcodeWrapper">
                    <Field>
                        <FieldLabel>City</FieldLabel>
                        <Input id="city" type="text" placeholder="Melbourne" />
                    </Field>
                    <Field>
                        <FieldLabel>Postcode</FieldLabel>
                        <Input id="postcode" type="text" placeholder="3000" />
                    </Field>
                </div>
            </FieldSet>
            <Button>Submit</Button>
        </FieldGroup>
    </div>
  )
}