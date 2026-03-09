import { ReactNode, useCallback } from "react";

interface CustomToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  description?: string;
  icon?: ReactNode;
  className?: string;
}

export default function CustomToggle({
  label,
  checked,
  onChange,
  disabled = false,
  description,
  icon,
  className = "",
}: CustomToggleProps) {
  const handleToggle = useCallback(() => {
    if (!disabled) onChange(!checked);
  }, [checked, disabled, onChange]);

  return (
    <div
      className={`flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 ${className}`}
    >
      <div className="flex items-start gap-2">
        {icon && <span className="mt-0.5 text-slate-300">{icon}</span>}

        <div>
          <span className="block text-sm font-semibold text-slate-200">
            {label}
          </span>

          {description && (
            <span className="block text-xs text-slate-400 mt-0.5">
              {description}
            </span>
          )}
        </div>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={handleToggle}
        className={`relative flex items-center h-7 w-12 rounded-full transition-colors duration-300
        ${checked ? "bg-red-500" : "bg-gray-500"}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        `}
      >
        <span
          className={`absolute left-1 h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-300
          ${checked ? "translate-x-5" : "translate-x-0"}
          `}
        />
      </button>
    </div>
  );
}