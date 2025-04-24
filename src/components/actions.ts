import {ActionResult, handleAction} from "@/lib/handleAction";
import {test} from "@/api";

export default function defTestAction(): Promise<ActionResult<{ deftest: string }>> {
    return handleAction(async () => {
        const {deftest} = await test.getDefTest(); // например: { deftest: "Test2" }
        return {deftest}; // ✅ вернётся { success: true, deftest: "Test2" }
    });


}

