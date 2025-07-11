'use client';
import { m } from 'framer-motion';
// @mui
import { Theme, SxProps } from '@mui/material/styles';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Badge, { badgeClasses } from '@mui/material/Badge';
// components
import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';

// ----------------------------------------------------------------------

type Props = {
  sx?: SxProps<Theme>;
};

export default function SettingsButton({ sx }: Props) {
  const settings = useSettingsContext();

  const handleThemeToggle = () => {
    const newMode = settings.themeMode === 'light' ? 'dark' : 'light';
    settings.onUpdate('themeMode', newMode);
  };

  return (
    <Badge
      color="error"
      variant="dot"
      invisible={!settings.canReset}
      sx={{
        [`& .${badgeClasses.badge}`]: {
          top: 8,
          right: 8,
        },
        ...sx,
      }}
    >
      <Box>
        <IconButton aria-label="settings"
          onClick={handleThemeToggle}
          sx={{
            width: 40,
            height: 40,
          }}>
        <Iconify icon={settings.themeMode === 'light' ? 'solar:moon-bold' : 'solar:sun-bold'} width={24} />
    </IconButton>
      </Box>
    </Badge>
  );
}
