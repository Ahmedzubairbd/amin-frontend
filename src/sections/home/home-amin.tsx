'use client';
import { m } from 'framer-motion';
// @mui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ComponentBlock from '../../components/component-block/component-block';
import { MotionViewport, varFade } from 'src/components/animate';
import OrganizationalChart from 'src/components/organizational-chart/organizational-chart';

export default function HomeAmin() {
  const theme = useTheme();
  return (
   
  

       
            <Container sx={{ my: 10 }}>
            <Stack spacing={5}>
            <ComponentBlock title="Amin Diagnostcis & Medical Services" sx={{ overflow: 'auto' }}>
            <OrganizationalChart data={DATA} variant="group" lineHeight="40px" />
              </ComponentBlock>
            </Stack>
              </Container> 
       
      
   
   
  );
}

const createData = (
  name: string,
  group: string,
  role: string | null,
  avatarUrl: string | null
) => ({
  name,
  group,
  role,
  avatarUrl,
});


const DATA = {
  ...createData('Kushtia Branch', 'root', 'Central', null),
  children: [
    {
      // Doctor Appointment Section
      ...createData('Doctor Appointment', 'development', null, null),
      children: [
        {
          ...createData('Pediatrician', 'development', 'lead specialist', null),
          children: [
            {
              ...createData('Dentist', 'development', 'senior specialist', null),
              children: [
                {
                  ...createData(
                    'Cardiologist',
                    'development',
                    'cardiac expert',
                    null
                  ),
                  children: [
                    {
                      ...createData(
                        'Dermatologist',
                        'development',
                        'skin specialist',
                        null
                      ),
                      children: null,
                    },
                  ],
                },
                {
                  ...createData('Orthopedics', 'development', 'bone & joint specialist', null),
                  children: null,
                },
              ],
            },
          ],
        },
        {
          ...createData('Neurologist', 'development', 'brain specialist', null),
          children: [
            {
              ...createData('Psychiatrist', 'development', 'mental health expert', null),
              children: null,
            },
          ],
        },
      ],
    },
    {
      // Medical Tests Section
      ...createData('Medical Tests', 'testing', null, null),
      children: [
        {
          ...createData('Pathology', 'testing', 'lab tests', null),
          children: [
            {
              ...createData('Blood Test', 'testing', 'diagnostic', null),
              children: null,
            },
            {
              ...createData('Urine Test', 'testing', 'diagnostic', null),
              children: null,
            },
          ],
        },
        {
          ...createData('Radiology', 'testing', 'imaging tests', null),
          children: [
            {
              ...createData('X-Ray', 'testing', 'imaging', null),
              children: null,
            },
            {
              ...createData('MRI', 'testing', 'advanced imaging', null),
              children: null,
            },
            {
              ...createData('CT Scan', 'testing', 'detailed imaging', null),
              children: null,
            },
          ],
        },
      ],
    },
  ],
};

