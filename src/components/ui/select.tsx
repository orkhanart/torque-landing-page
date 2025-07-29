"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  name?: string;
  id?: string;
  required?: boolean;
  className?: string;
}

export function Select({
  options,
  value,
  onValueChange,
  placeholder = "Select an option",
  name,
  id,
  required,
  className,
}: SelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(value || "");
  const selectRef = React.useRef<HTMLDivElement>(null);

  const selectedOption = options.find(option => option.value === selectedValue);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    setSelectedValue(optionValue);
    onValueChange?.(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={cn("relative", className)} ref={selectRef}>
      {/* Hidden input for form submission */}
      <input
        type="hidden"
        name={name}
        value={selectedValue}
        required={required}
      />
      
      {/* Custom select trigger */}
      <button
        type="button"
        className={cn(
          "w-full h-10 px-3 rounded-md bg-transparent border border-gray-700 text-white",
          "flex items-center justify-between",
          "focus:outline-none focus:ring-2 focus:ring-primary transition-colors",
          "hover:border-gray-600",
          !selectedValue && "text-gray-400"
        )}
        onClick={() => setIsOpen(!isOpen)}
        id={id}
      >
        <span className="truncate">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown 
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            isOpen && "rotate-180"
          )} 
        />
      </button>

      {/* Dropdown options */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-gray-900 border border-gray-700 rounded-md shadow-lg">
          <div className="py-1 max-h-60 overflow-auto">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                className={cn(
                  "w-full px-3 py-2 text-left text-white hover:bg-gray-800 transition-colors",
                  "focus:outline-none focus:bg-gray-800",
                  selectedValue === option.value && "bg-gray-800 text-cyan-400"
                )}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}