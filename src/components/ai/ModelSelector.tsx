"use client";

import * as React from "react";
import { ChevronDown, Clock, Image, Video, Box } from "lucide-react";
import { cn } from "@/lib/utils";
import { ModelConfig, getModelsByType } from "@/lib/fal/models";
import { GenerationType } from "@/lib/fal/types";

interface ModelSelectorProps {
  type: GenerationType;
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
}

const typeIcons = {
  image: Image,
  video: Video,
  "3d": Box,
};

export function ModelSelector({
  type,
  value,
  onValueChange,
  className,
}: ModelSelectorProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const selectorRef = React.useRef<HTMLDivElement>(null);

  const models = getModelsByType(type);
  const selectedModel = models.find((m) => m.id === value);
  const TypeIcon = typeIcons[type];

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectorRef.current && !selectorRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto-select first model if none selected
  React.useEffect(() => {
    if (!value && models.length > 0) {
      onValueChange(models[0].id);
    }
  }, [value, models, onValueChange]);

  return (
    <div className={cn("relative", className)} ref={selectorRef}>
      <button
        type="button"
        className={cn(
          "w-full px-4 py-3 rounded-lg bg-[#1a1a2e] border border-[#333] text-white",
          "flex items-center justify-between gap-3",
          "focus:outline-none focus:ring-2 focus:ring-primary transition-all",
          "hover:border-primary/50"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <TypeIcon className="h-5 w-5 text-primary shrink-0" />
          <div className="text-left min-w-0 flex-1">
            <div className="font-medium truncate">
              {selectedModel?.name || "Select a model"}
            </div>
            {selectedModel && (
              <div className="text-xs text-gray-400 truncate">
                {selectedModel.description}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {selectedModel && (
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {selectedModel.estimatedTime}
            </span>
          )}
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform duration-200 text-gray-400",
              isOpen && "rotate-180"
            )}
          />
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-[#1a1a2e] border border-[#333] rounded-lg shadow-xl overflow-hidden">
          <div className="py-1 max-h-80 overflow-auto">
            {models.map((model) => (
              <ModelOption
                key={model.id}
                model={model}
                isSelected={value === model.id}
                onSelect={() => {
                  onValueChange(model.id);
                  setIsOpen(false);
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

interface ModelOptionProps {
  model: ModelConfig;
  isSelected: boolean;
  onSelect: () => void;
}

function ModelOption({ model, isSelected, onSelect }: ModelOptionProps) {
  return (
    <button
      type="button"
      className={cn(
        "w-full px-4 py-3 text-left transition-colors",
        "focus:outline-none",
        isSelected
          ? "bg-primary/20 text-primary"
          : "text-white hover:bg-[#252540]"
      )}
      onClick={onSelect}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <div className="font-medium">{model.name}</div>
          <div className="text-xs text-gray-400 mt-0.5">
            {model.description}
          </div>
        </div>
        <div className="flex items-center gap-2 ml-3 shrink-0">
          <span className="text-xs text-gray-500 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {model.estimatedTime}
          </span>
          {model.inputType === "image" && (
            <span className="text-xs bg-[#333] px-2 py-0.5 rounded">
              needs image
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
