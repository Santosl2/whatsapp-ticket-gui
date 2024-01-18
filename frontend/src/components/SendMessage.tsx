import { HttpService } from "@/shared/services/HttpService";
import { useChat } from "@/shared/store/ChatStore";
import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";

export function SendMessage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { currentChatId } = useChat();

  const { data, mutate } = useMutation({
    mutationKey: ["messages", currentChatId],
    mutationFn: (data) =>
      HttpService.getInstance().post(`messages/${currentChatId}`, data),
  });

  console.log(data);

  return (
    <input
      ref={inputRef}
      type="text"
      className="z-10 rounded-none w-full text-gray-100 bg-gray-700 p-4"
      placeholder="Type a message..."
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          if (!inputRef.current) return;

          // @ts-ignore
          mutate({ message: inputRef.current.value });

          inputRef.current.value = "";
          inputRef.current.blur();

          console.log("Send message");
        }
      }}
    />
  );
}
