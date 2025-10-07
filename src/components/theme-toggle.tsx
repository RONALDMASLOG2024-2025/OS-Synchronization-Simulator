'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import { Tooltip } from '@/components/ui/tooltip';

export function ThemeToggle() {
  const { theme, setTheme, mounted } = useTheme();

  const toggleTheme = () => {
    if (theme === 'light' || theme === 'system') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  const isDark = theme === 'dark';

  const getLabel = () => {
    return isDark ? 'Dark Mode (Click for Light)' : 'Light Mode (Click for Dark)';
  };

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="icon"
        disabled
        aria-label="Loading theme"
        className="w-10 h-10"
      >
        <Sun className="w-5 h-5 opacity-50" />
      </Button>
    );
  }

  return (
    <Tooltip content={getLabel()}>
      <Button
        variant="outline"
        size="icon"
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="w-10 h-10 transition-all hover:scale-110"
      >
        {isDark ? (
          <Moon className="w-5 h-5 transition-all" />
        ) : (
          <Sun className="w-5 h-5 transition-all" />
        )}
      </Button>
    </Tooltip>
  );
}
