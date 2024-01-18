import { Providers } from "@/providers";
import { HomeTemplate } from "@/templates/HomeTemplate";

export default function Home() {
  return (
    <main className="flex min-h-screen py-24 px-4 max-w-[1440px] w-full mx-auto ">
      <Providers>
        <HomeTemplate />
      </Providers>
    </main>
  );
}
