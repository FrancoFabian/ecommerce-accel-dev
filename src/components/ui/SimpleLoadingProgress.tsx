'use client';

interface SimpleLoadingProgressProps {
  progress: number;
  isLoading: boolean;
  className?: string;
}

export const SimpleLoadingProgress: React.FC<SimpleLoadingProgressProps> = ({ 
  progress, 
  isLoading, 
  className = '' 
}) => {
  if (!isLoading) return null;

  return (
    <div className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 ${className}`}>
      <div className="bg-black bg-opacity-75 text-white px-4 py-2 rounded-lg">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          <span className="text-sm">
            Cargando... {Math.round(progress)}%
          </span>
        </div>
      </div>
    </div>
  );
}; 