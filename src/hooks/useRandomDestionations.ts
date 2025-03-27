import { useQuery } from '@tanstack/react-query';
import apiDestination from '../api/destinations';

const useRandomDestinations = (token?: string) => {
  return useQuery({
    queryKey: ['randomDestination'],
    queryFn: () => apiDestination.get4RandomDestinations(token),
  });
};

export default useRandomDestinations;
