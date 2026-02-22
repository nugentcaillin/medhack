"use client";

interface PhotoConfirmationProps {
  photos: string[];
  stepLabels: string[];
  onConfirm: () => void;
  onRetake: () => void;
}

export default function PhotoConfirmation({
  photos,
  stepLabels,
  onConfirm,
  onRetake,
}: PhotoConfirmationProps) {
  return (
    <div className="absolute inset-0 bg-black z-20 flex flex-col items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-white mb-2">
            Review Your Photos
          </h2>
          <p className="text-sm text-white/80">
            Please confirm all photos look correct
          </p>
        </div>

        {/* Photo grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {photos.map((photo, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-800 mb-2">
                <img
                  src={photo}
                  alt={stepLabels[index]}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs text-white/70 text-center">
                {stepLabels[index]}
              </p>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={onConfirm}
            className="w-full py-4 bg-white text-black rounded-full font-semibold text-lg active:scale-95 transition-transform"
          >
            Confirm Photos
          </button>
          <button
            onClick={onRetake}
            className="w-full py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold text-lg active:scale-95 transition-transform"
          >
            Retake Photos
          </button>
        </div>
      </div>
    </div>
  );
}
