const PREFIX = 'http://localhost:8083/api/bookings';

// GET BOOKING BY BOOKING USER ID
export const GET_BOOKING_SERVICES_BY_USERID = (userId) =>
  `${PREFIX}/getBookingByUser?userId=${userId}`;
