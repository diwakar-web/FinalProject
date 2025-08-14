import api from './api.js';

export const createClaim = async (payload) => {
  const { data } = await api.post('/claims', payload);
  return data;
};

export const listClaimsForItem = async (itemId) => {
  const { data } = await api.get(`/claims/item/${itemId}`);
  return data;
};

export const resolveClaim = async (claimId, status) => {
  const { data } = await api.patch(`/claims/${claimId}`, { status });
  return data;
};
