import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

interface Service {
  title: string;
  description: string;
  icon: typeof MedicalServicesIcon;
}

export const services: Service[] = [
  {
    title: 'Primary Care',
    description: 'Comprehensive healthcare services for all your medical needs.',
    icon: MedicalServicesIcon,
  },
  // Add more services as needed
]; 