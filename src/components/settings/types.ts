// ----------------------------------------------------------------------

export type SettingsValueProps = {
  themeStretch: boolean;
  themeMode: 'light' | 'dark';
  themeDirection: 'ltr';
  themeContrast: 'default' | 'bold';
  themeLayout: 'vertical' | 'mini';
  themeColorPresets: 'default' | 'cyan';
};

export type SettingsContextProps = SettingsValueProps & {
  // Update
  onUpdate: (name: string, value: string | boolean) => void;
  // Reset
  canReset: boolean;
  onReset: VoidFunction;
  // Drawer
  open: boolean;
  onToggle: VoidFunction;
  onClose: VoidFunction;
};
