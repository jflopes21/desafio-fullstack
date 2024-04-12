import {
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogHeader,
  DialogFooter,
} from "./ui/dialog";
import { Label } from "@radix-ui/react-label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";

interface Level {
  id: string;
  nivel: string;
}

export function CreateDeveloperDialog() {
  const [levels, setLevels] = useState<Level[]>([]);

  useEffect(() => {
    const url = new URL("http://localhost:3333/api/niveis");
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setLevels(data);
      });
  }, []);

  //   const handleSubmitDeveloper = async () => {
  //     const formDeveloperData = {
  //       nivelId: nivelId,
  //       nome: nome,
  //       sexo: sexo,
  //       datanascimento: datanascimento,
  //       hobby: hobby,
  //     };

  //     const response = await fetch("http://localhost:3333/api/desenvolvedores", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formDeveloperData),
  //     });

  //     if (response.ok) {
  //       console.log("Desenvolvedor cadastrado com sucesso!");
  //       setShouldFetchDevelopers(true);
  //     } else {
  //       const errorData = await response.json();
  //       setError(errorData.message);
  //     }
  //   };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Novo desenvolvedor</DialogTitle>
        <DialogDescription>Criar um novo desenvolvedor</DialogDescription>
      </DialogHeader>

      <form className="space-y-8" action="">
        <div className="grid grid-cols-4 items-center text-right gap-3">
          <Label htmlFor="name">Nome</Label>
          <Input className="col-span-3" id="name" />
        </div>

        <div className="grid grid-cols-4 items-center text-right gap-3">
          <Label htmlFor="level">Nível</Label>
          <Select>
            <SelectTrigger className="col-span-2">
              <SelectValue placeholder="Selecione o nível" />
            </SelectTrigger>
            <SelectContent>
              {levels.map((level) => {
                return (
                  <SelectItem key={level.id} value={level.nivel}>
                    {level.nivel}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-4 items-center text-right gap-3">
          <Label className="" htmlFor="dateOfBirth">
            Nascimento
          </Label>
          <Input className="col-span-2" id="dateOfBirth" />
        </div>

        <div className="grid grid-cols-4 items-center text-right gap-3">
          <Label htmlFor="level">Sexo</Label>
          <Select>
            <SelectTrigger className="col-span-2">
              <SelectValue placeholder="Selecione uma opção" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="M">Masculino</SelectItem>
              <SelectItem value="F">Feminino</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-4 items-center text-right gap-3">
          <Label htmlFor="hobby">Hobby</Label>
          <Input className="col-span-2" id="hobby" />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancelar
            </Button>
          </DialogClose>
          <DialogClose>
            <Button>Salvar</Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
