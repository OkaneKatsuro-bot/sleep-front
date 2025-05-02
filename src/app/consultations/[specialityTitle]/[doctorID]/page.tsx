'use client'
import { useRouter } from 'next/router';
import CalendarWidget from "@/components/clientconsulwidgets/CalendarWidget";

export default function ConsulPage() {
    const router = useRouter();
    const { doctorID } = router.query;

    if (!doctorID) return <div>Loading...</div>; // Handle loading state if `doctorID` is not available yet

    return (
        <div className="container mx-auto p-8">
            <CalendarWidget doctorId={doctorID as string} />
        </div>
    );
}
