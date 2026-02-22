"use client";
import { useEffect, useRef, useState } from "react";

interface Step {
  label: string;
  svg: string;
  flip: boolean;
}

interface FootCameraProps {
  steps: Step[];
  currentStep: number;
  onPhotoCapture: (photo: string) => void;
}

export default function FootCamera({
  steps,
  currentStep,
  onPhotoCapture,
}: FootCameraProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFlashing, setIsFlashing] = useState(false);

  useEffect(() => {
    let mediaStream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Check if mediaDevices is available
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          // Check if we're on HTTPS or localhost
          const isSecureContext =
            window.isSecureContext ||
            location.protocol === "https:" ||
            location.hostname === "localhost" ||
            location.hostname === "127.0.0.1";

          if (!isSecureContext) {
            const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
            if (isIOS) {
              setError(
                "Camera access requires HTTPS on iOS. Please access this app via HTTPS or use localhost. If testing locally, try accessing via 'localhost' instead of your network IP."
              );
            } else {
              setError(
                "Camera access requires a secure connection (HTTPS). Please access this app over HTTPS or use localhost."
              );
            }
          } else {
            setError(
              "Camera API not available. Please use a modern browser that supports camera access."
            );
          }
          setIsLoading(false);
          return;
        }

        // Request camera access with constraints for mobile devices
        mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "environment", // Use back camera on mobile
            width: { ideal: 1920 },
            height: { ideal: 1080 },
          },
        });

        setStream(mediaStream);

        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          await videoRef.current.play();
        }
      } catch (err) {
        if (err instanceof Error) {
          if (err.name === "NotAllowedError") {
            setError("Camera permission denied. Please allow camera access.");
          } else if (err.name === "NotFoundError") {
            setError("No camera found on this device.");
          } else if (err.name === "NotReadableError") {
            setError("Camera is already in use by another application.");
          } else {
            setError(`Camera error: ${err.message}`);
          }
        } else {
          setError("Failed to access camera. Please try again.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    startCamera();

    // Cleanup function
    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    // Trigger flash animation
    setIsFlashing(true);
    
    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw the current video frame to canvas
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Convert canvas to data URL and save to state
      const photoDataUrl = canvas.toDataURL("image/jpeg", 0.9);
      
      // Call parent callback with the captured photo
      onPhotoCapture(photoDataUrl);
    }
    
    // Hide flash after animation
    setTimeout(() => {
      setIsFlashing(false);
    }, 150);
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Video element */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Loading state */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
          <div className="text-white text-lg">Loading camera...</div>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
          <div className="text-white text-center px-4">
            <p className="text-lg mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-white text-black rounded-full font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Flash animation overlay */}
      {isFlashing && (
        <div className="absolute inset-0 bg-white z-30 animate-flash" />
      )}

      {/* Instructions overlay */}
      {!error && !isLoading && currentStep < steps.length && (
        <div className="absolute top-0 left-0 right-0 z-10 flex flex-col items-center justify-center p-4">
          <div className="bg-black/60 backdrop-blur-sm rounded-2xl px-6 p-4 mx-auto max-w-sm">
            <p className="text-white text-center text-xs opacity-75 mt-1">
              Position your foot within the outline
            </p>
          </div>

          <img
            src={steps[currentStep].svg}
            alt={`${steps[currentStep].label} guide`}
            className="h-full max-h-[500px] opacity-80"
            style={{
              filter: "brightness(0) invert(1)",
              transform: steps[currentStep].flip ? "scaleX(-1)" : "none",
            }}
          />

          <button
            onClick={capturePhoto}
            className="w-20 h-20 rounded-full bg-white border-4 border-white shadow-lg active:scale-95 transition-transform"
            aria-label="Capture photo"
          >
            <div className="w-full h-full rounded-full bg-white border-2 border-gray-300"></div>
          </button>
        </div>
      )}

      {/* Hidden canvas for capturing photos */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
