'use client';

import { Card } from '@mui/material';
// @mui
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
// _mock
import { _mapContact } from 'src/_mock';

import { Button } from "@mui/base";
import { services } from './services-data';

// ----------------------------------------------------------------------

export default function ServicesView() {
  return (
    <>
      <Container sx={{ py: 10 }}>
        <Box
          gap={10}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
          }}
        >
          <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">
          Our Medical Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card 
              key={service.title} 
              className="p-6 hover:shadow-lg transition-all duration-300 backdrop-blur-sm"
              sx={{ background: 'transparent' }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="mb-4">{service.description}</p>
                <Button className="bg-green-300">Learn More</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
        </Box>
      </Container>
    </>
  );
}
