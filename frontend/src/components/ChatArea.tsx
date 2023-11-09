import { ContactsList } from "./ContactsList";
import { Header } from "./Header";
import { MessageArea } from "./MessageArea";

export function ChatArea() {
  return (
    <aside className="w-full flex">
      <div className="max-w-md w-full bg-gray-850 border-gray-600 border-r-[1px]">
        <Header />
        <ContactsList />
      </div>

      <MessageArea />
    </aside>
  );
}
