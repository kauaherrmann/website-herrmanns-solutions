import { useQuery } from '@tanstack/react-query';
import { getServices } from '../api/getServices';

export function useServices() {
  return useQuery({
    queryKey: ['servicos', 'list'],
    queryFn: getServices,
  });
}
