// components/theme-provider.tsx

'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useEffect, useState } from 'react';
import { type ThemeProviderProps } from 'next-themes/dist/types';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false);

  // Ensure that the theme is only applied on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  // If the component hasn't mounted yet, don't render the children to avoid hydration issues
  if (!mounted) {
    return <div />;
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
