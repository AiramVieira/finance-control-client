import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  className = "",
  ...props
}) => {
  return (
    <div>
      {label && (
        <label className="block text-white/80 text-sm font-medium mb-2">
          {label}
        </label>
      )}
      <input
        {...props}
        className={`
          w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg 
          text-white placeholder-white/60 focus:outline-none focus:ring-2 
          focus:ring-blue-400 transition-all duration-200
          ${error ? "border-red-400/50 focus:ring-red-400" : ""}
          ${className}
        `.trim()}
      />
      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Input;
