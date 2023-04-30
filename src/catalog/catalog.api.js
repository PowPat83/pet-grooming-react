const PREFIX = 'http://localhost:8082/api/service';
const PREFIX_SALON = 'http://localhost:8082/api/salon';

// GET
export const GET_GROOMING_SERVICES = `${PREFIX}`;

// GET SINGLE BAG
export const GET_SINGLE_SERVICE = (serviceId) => `${PREFIX}/${serviceId}`;

// GET AVAILABLE TIME SLOT
export const GET_AVAILABLE_TIMESLOT = (petSalonId, scheduleDate) =>
  `${PREFIX_SALON}/getAvailableSlot?petSalonId=${petSalonId}&scheduleDate=${scheduleDate}`;
