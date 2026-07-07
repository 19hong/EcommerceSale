import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
  getMyItems,
} from '../services/itemService';
import toast from 'react-hot-toast';

export const useItems = (params) => {
  return useQuery({
    queryKey: ['items', params],
    queryFn: () => getItems(params),
  });
};

export const useItem = (id) => {
  return useQuery({
    queryKey: ['item', id],
    queryFn: () => getItem(id),
    enabled: !!id,
  });
};

export const useMyItems = (params) => {
  return useQuery({
    queryKey: ['myItems', params],
    queryFn: () => getMyItems(params),
  });
};

export const useCreateItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
      queryClient.invalidateQueries({ queryKey: ['myItems'] });
      toast.success('Item created successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to create item');
    },
  });
};

export const useUpdateItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateItem(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
      queryClient.invalidateQueries({ queryKey: ['myItems'] });
      toast.success('Item updated successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update item');
    },
  });
};

export const useDeleteItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
      queryClient.invalidateQueries({ queryKey: ['myItems'] });
      toast.success('Item deleted successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to delete item');
    },
  });
};
