import {fetcher} from "@/api/lib/fetcher";
import {ConsultationSlot} from "@/components/admin-components/calendars-admin-components/action";

export async function getConsulItems(){
    return fetcher('/admin/consulItems');
}
export async function getConsulItemById(id: number) {
    return await fetcher(`/admin/calendar/consulItems/${id}`)
}

export async function postConsulItem(id: number, slotsToSend: ConsultationSlot[]) {
    return fetcher(`/admin/calendar/consultProducts/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ slots: slotsToSend }) // ✅ исправлено
    });
}

