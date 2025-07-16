"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  CircleUser,
  MailCheckIcon,
  MapPin,
  SearchCheckIcon,
  User2Icon,
} from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { User } from "@/types/User";
import { Loading } from "@/components/loading";
import { Error } from "@/components/error";
export default function Users() {
  const [user, setUser] = useState("");
  console.log(user);

  async function fetcher(url: string) {
    const response = await fetch(url);

    if (!response.ok) {
      return <Error/>
    }

    return await response.json();
  }
  const users = useQuery({
    queryKey: ["users"],
    queryFn: () => fetcher("https://jsonplaceholder.typicode.com/users"),
  });

  if (users.isError) return <Error />;

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="max-w-7xl flex flex-col items-center justify-center  p-10 sm:min-w-[800px] px-10">
        <div className="w-full flex flex-col gap-4">
          <header className="text-center">
            <h1 className="text-4xl text-white font-semibold">Usuários</h1>
            <p className="text-xl text-white font-light">
              Gerencie os usuários do sistema
            </p>
          </header>
          <section>
            <form
              action=""
              className="flex flex-col md:flex-row gap-4 items-center"
            >
              <Input
                className="text-white py-5"
                type="text"
                placeholder="Pesquise o nome de um usuário"
                value={user}
                onChange={({ target }) => setUser(target.value)}
              />
              <Button className="cursor-pointer flex items-center p-6">
                Criar usuário <SearchCheckIcon />
              </Button>
            </form>
          </section>
          <section className="bg-white/55 p-10 rounded-xl overflow-y-scroll max-h-[700px]">
            {users.isPending ? (
              <Loading />
            ) : (
              users.data.map((user: User) => (
                <Link
                  href=""
                  key={user.id}
                  className="p-6 flex gap-4 items-center bg-white/50 rounded-lg shadow-lg hover:scale-105 transition duration-200 mb-4"
                >
                  <div className="p-4 rounded-full bg-white">
                    <User2Icon color="#550366" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="text-2xl font-semibold">{user.name}</div>
                    <div className="flex gap-2 items-center">
                      <MailCheckIcon />
                      <span className="text-xl">{user.email}</span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <MapPin />
                      <span>{user.address.city}</span>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
