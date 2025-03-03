import { useQuery } from "@tanstack/react-query";
import foodService from "../ApiService/foodService.js";

export const useSearchingItems = (item) => {
  const shouldFetch = !!item && item?.name?.trim()?.length>3;
  

  return useQuery({
    queryKey: ["allSearchingItems", item?.name],
    queryFn: () => foodService.getAll(item),
    staleTime: 60000, // Keep data fresh for 60 sec
    cacheTime: 300000, // Cache for 5 mins
    refetchOnWindowFocus: false, // Prevent auto refetching on tab switch
    enabled: shouldFetch, 
  });
};
