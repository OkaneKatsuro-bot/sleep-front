import { fetcher } from '@/api/lib/fetcher';

export async function getCurrentUser() {
    return fetcher('/auth/profile');
}