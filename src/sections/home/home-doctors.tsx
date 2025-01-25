// @mui
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
// components
import Image from 'src/components/image';
import Carousel, { CarouselArrowIndex, useCarousel } from 'src/components/carousel';
// data
import { doctors } from 'src/assets/data/doctors';
import CardHeader from '@mui/material/CardHeader';

import { CardMedia } from '@mui/material';


// ----------------------------------------------------------------------

export default function CarouselDoctors() {
  const carousel = useCarousel({
    fade: true,
    autoplay: true,
    initialSlide: 0,
  });

  return (
    
    <Card variant="outlined"  sx={{ textAlign: 'center', borderRadius:.9}}>
        {/* Carousel for Doctors */}
        <CardMedia>
      <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
        {doctors.map((doctor, index) => (
          <Stack key={index}>
            <Image alt={doctor.name} src={doctor.image} ratio="1/1" />
           
             
              <Typography variant="h5" noWrap gutterBottom>
                {doctor.name}
              </Typography>
              <Typography variant="body1">
                Specialty: {doctor.specialty}
              </Typography>
              
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Availability: {doctor.availability}
              </Typography>
          </Stack>
        ))}
      </Carousel>
      </CardMedia>
      <CarouselArrowIndex
        index={carousel.currentIndex}
        total={doctors.length}
        onNext={carousel.onNext}
        onPrev={carousel.onPrev}
        sx={{ bottom: 40 }}
      />
    </Card>
  );
}
