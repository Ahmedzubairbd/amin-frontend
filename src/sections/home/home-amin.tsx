import { m } from 'framer-motion';
// @mui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { _mock } from 'src/_mock';
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
  ...createData('Kushtia Branch', 'root', 'Central', _mock.image.avatar(1)),
  children: [
    {
      // Doctor Appointment Section
      ...createData('Doctor Appointment', 'development', null, null),
      children: [
        {
          ...createData('Pediatrician', 'development', 'lead specialist', _mock.image.avatar(2)),
          children: [
            {
              ...createData('Dentist', 'development', 'senior specialist', _mock.image.avatar(3)),
              children: [
                {
                  ...createData(
                    'Cardiologist',
                    'development',
                    'cardiac expert',
                    _mock.image.avatar(4)
                  ),
                  children: [
                    {
                      ...createData(
                        'Dermatologist',
                        'development',
                        'skin specialist',
                        _mock.image.avatar(5)
                      ),
                      children: null,
                    },
                  ],
                },
                {
                  ...createData('Orthopedics', 'development', 'bone & joint specialist', _mock.image.avatar(6)),
                  children: null,
                },
              ],
            },
          ],
        },
        {
          ...createData('Neurologist', 'development', 'brain specialist', _mock.image.avatar(7)),
          children: [
            {
              ...createData('Psychiatrist', 'development', 'mental health expert', _mock.image.avatar(8)),
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
          ...createData('Pathology', 'testing', 'lab tests', _mock.image.avatar(9)),
          children: [
            {
              ...createData('Blood Test', 'testing', 'diagnostic', _mock.image.avatar(10)),
              children: null,
            },
            {
              ...createData('Urine Test', 'testing', 'diagnostic', _mock.image.avatar(11)),
              children: null,
            },
          ],
        },
        {
          ...createData('Radiology', 'testing', 'imaging tests', _mock.image.avatar(12)),
          children: [
            {
              ...createData('X-Ray', 'testing', 'imaging', _mock.image.avatar(13)),
              children: null,
            },
            {
              ...createData('MRI', 'testing', 'advanced imaging', _mock.image.avatar(14)),
              children: null,
            },
            {
              ...createData('CT Scan', 'testing', 'detailed imaging', _mock.image.avatar(15)),
              children: null,
            },
          ],
        },
      ],
    },
  ],
};

