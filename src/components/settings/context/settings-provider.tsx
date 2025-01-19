'use client';

import isEqual from 'lodash/isEqual';
import { useMemo, useCallback } from 'react';
// hooks
import { useLocalStorage } from 'src/hooks/use-local-storage';
// utils
import { SettingsValueProps } from '../types';
import { SettingsContext } from './settings-context';

// ----------------------------------------------------------------------

type SettingsProviderProps = {
  children: React.ReactNode;
  defaultSettings: SettingsValueProps;
};

export function SettingsProvider({ children, defaultSettings }: SettingsProviderProps) {
  const [settings, setSettings] = useLocalStorage('settings', defaultSettings);
  const onUpdate = useCallback(
    (name: string, value: string | boolean) => {
      setSettings((prevState: SettingsValueProps) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [setSettings]
  );

  const onReset = useCallback(() => {
    setSettings(defaultSettings);
  }, [defaultSettings, setSettings]);
  const canReset = !isEqual(settings, defaultSettings);

  const memoizedValue = useMemo(
    () => ({
      ...settings,
      onUpdate,
      canReset,
      onReset,
    }),
    [
      onReset,
      onUpdate,
      settings,
      canReset,
    ]
  );

  return <SettingsContext.Provider value={memoizedValue}>{children}</SettingsContext.Provider>;
}
