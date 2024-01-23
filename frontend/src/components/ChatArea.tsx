import { ContactsList } from "./ContactsList";
import { Header } from "./Header";
import { MessageArea } from "./MessageArea";

export function ChatArea() {
  return (
    <aside className="w-full flex max-h-[700px]">
      <div className="max-w-md w-full bg-gray-850 border-gray-600 border-r-[1px]">
        <Header>
          <h1>Whatsapp GUI</h1>
        </Header>
        <ContactsList />
      </div>

      <MessageArea />
    </aside>
  );
}
