import {fetcher} from "@/api/lib/fetcher";

export async function getConsulItems(){
    return fetcher('/admin/consulItems');
}
export async function getConsulItemById(id: number) {
    return fetcher(`/admin/calendar/consulItems/${id}`)
}

export async function postConsulItem(title: string, description: string, image: string, price: string, doctorId: string) {
    return fetcher('/admin/calendar/consulItems', {
        method: 'POST',
        body: JSON.stringify({
            title,
            description,
            image,
            price,
            doctorId,
        })
    })
}

