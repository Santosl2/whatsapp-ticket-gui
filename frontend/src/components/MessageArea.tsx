"use client";
import { useChat } from "@/shared/store/ChatStore";
import { Header } from "./Header";
import { useQuery } from "@tanstack/react-query";
import { HttpService } from "@/shared/services/HttpService";
import { IMessageResult } from "@/shared/interfaces";

export function MessageArea() {
  const { currentChatId } = useChat();

  const { data } = useQuery({
    queryKey: ["messages", currentChatId],
    queryFn: () =>
      HttpService.getInstance().get<IMessageResult>(
        `messages/${currentChatId}`
      ),
    enabled: !!currentChatId,
  });

  if (!currentChatId) return <></>;

  console.log(data, currentChatId);

  return (
    <section className="bg-header-color relative flex flex-col flex-1">
      <Header>
        <h1>Brad Pitty</h1>
      </Header>
      <div className="flex flex-1 flex-col-reverse p-4">
        <div className="max-h-[700px] flex flex-col gap-2 overflow-auto z-10 relative">
          {data?.messages.map((message) => (
            <Message
              key={message.id}
              isFromMe={message.isFromMe}
              message={message.message}
            />
          ))}

          <Message isFromMe={false} message="Olá mundo" />
        </div>
      </div>
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
