import {fetcher} from "@/api/lib/fetcher";
import {SafeUser} from "@/types/safeuser.type";

export async function getMeForShop() {
    return await fetcher('/auth/meShop') as SafeUser
}