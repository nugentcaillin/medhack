"use client";

import { useState } from "react";
import FootCamera from "./FootCamera";
import PhotoConfirmation from "./PhotoConfirmation";

const STEPS = [
  {
    label: "Right foot bottom",
    svg: "/foot-outline.svg",
    flip: false,
  },
  {
    label: "Right foot side",
    svg: "/foot-outline-side.svg",
    flip: false,
  },
  {
    label: "Left foot side",
    svg: "/foot-outline-side.svg",
    flip: true,
  },
  {
    label: "Left foot bottom",
    svg: "/foot-outline.svg",
    flip: true,
  },
];

export default function PhotoCapture() {
  const [state, setState] = useState<"capture" | "confirm">("capture");
  const [capturedPhotos, setCapturedPhotos] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  const handlePhotoCapture = (photo: string) => {
    const newPhotos = [...capturedPhotos, photo];
    setCapturedPhotos(newPhotos);

    // If all photos are captured, move to confirm state
    if (newPhotos.length === STEPS.length) {
      setTimeout(() => {
        setState("confirm");
      }, 300);
    } else {
      // Move to next step
      setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 300);
    }
  };

  const handleConfirm = () => {
    // TODO: Handle photo confirmation (e.g., upload to server)
    console.log("Photos confirmed:", capturedPhotos);
    // You can add your confirmation logic here
  };

  const handleRetake = () => {
    // Reset to start over
    setCapturedPhotos([]);
    setCurrentStep(0);
    setState("capture");
  };

  if (state === "confirm") {
    return (
      <PhotoConfirmation
        photos={capturedPhotos}
        stepLabels={STEPS.map((step) => step.label)}
        onConfirm={handleConfirm}
        onRetake={handleRetake}
      />
    );
  }

  return (
    <FootCamera
      steps={STEPS}
      currentStep={currentStep}
      onPhotoCapture={handlePhotoCapture}
    />
  );
}
