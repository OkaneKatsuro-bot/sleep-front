import { fetcher } from '@/api/lib/fetcher';

export async function logout() {
    return fetcher('/auth/logout', {
        method: 'POST',
    });
}