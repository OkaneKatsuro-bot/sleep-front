import {fetcher} from "@/api/lib/fetcher";

export async function getAllConsulProducts() {
    return fetcher('/admin/calendar/consultProducts');
}

export async function getConsulProductById(id: number) {
    return fetcher(`/admin/calendar/consultProducts/${id}`)
}

// export async function postConsulProduct(title: string, description: string, image: string, price: string, doctorId: string) {
//     return fetcher('/admin/calendar/consultProducts', {
//         method: 'POST',
//         body: JSON.stringify({
//             title,
//             description,
//             image,
//             price,
//             doctorId,
//         })
//     })
// }
//
