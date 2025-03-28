import { useQuery } from '@tanstack/react-query';
import orderService from '../ApiService/orderService';

export const useAllOrders = (page=1,limit=5,enabled = true) => {
  return useQuery({
      queryKey:['allOrders', limit,page], // Unique query key
      queryFn: () => orderService.getOrder({ page, limit }),
      keepPreviousData : true,// not required
      staleTime: 60000, // Keep data fresh for 60 seconds
      cacheTime: 300000, // Cache data for 5 minutes
      refetchOnWindowFocus: false, // Disable refetch on window focus
      enabled, // Conditionally enable the query
    }
  );
};
