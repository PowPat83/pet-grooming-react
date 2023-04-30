import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import {
  getSingleService,
  getAvailableTimeslot,
  updateAvailableTimeslot,
} from './catalogSlice';
import ProductImages from '../components/ProductImages';
import PageHero from '../components/PageHero';
import styled from 'styled-components';
import { formatPrice } from '../utils/helpers';
import Button from '@mui/material/Button';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { Stack } from '@mui/material';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import PaymentInfoRequest from '../models/PaymentInfoRequest.ts';
import Container from '@mui/material/Container';

function SingleServicePage() {
  const dispatch = useDispatch();
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const { service, availableTimeslot } = useSelector(({ catalog }) => catalog);
  const [isSelected, setIsSelected] = useState('');
  // Stripe stuffs
  const [paymentSucceeded, setPaymentSucceed] = useState(false);
  const [processing, setProcessing] = useState('');
  // true = disabled
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [error, setError] = useState(null);
  const [httpError, setHttpError] = useState(false);
  const today = dayjs();
  const [serviceDate, setServiceDate] = useState(dayjs());
  const elements = useElements();
  const stripe = useStripe();
  // const classes = useStyles();

  const {
    userID: loggedInUser,
    isSuccess,
    role,
    // use useSelector((state) => state.login)
  } = useSelector(({ login }) => login);

  const selectedTimeslot = (index, availableTimeslot) => {
    setIsSelected(index);
    console.log('time slot ' + availableTimeslot);
  };

  const cardStyle = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#32325d',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };

  if (httpError) {
    return (
      <Container fixed>
        <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} />
        <p>{httpError}</p>
      </Container>
    );
  }

  const handleChange = async (event) => {
    // if empty it will be disabled, oncen not empty it will be enabled
    if (isSelected != '') {
      setSubmitDisabled(event.empty);
    }
    setError(event.error ? event.error.message : '');
  };

  async function checkout(ev) {
    // to prevent if user enter the wrong details and didn't get through, it shouldn't refresh
    ev.preventDefault();
    setProcessing(true);
    if (!stripe || !elements || !elements.getElement(CardElement)) {
      return;
    }

    setSubmitDisabled(true);

    let paymentInfo = new PaymentInfoRequest(
      Math.round(service.servicePrice * 100),
      'SGD'
    );
    console.log('payment info' + paymentInfo);
    const url = `${process.env.REACT_APP_PAYMENT_API}/api/payment/payment-intent`;
    // Need to input authorization header
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentInfo),
    };
    const stripeResponse = await fetch(url, requestOptions);
    if (!stripeResponse.ok) {
      // error handling here
      setHttpError(true);
      setSubmitDisabled(false);
      throw new Error('Something went wrong!');
    }

    const stripeResponseJson = await stripeResponse.json();
    // exclamation mean it assert not null
    stripe
      .confirmCardPayment(
        stripeResponseJson.client_secret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              // temporary hardcode email first
              email: loggedInUser,
            },
            // be calling complete payment endpoint
          },
        },
        { handleActions: false }
      )
      .then(async function (result) {
        if (result.error) {
          // error  handling
          setSubmitDisabled(false);
          setProcessing(false);
          setError(`Payment failed ${result.error.message}`);
        } else {
          //   const url = `${process.env.REACT_APP_PAYMENT_API}/api/payment/payment-complete`;
          //   const requestOptions = {
          //     method: 'PUT',
          //     headers: {
          //       'Content-Type': 'application/json',
          //     },
          //   };
          //   const stripeResponse = await fetch(url, requestOptions);
          //   if (!stripeResponse.ok) {
          //     // error handling
          //     throw new Error('Something went wrong!');
          //   }
          // handle here when payment completes
          setError(null);
          setProcessing(false);
          setPaymentSucceed(true);

          setTimeout(() => {
            navigate('/booking');
          }, 4000);
        }
        setSubmitDisabled(false);
      });
    setHttpError(false);
  }

  const handleDateSelection = (newValue) => {
    setServiceDate(newValue);
    // it will dispatch first before setting the serviceDate to the state
    dispatch(getAvailableTimeslot(newValue.format('YYYY-MM-DD')));
  };

  useEffect(() => {
    dispatch(getSingleService(serviceId));
    dispatch(updateAvailableTimeslot());
  }, [dispatch, serviceId, serviceDate]);

  useEffect(() => {
    if (isSelected != '') {
      setSubmitDisabled(false);
    }
  }, [isSelected]);

  //   useEffect(() => {
  //     dispatch(getAvailableTimeslot(serviceDate.format('YYYY-MM-DD')));
  //   }, [dispatch, availableTimeslot]);
  return (
    <Wrapper>
      {/* <PageHero title={service.serviceName} product /> */}
      <div className='section section-center page'>
        <div className='product-center'>
          <ProductImages images={service.serviceImage} />
          <section className='content'>
            {paymentSucceeded &&
              alert(
                'Thank you. Your payment is successful. Redirecting to your booking page.'
              )}
            ;<h2>{service.serviceName}</h2>
            <h5 className='price'>{formatPrice(service.servicePrice)}</h5>
            <p className='description'>{service.serviceDescription}</p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label='Service Date'
                inputFormat='DD/MM/YYYY'
                value={serviceDate}
                onChange={handleDateSelection}
                minDate={today}
              />
            </LocalizationProvider>
            <br />
            <br />
            <h4>Available Time Slot</h4>
            <Stack spacing={1} direction='row'>
              {availableTimeslot != null ? (
                availableTimeslot.map((availableTimeslot, index) => (
                  <Button
                    key={index}
                    variant='contained'
                    // onClick={() => setIsSelected(index)}
                    onClick={() => selectedTimeslot(index, availableTimeslot)}
                    className={`${index === isSelected ? 'active' : null}`}
                  >
                    {availableTimeslot}
                  </Button>
                ))
              ) : (
                <h4>No available time slot</h4>
              )}
            </Stack>
            <br />
            <hr />
            <br />
            <CardElement
              id='card-element'
              options={cardStyle}
              onChange={handleChange}
            />
            {error && (
              <div className='card-error' role='alert'>
                {error}
              </div>
            )}
            {/* Show a success message upon completion */}
            <p
              className={
                paymentSucceeded ? 'result-message' : 'result-message hidden'
              }
            >
              Payment succeeded, see the result in your
              <a href={'https://dashboard.stripe.com/test/payments'}>
                Stripe dashboard.
              </a>
            </p>
            {loggedInUser ? (
              <Button
                variant='outlined'
                sx={{ mt: 2 }}
                onClick={checkout}
                disabled={submitDisabled || paymentSucceeded || processing}
              >
                <span>
                  {processing ? (
                    <Box sx={{ display: 'flex' }}>
                      <CircularProgress />
                    </Box>
                  ) : (
                    'Proceed to Pay'
                  )}
                </span>
              </Button>
            ) : (
              <Link to='/login'>
                <Button variant='outlined' sx={{ mt: 2 }}>
                  Login
                </Button>
              </Link>
            )}
          </section>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }
  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
  .active {
    color: black;
    border: 2px solid palevioletred;
    background: papayawhip;
  }

  form {
    width: 30vw;
    align-self: center;
    box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
      0px 2px 5px 0px rgba(50, 50, 93, 0.1),
      0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
    border-radius: 7px;
    padding: 40px;
  }
  .result-message {
    line-height: 22px;
    font-size: 16px;
  }
  .result-message a {
    color: rgb(89, 111, 214);
    font-weight: 600;
    text-decoration: none;
  }
  .hidden {
    display: none;
  }
  #card-error {
    color: rgb(105, 115, 134);
    font-size: 16px;
    line-height: 20px;
    margin-top: 12px;
    text-align: center;
  }
  #card-element {
    border-radius: 4px 4px 0 0;
    padding: 12px;
    border: 1px solid rgba(50, 50, 93, 0.1);
    max-height: 44px;
    width: 100%;
    background: white;
    box-sizing: border-box;
  }
  #payment-request-button {
    margin-bottom: 32px;
  }
  @keyframes loading {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @media only screen and (max-width: 600px) {
    form {
      width: 80vw;
    }
  }
`;

export default SingleServicePage;
