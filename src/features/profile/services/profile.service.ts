import { api } from '@/services/api/client';

import type { ProfileSummary } from '@/features/profile/types';

/**
 * Placeholder profile fetch. Uses an absolute URL so it works without your API base.
 */
export async function fetchProfileById(id: number): Promise<ProfileSummary> {
  const { data } = await api.get<ProfileSummary>(
    `https://jsonplaceholder.typicode.com/users/${id}`,
  );
  return data;
}
