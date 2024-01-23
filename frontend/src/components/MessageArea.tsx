"use client";
import { Header } from "./Header";
import type { Message } from "@/shared/interfaces";
import { SendMessage } from "./SendMessage";
import { useMessageAreaLogic } from "@/shared/hooks/useMessageAreaLogic";

export function MessageArea() {
  const { currentChatId, currentUserName, messages } = useMessageAreaLogic();

  if (!currentChatId) return <></>;

  return (
    <section className="bg-header-color relative flex flex-col flex-1">
      <Header>
        <h1>{currentUserName}</h1>
      </Header>
      <div className="flex flex-1 flex-col-reverse p-4 overflow-auto">
        <div className="flex flex-col gap-2 z-10 relative">
          {messages?.map((message) => (
            <Message
              key={message.id}
              isFromMe={message.isFromMe}
              message={message.message}
            />
          ))}
        </div>
      </div>
      <SendMessage />
      <div className="bg-chat absolute inset-0 opacity-5 "></div>
    </section>
  );
}

interface IMessage {
  isFromMe: boolean;
  message: string;
}

export function Message({ isFromMe = false, message }: IMessage) {
  const extendedClasses = "self-".concat(isFromMe ? "end" : "start");
  const borderRadius = "rounded-".concat(isFromMe ? "s-md" : "e-md");

  return (
    <div
      className={`w-full max-w-md min-h-9 bg-gray-900 p-4 text-white ${extendedClasses} ${borderRadius}`}
    >
      {message}
    </div>
  );
}
