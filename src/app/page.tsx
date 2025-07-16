import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <main className="flex flex-col gap-5 items-center">
        <h1 className="text-4xl text-white font-semibold">Bem vindo recrutador - meu dessafio </h1>
        <Link href="/users">
          <Button className="cursor-pointer">Clique aqui para ser redirecionado</Button>
        </Link>
      </main>
    </div>
  );
}