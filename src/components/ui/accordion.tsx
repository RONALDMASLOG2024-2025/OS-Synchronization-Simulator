'use client';

import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AccordionContextValue {
  value: string | string[];
  onValueChange: (value: string) => void;
  type: 'single' | 'multiple';
}

const AccordionContext = React.createContext<AccordionContextValue | undefined>(undefined);
const AccordionItemContext = React.createContext<string>('');

interface AccordionProps {
  children: React.ReactNode;
  type?: 'single' | 'multiple';
  defaultValue?: string | string[];
  className?: string;
}

export function Accordion({ 
  children, 
  type = 'single',
  defaultValue,
  className 
}: AccordionProps) {
  const [value, setValue] = React.useState<string | string[]>(
    defaultValue || (type === 'multiple' ? [] : '')
  );

  const handleValueChange = React.useCallback((itemValue: string) => {
    if (type === 'multiple') {
      const currentValue = Array.isArray(value) ? value : [];
      const newValue = currentValue.includes(itemValue)
        ? currentValue.filter(v => v !== itemValue)
        : [...currentValue, itemValue];
      setValue(newValue);
    } else {
      setValue(value === itemValue ? '' : itemValue);
    }
  }, [value, type]);

  return (
    <AccordionContext.Provider value={{ value, onValueChange: handleValueChange, type }}>
      <div className={cn('space-y-2', className)}>{children}</div>
    </AccordionContext.Provider>
  );
}

interface AccordionItemProps {
  children: React.ReactNode;
  value: string;
  className?: string;
}

export function AccordionItem({ children, value, className }: AccordionItemProps) {
  return (
    <AccordionItemContext.Provider value={value}>
      <div className={cn('border-2 rounded-lg overflow-hidden bg-card shadow-sm', className)}>
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

interface AccordionTriggerProps {
  children: React.ReactNode;
  className?: string;
}

export function AccordionTrigger({ children, className }: AccordionTriggerProps) {
  const context = React.useContext(AccordionContext);
  const itemValue = React.useContext(AccordionItemContext);
  
  if (!context) throw new Error('AccordionTrigger must be used within Accordion');

  const isOpen = context.type === 'multiple' 
    ? Array.isArray(context.value) && context.value.includes(itemValue)
    : context.value === itemValue;

  return (
    <button
      onClick={() => context.onValueChange(itemValue)}
      className={cn(
        'flex w-full items-center justify-between px-5 py-4 font-semibold text-left transition-all hover:bg-accent/50',
        isOpen && 'bg-accent/30',
        className
      )}
    >
      <span className="flex-1">{children}</span>
      <ChevronDown
        className={cn(
          'h-5 w-5 transition-transform duration-300 flex-shrink-0 ml-2',
          isOpen && 'rotate-180'
        )}
      />
    </button>
  );
}

interface AccordionContentProps {
  children: React.ReactNode;
  className?: string;
}

export function AccordionContent({ children, className }: AccordionContentProps) {
  const context = React.useContext(AccordionContext);
  const itemValue = React.useContext(AccordionItemContext);
  
  if (!context) throw new Error('AccordionContent must be used within Accordion');

  const isOpen = context.type === 'multiple'
    ? Array.isArray(context.value) && context.value.includes(itemValue)
    : context.value === itemValue;

  return (
    <div
      className={cn(
        'overflow-hidden transition-all duration-300',
        isOpen ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'
      )}
    >
      <div className={cn('px-5 pb-4 pt-2 text-sm border-t', className)}>{children}</div>
    </div>
  );
}

