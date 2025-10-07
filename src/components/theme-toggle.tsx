'use client';

import * as React from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import { Tooltip } from '@/components/ui/tooltip';

export function ThemeToggle() {
  const { theme, setTheme, mounted } = useTheme();

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  const getIcon = () => {
    if (theme === 'dark') {
      return <Moon className="w-5 h-5 transition-all" />;
    } else if (theme === 'light') {
      return <Sun className="w-5 h-5 transition-all" />;
    } else {
      return <Monitor className="w-5 h-5 transition-all" />;
    }
  };

  const getLabel = () => {
    if (theme === 'dark') return 'Dark Mode (Click for System)';
    if (theme === 'light') return 'Light Mode (Click for Dark)';
    return 'System Theme (Click for Light)';
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
        {getIcon()}
      </Button>
    </Tooltip>
  );
}
