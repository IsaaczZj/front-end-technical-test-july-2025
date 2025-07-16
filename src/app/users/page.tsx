"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { MailCheckIcon, MapPin, PlusCircle, User2Icon } from "lucide-react";
import Link from "next/link";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { User } from "@/types/User";
import { Loading } from "@/components/loading";
import { Error } from "@/components/error";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userCreateSchema, UserCreateSchema } from "@/schemas/userCreateSchema";
export default function Users() {
  const [userInput, setUserInput] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserCreateSchema>({
    resolver: zodResolver(userCreateSchema),
  });

  async function fetcher(url: string) {
    const response = await fetch(url);

    if (!response.ok) {
      return <Error />;
    }
    const data = await response.json();

    return await data;
  }
  const users = useQuery({
    queryKey: ["users"],
    queryFn: () => fetcher("https://jsonplaceholder.typicode.com/users"),
  });

  const filterUser = () => {
    if (users.data === null || users.data === undefined) return [];
    if (userInput.trim().length === 0) return users.data;

    return users.data.filter((user: User) => {
      return user.name.toLowerCase().includes(userInput.toLowerCase());
    });
  };

  function onCreateUser(data: UserCreateSchema) {
    queryClient.setQueryData(["users"], (oldData: User[] | null) => {
      const newUser: User = {
        id: Number(Date.now()),
        name: data.name,
        username: "",
        email: data.email,
        address: {
          city: data.city,
          street: "",
          suite: "",
          zipcode: "",
          geo: { lat: "", lng: "" },
        },
        phone: "",
        website: "",
        company: { name: "", catchPhrase: "", bs: "" },
      };
      if (!oldData) {
        return [newUser];
      }
      return [newUser, ...oldData];
    });
    setIsDialogOpen(false);
  }

  if (users.isError) return <Error />;

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center overflow-hidden">
      <div className="max-w-2xl md:max-w-7xl flex flex-col items-center justify-center  p-10 sm:min-w-[800px] px-10">
        <div className="w-full flex flex-col gap-4 p-30">
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
                value={userInput}
                onChange={({ target }) => setUserInput(target.value)}
              />

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTitle>
                  <DialogTrigger asChild>
                    <Button
                      className="cursor-pointer flex items-center p-6"
                      onClick={() => setIsDialogOpen(true)}
                    >
                      Criar usuário
                      <PlusCircle />
                    </Button>
                  </DialogTrigger>
                </DialogTitle>

                <DialogContent
                  className="md:min-w-[525px]"
                  onCloseAutoFocus={() => reset()}
                >
                  <DialogHeader className="text-2xl font-semibold flex flex-row items-center gap-2">
                    <User2Icon />
                    <span>Novo usuário</span>
                  </DialogHeader>
                  <form
                    className="space-y-6"
                    onSubmit={handleSubmit(onCreateUser)}
                  >
                    <Input
                      type="text"
                      placeholder="Nome do usuário"
                      {...register("name")}
                    />
                    {errors.name?.message && (
                      <p className="text-red-500 leading-none -mt-2 px-3">
                        {errors.name?.message}
                      </p>
                    )}
                    <Input
                      type="email"
                      placeholder="email@exemple.com"
                      {...register("email")}
                    />
                    {errors.email?.message && (
                      <p className="text-red-500 leading-none -mt-2 px-3">
                        {errors.email?.message}
                      </p>
                    )}

                    <Input
                      type="text"
                      placeholder="Ex:Fortaleza"
                      {...register("city")}
                    />
                    {errors.city?.message && (
                      <p className="text-red-500 leading-none -mt-2 px-3">
                        {errors.city?.message}
                      </p>
                    )}

                    <DialogFooter>
                      <Button type="submit">Novo usuário</Button>
                      <Button
                        variant="destructive"
                        onClick={() => setIsDialogOpen(false)}
                      >
                        Cancelar
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </form>
          </section>
          <section className="bg-white/50 p-6 md:p-10 rounded-xl overflow-y-scroll max-h-[600px]">
            {users.isPending ? (
              <Loading />
            ) : (
              filterUser().map((user: User) => (
                <Link
                  href=""
                  key={user.id}
                  className="p-6 flex gap-4 items-center bg-white/50 rounded-lg shadow-lg hover:scale-105 transition duration-200 mb-4 "
                >
                  <div className="p-4 rounded-full bg-white">
                    <User2Icon color="#550366" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-lg md:text-2xl font-semibold">
                      {user.name}
                    </h3>
                    <div className="flex gap-2 items-center">
                      <MailCheckIcon />
                      <span className="text-[12px] font-semibold md:text-xl flex ">
                        {user.email}
                      </span>
                    </div>
                    <p className="flex gap-2 items-center">
                      <MapPin />
                      <span>{user.address.city}</span>
                    </p>
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
