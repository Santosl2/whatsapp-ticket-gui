export function ContactsList() {
  return (
    <section className="flex-1">
      <Contact username="Santosl2c" lastMessage="Eu sou o milhor" />
      <Contact username="Lula" lastMessage="Eu sou um ladrão!" />
      <Contact username="Bolsonaro" lastMessage="Lula ladrão!" />
      <Contact
        username="Jesus"
        lastMessage="Vinde a mim todos os que estão cansados e sobrecarregados..."
      />
    </section>
  );
}

interface IContact {
  username: String;
  lastMessage: String;
}

function Contact({ lastMessage, username }: IContact) {
  return (
    <div className="flex-1 bg-gray-850 hover:bg-[#2A3942] transition-colors p-4 cursor-pointer">
      <h3 className="font-bold">{username}</h3>
      <p className="text-gray-400 truncate">{lastMessage}</p>
    </div>
  );
}
