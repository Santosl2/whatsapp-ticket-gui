import { create } from "zustand";

// Sim, eu sei que eu poderia ter usado context, mas eu queria praticar mais o Zustand
interface IUseChatStore {
  currentChatId: number | null;
  setCurrentChatId: (chatId: number | null) => void;
}

const useChatStore = create<IUseChatStore>((set) => ({
  currentChatId: null,
  setCurrentChatId: (chatId) => set({ currentChatId: chatId }),
}));

export function useChat() {
  return useChatStore((state) => ({
    currentChatId: state.currentChatId,
    setCurrentChatId: state.setCurrentChatId,
  }));
}
