import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../utils/helpers';

function IndividualBagListing({ service }) {
  const navigate = useNavigate();
  const handleServicePage = (serviceId) => {
    navigate(`/service/${serviceId}`);
  };
  return (
    <Card sx={{ maxWidth: '20%', margin: '10px 10px 10px 10px' }}>
      <CardActionArea onClick={() => handleServicePage(service.serviceId)}>
        <CardMedia
          component='img'
          image={service.serviceImage[0]}
          alt='green iguana'
        />
        <CardContent>
          {/* TODO: improve styling later */}
          <Typography gutterBottom sx={{ fontWeight: 'bold' }}>
            {service.petSalonName}
          </Typography>
          <Typography color='text.secondary'>
            {service.serviceDescription}
          </Typography>
          <Typography color='text.secondary' sx={{ fontWeight: 'bold' }}>
            {formatPrice(service.servicePrice)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default IndividualBagListing;
