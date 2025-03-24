import { create } from "zustand";
import { TestToUpdate } from "@/types/test.types/testToUpdate.type";

interface TestEditorStore {
    createdTest: TestToUpdate | null;
    isCreatingTest: boolean;
    setCreatedTest: (test: TestToUpdate | null) => void;
    setIsCreatingTest: (value: boolean) => void;
    resetEditor: () => void;
}

export const useTestEditorStore = create<TestEditorStore>((set) => ({
    createdTest: null,
    isCreatingTest: false,
    setCreatedTest: (test) => set({ createdTest: test }),
    setIsCreatingTest: (value) => set({ isCreatingTest: value }),
    resetEditor: () => set({ createdTest: null, isCreatingTest: false }),
}));
