import { useQuery } from '@tanstack/react-query';
import orderService from '../ApiService/orderService';

export const useAllOrders = (enabled = true) => {
  return useQuery({
    queryKey: ['allOrders'],
    queryFn: orderService.getOrder,
    staleTime: 60000, // Keep data fresh for 60 sec
    cacheTime: 300000, // Cache for 5 mins
    refetchOnWindowFocus: false, // Prevent auto refetching on tab switch
    enabled,
  });
};
