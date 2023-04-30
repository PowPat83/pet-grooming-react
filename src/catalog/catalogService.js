import React from 'react';
import axios from 'axios';
import {
  GET_GROOMING_SERVICES,
  GET_SINGLE_SERVICE,
  GET_AVAILABLE_TIMESLOT,
} from './catalog.api';

const getAllGroomingServices = async (pageSize, pageNumber, searchTerm) => {
  // if we decide to use token
  // const config = {
  //     headers: {
  //         Authorization: `Bearer ${token}`
  //     },
  // }

  const PREFIX = GET_GROOMING_SERVICES;

  const url = `${PREFIX}/search?page=${pageNumber}&size=${pageSize}`;

  const response = await axios.post(url, { searchTerm });

  return response.data;
  // if we sending token
  //  const response = await axios.post(url, { searchTerm }, config);
};

const getSingleService = async (serviceId) => {
  const url = GET_SINGLE_SERVICE(serviceId);

  const response = await axios.get(url);

  return response.data;
  // if we sending token
  //  const response = await axios.post(url, { searchTerm }, config);
};

const getAvailableTimeslot = async (petSalonId, scheduleDate) => {
  const url = GET_AVAILABLE_TIMESLOT(petSalonId, scheduleDate);

  const response = await axios.get(url);

  return response.data;
  // if we sending token
  //  const response = await axios.post(url, { searchTerm }, config);
};

const catalogService = {
  getAllGroomingServices,
  getSingleService,
  getAvailableTimeslot,
};

export default catalogService;
