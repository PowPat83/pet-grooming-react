import React from 'react';
import CartColumns from '../components/CartColumns';
import styled from 'styled-components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBookingByUserId } from './bookingSlice';

function BookingPage() {
  const dispatch = useDispatch();

  const { listOfBookings } = useSelector(({ booking }) => booking);

  useEffect(() => {
    dispatch(getBookingByUserId());
  }, []);

  return (
    <></>
    // <Wrapper className='section section-center'>
    //   <CartColumns></CartColumns>
    // </Wrapper>
  );
}

const Wrapper = styled.section`
  .link-container {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
  }
  .link-btn {
    background: transparent;
    border-color: transparent;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
    background: var(--clr-primary-5);
    color: var(--clr-white);
    border-radius: var(--radius);
    letter-spacing: var(--spacing);
    font-weight: 400;
    cursor: pointer;
  }
  .clear-btn {
    background: var(--clr-black);
  }
`;

export default BookingPage;
