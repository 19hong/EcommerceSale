import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';
import toast from 'react-hot-toast';

const getUsers = async (params) => {
  const { data } = await api.get('/users', { params });
  return data.data;
};

export const useUsers = (params) => {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => getUsers(params),
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData) => api.put('/users/profile', userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('Profile updated successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    },
  });
};

export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: (passwordData) => api.put('/users/password', passwordData),
    onSuccess: () => {
      toast.success('Password updated successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update password');
    },
  });
};
