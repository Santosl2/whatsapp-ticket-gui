"use client";
import { useChat } from "@/shared/store/ChatStore";

interface IContact {
  username: string;
  lastMessage: String;
  id: number;
}

export function Contact({ lastMessage, username, id }: IContact) {
  const { setCurrentChatId, setCurrentUserName } = useChat();
  const handleClick = () => {
    setCurrentChatId(id);
    setCurrentUserName(username);
  };

  return (
    <div
      className="flex-1 bg-gray-850 hover:bg-[#2A3942] transition-colors p-4 cursor-pointer"
      onClick={handleClick}
    >
      <h3 className="font-bold">{username}</h3>
      <p className="text-gray-400 truncate">{lastMessage}</p>
    </div>
  );
}
