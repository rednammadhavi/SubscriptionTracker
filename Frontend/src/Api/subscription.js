import API from './api';

export const getSubscriptions = () => API.get('/subscriptions');
export const getSubscriptionById = (id) => API.get(`/subscriptions/${id}`);
export const createSubscription = (data) => API.post('/subscriptions', data);
export const updateSubscription = (id, data) => API.put(`/subscriptions/${id}`, data);
export const deleteSubscription = (id) => API.delete(`/subscriptions/${id}`);
export const getDeletedSubscriptions = () => API.get("/subscriptions/deleted");
export const restoreSubscription = (id) => API.put(`/subscriptions/restore/${id}`);
export const deleteSubscriptionPermanently = (id) => API.delete(`/subscriptions/permanent/${id}`);
