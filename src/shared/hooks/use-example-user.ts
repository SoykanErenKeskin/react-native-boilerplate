import { useQuery } from '@tanstack/react-query';

import { api } from '@/services/api/client';
import { normalizeApiError } from '@/services/api/interceptors';

export type ExampleUser = {
  id: number;
  name: string;
  email: string;
  username: string;
};

export function useExampleUser() {
  return useQuery({
    queryKey: ['example-user'],
    queryFn: async (): Promise<ExampleUser> => {
      try {
        const { data } = await api.get<ExampleUser>(
          'https://jsonplaceholder.typicode.com/users/1',
        );
        return data;
      } catch (error) {
        throw new Error(normalizeApiError(error).message);
      }
    },
  });
}
