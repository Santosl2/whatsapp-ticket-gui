interface IHeader {
  children: React.ReactNode;
}
export function Header({ children }: IHeader) {
  return (
    <header className="flex items-center justify-between w-full h-16 px-8 bg-header-color rounded-sm z-10 flex-shrink-0">
      {children}
    </header>
  );
}
