import React, { type ChangeEvent, type FC } from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onChange"> {
  label?: string;
  options: SelectOption[];
  error?: string;
  onChange?: (value: string) => void;
}

const Select: FC<SelectProps> = ({
  label,
  options,
  error,
  onChange,
  className = "",
  ...props
}) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div>
      {label && (
        <label className="block text-white/80 text-sm font-medium mb-2">
          {label}
        </label>
      )}
      <select
        {...props}
        onChange={handleChange}
        className={`
          w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg 
          text-white focus:outline-none focus:ring-2 focus:ring-blue-400 
          transition-all duration-200
          ${error ? "border-red-400/50 focus:ring-red-400" : ""}
          ${className}
        `.trim()}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="bg-slate-800"
          >
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Select;
