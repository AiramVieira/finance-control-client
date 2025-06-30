import React from "react";
import { useLoading } from "../contexts/LoadingContext";

export const LoadingSpinner: React.FC = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
          <div
            className="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-green-400 rounded-full animate-spin"
            style={{ animationDelay: "-0.5s" }}
          ></div>
        </div>
        <p className="text-white font-medium">Carregando...</p>
      </div>
    </div>
  );
};
