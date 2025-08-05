import API from './api';

export const getSubscriptions = () => API.get('/subscriptions');

export const getSubscriptionById = (id) => API.get(`/subscriptions/${id}`);

export const createSubscription = (data) => API.post('/subscriptions', data);

export const updateSubscription = (id, data) => API.put(`/subscriptions/${id}`, data);

export const deleteSubscription = (id) => API.delete(`/subscriptions/${id}`);
