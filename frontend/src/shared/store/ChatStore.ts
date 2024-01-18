import { create } from "zustand";

// Sim, eu sei que eu poderia ter usado context, mas eu queria praticar mais o Zustand
interface IUseChatStore {
  currentChatId: number | null;
  currentUserName: string | null;
  setCurrentChatId: (chatId: number | null) => void;
  setCurrentUserName: (userName: string | null) => void;
}

const useChatStore = create<IUseChatStore>((set) => ({
  currentChatId: null,
  currentUserName: null,
  setCurrentChatId: (chatId) => set({ currentChatId: chatId }),
  setCurrentUserName: (userName) => set({ currentUserName: userName }),
}));

export function useChat() {
  return useChatStore((state) => ({
    currentChatId: state.currentChatId,
    currentUserName: state.currentUserName,
    setCurrentChatId: state.setCurrentChatId,
    setCurrentUserName: state.setCurrentUserName,
  }));
}
