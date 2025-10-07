import * as React from "react"
import { cn } from "@/lib/utils"

export interface SliderProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'defaultValue'> {
  onValueChange?: (value: number[]) => void;
  defaultValue?: number[];
  value?: number[];
  min?: number;
  max?: number;
  step?: number;
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className, min = 0, max = 100, step = 1, value, defaultValue, onValueChange, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue?.[0] ?? value?.[0] ?? min);
    
    const currentValue = value?.[0] ?? internalValue;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = Number(e.target.value);
      setInternalValue(newValue);
      if (onValueChange) {
        onValueChange([newValue]);
      }
    };

    return (
      <div className={cn("relative flex w-full touch-none select-none items-center", className)}>
        <input
          type="range"
          ref={ref}
          min={min}
          max={max}
          step={step}
          value={currentValue}
          onChange={handleChange}
          className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer slider-thumb"
          {...props}
        />
        <style jsx>{`
          .slider-thumb::-webkit-slider-thumb {
            appearance: none;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background: hsl(var(--primary));
            cursor: pointer;
            border: 2px solid white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          }
          .slider-thumb::-moz-range-thumb {
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background: hsl(var(--primary));
            cursor: pointer;
            border: 2px solid white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          }
        `}</style>
      </div>
    )
  }
)
Slider.displayName = "Slider"

export { Slider }
